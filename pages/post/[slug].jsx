import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { getPosts, getPostDetails, incrementViewCount } from '../../services'
import {
  PostDetail,
  Categories,
  PostWidget,
  Author,
  Comments,
  CommentForm,
  Loader,
} from '../../components'
import { AdjacentPosts } from '../../sections'
import SEO from '../../components/SEO'

const PostDetails = ({ post }) => {
  const router = useRouter()
  const [viewCount, setViewCount] = useState(null)

  useEffect(() => {
    if (post?.slug) {
      incrementViewCount(post.slug)
        .then((data) => {
          if (data?.viewcount !== undefined) {
            setViewCount(data.viewcount)
          }
        })
        .catch(() => {
          // Silently fail -- view count is not critical
        })
    }
  }, [post?.slug])

  if (router.isFallback) {
    return <Loader />
  }

  return (
    <>
      <SEO
        title={post.title}
        description={post.excerpt}
        image={post.featuredImage?.url ? post.featuredImage.url : ''}
        slug={`post/${post.slug}`}
        article={true}
        publishedTime={post.createdAt}
        modifiedTime={post.updatedAt}
        tags={post.categories?.map((cat) => cat.name) || []}
      />
      <div className="lg:container lg:mx-auto lg:px-8 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-12">
          <div className="col-span-1 lg:col-span-8">
            <PostDetail post={post} viewCount={viewCount} />
            <div className="px-4 lg:px-0">
              <Author author={post.author} />
              <CommentForm slug={post.slug} />
              <Comments slug={post.slug} />
            </div>
          </div>
          <aside className="col-span-1 lg:col-span-4">
            <div className="relative lg:sticky top-24">
              <PostWidget
                slug={post.slug}
                categories={post.categories.map((category) => category.slug)}
              />
              <Categories />
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}

export default PostDetails

export async function getStaticProps({ params }) {
  // Make getPostDetails resilient to rate limits (429) by retrying a few times
  const maxRetries = 3
  let attempt = 0
  while (attempt < maxRetries) {
    try {
      const data = await getPostDetails(params.slug)
      if (!data) {
        return { notFound: true, revalidate: 60 }
      }
      return {
        props: {
          post: data,
        },
        // Use ISR so if data changes we can pick it up
        revalidate: 60,
      }
    } catch (error) {
      attempt += 1
      const status = error?.response?.status || error?.request?.status || null
      // If rate limited, wait and retry with exponential backoff
      if (status === 429 && attempt < maxRetries) {
        const waitMs = 500 * Math.pow(2, attempt - 1)
        // eslint-disable-next-line no-await-in-loop
        await new Promise((res) => setTimeout(res, waitMs))
        continue
      }

      // For other errors or exhausted retries, avoid failing the whole build.
      // Return notFound so Next can continue the build and optionally render on demand.
      // Log the error to help debugging in CI logs.
      // eslint-disable-next-line no-console
      console.warn(
        `getStaticProps error for slug=${params.slug}:`,
        (error && (error.message || JSON.stringify(error))) || error,
      )
      return { notFound: true, revalidate: 60 }
    }
  }
  // Fallback if loop exits unexpectedly
  return { notFound: true, revalidate: 60 }
}

export async function getStaticPaths() {
  // Only pre-render a small recent subset to avoid rate-limiting during build.
  // Other pages will be generated on demand (blocking) when first requested.
  const previewCount = 20
  const posts = await getPosts(0, previewCount)
  const paths = (posts?.edges || []).map(({ node: { slug } }) => ({
    params: { slug },
  }))
  return {
    paths,
    // Use blocking so that pages not returned here are rendered on first request
    // instead of causing a 404 during build or requiring client-side fallback.
    fallback: 'blocking',
  }
}
