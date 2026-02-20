import { GraphQLClient, gql } from 'graphql-request'

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { slug } = req.body

  if (!slug) {
    return res.status(400).json({ message: 'Slug is required' })
  }

  const client = new GraphQLClient(graphqlAPI, {
    headers: {
      Authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`,
    },
  })

  // Workaround for production header issue (same as comments.js)
  client.setHeader(
    'x_authorization',
    `Authorization: Bearer ${process.env.GRAPHCMS_TOKEN}`,
  )

  try {
    // First, get the current view count
    const getQuery = gql`
      query GetViewCount($slug: String!) {
        post(where: { slug: $slug }) {
          id
          viewcount
        }
      }
    `

    const { post } = await client.request(getQuery, { slug })

    if (!post) {
      return res.status(404).json({ message: 'Post not found' })
    }

    const newCount = (post.viewcount || 0) + 1

    // Update the view count and publish in one request
    const updateQuery = gql`
      mutation UpdateViewCount($slug: String!, $viewcount: Int!) {
        updatePost(where: { slug: $slug }, data: { viewcount: $viewcount }) {
          id
          viewcount
        }
        publishPost(where: { slug: $slug }) {
          id
        }
      }
    `

    const result = await client.request(updateQuery, {
      slug,
      viewcount: newCount,
    })

    return res.status(200).json({ viewcount: result.updatePost.viewcount })
  } catch (error) {
    console.warn('Error updating view count:', error?.message || error)
    return res.status(500).json({ message: 'Failed to update view count' })
  }
}
