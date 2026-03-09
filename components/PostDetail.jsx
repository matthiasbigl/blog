import React from 'react'
import moment from 'moment'
import { RichText } from '@graphcms/rich-text-react-renderer'
import { ScrollProgress } from './'
import MermaidDiagram, { getTextFromChildren } from './MermaidDiagram'
import { Calendar, Eye } from 'lucide-react'

const mermaidPrefixPattern = /^\s*mermaid(?:\r?\n|\s|$)/i
const compactMermaidPrefixPattern = /^\s*mermaid(?=[A-Za-z])/i
const fencedMermaidPrefixPattern = /^\s*```+\s*mermaid\s*(?:\r?\n|$)/i
const fencedCodeSuffixPattern = /\r?\n\s*```+\s*$/i
const mermaidDiagramStartPattern =
  /^(?:flowchart|graph|sequenceDiagram|classDiagram|stateDiagram(?:-v2)?|erDiagram|journey|gantt|pie|gitGraph|mindmap|timeline|quadrantChart|requirementDiagram|block-beta|xychart-beta|sankey-beta|C4(?:Context|Container|Component|Dynamic|Deployment))\b/i
const notSetLanguageLabel = 'text'
const detectedMermaidLanguageLabel = 'mermaid'
const placeholderLanguageLabels = new Set(['', 'not set', 'none', 'plain text'])

const normalizeCodeText = (value) =>
  typeof value === 'string'
    ? value
        .replace(/\u00a0/g, ' ')
        .replace(/[\u200b\u200c\u200d\ufeff]/g, '')
        .trim()
    : ''

const tryExtractMermaidCode = (code) => {
  if (!code) return null
  const normalized = normalizeCodeText(code)

  if (mermaidPrefixPattern.test(normalized)) {
    return normalized.replace(mermaidPrefixPattern, '')
  }

  if (fencedMermaidPrefixPattern.test(normalized)) {
    const withoutPrefix = normalized.replace(fencedMermaidPrefixPattern, '')
    return withoutPrefix.replace(fencedCodeSuffixPattern, '').trim()
  }

  if (compactMermaidPrefixPattern.test(normalized)) {
    const withoutCompactPrefix = normalized
      .replace(compactMermaidPrefixPattern, '')
      .trim()
    if (mermaidDiagramStartPattern.test(withoutCompactPrefix)) {
      return withoutCompactPrefix
    }
  }

  if (mermaidDiagramStartPattern.test(normalized)) {
    return normalized
  }

  return null
}

const normalizeLanguage = (lang) => {
  const trimmed = typeof lang === 'string' ? lang.trim() : ''
  if (!trimmed) return ''
  return placeholderLanguageLabels.has(trimmed.toLowerCase()) ? '' : trimmed
}

const PostDetail = ({ post, viewCount }) => {
  return (
    <>
      <ScrollProgress />
      <article className="lg:bg-light-card lg:dark:bg-dark-card lg:rounded-md lg:shadow-lg lg:border lg:border-light-border lg:dark:border-dark-border mb-8">
        {post.featuredImage && (
          <div className="relative overflow-hidden mb-6 lg:rounded-t-md rounde">
            <img
              src={post.featuredImage.url}
              alt={post.title}
              className="object-cover w-full max-h-[500px] lg:max-h-[600px]"
            />
          </div>
        )}
        <div className="px-4 lg:px-12 pb-12">
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <div className="flex items-center">
              <img
                alt={post.author.name}
                className="rounded-full w-[30px] h-[30px] border border-light-border dark:border-dark-border"
                src={post.author.photo.url}
              />
              <p className="text-light-muted dark:text-dark-muted ml-2 text-lg font-medium">
                {post.author.name}
              </p>
            </div>
            <div className="font-medium text-light-muted dark:text-dark-muted flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-primary dark:text-dark-muted" />
              <time dateTime={post.createdAt}>
                {moment(post.createdAt).format('MMM DD, YYYY')}
              </time>
            </div>
            <div className="font-medium text-light-muted dark:text-dark-muted flex items-center">
              <Eye className="w-5 h-5 mr-2 text-primary dark:text-dark-muted" />
              <span>
                {viewCount !== null ? viewCount : post.viewcount || 0} views
              </span>
            </div>
          </div>

          <h1 className="mb-8 text-4xl font-bold text-light-text dark:text-dark-text tracking-tight">
            {post.title}
          </h1>

          <div className="prose prose-lg max-w-none dark:prose-invert">
            <RichText
              content={post.content.raw}
              renderers={{
                code_block: ({ children, lang }) => {
                  const trimmedLanguage = normalizeLanguage(lang)
                  const code = getTextFromChildren(children)
                  const inferredMermaidCode =
                    !trimmedLanguage && code
                      ? tryExtractMermaidCode(code)
                      : null
                  const renderLanguageInfo = (label) => (
                    <p className="mt-2 text-xs text-light-muted dark:text-dark-muted">
                      Language: {label}
                    </p>
                  )

                  if (trimmedLanguage === 'mermaid') {
                    const mermaidCode =
                      tryExtractMermaidCode(code) || normalizeCodeText(code)
                    return (
                      <>
                        <MermaidDiagram code={mermaidCode} />
                        {renderLanguageInfo('mermaid')}
                      </>
                    )
                  }

                  if (!trimmedLanguage) {
                    if (inferredMermaidCode) {
                      return (
                        <>
                          <MermaidDiagram code={inferredMermaidCode} />
                          {renderLanguageInfo(detectedMermaidLanguageLabel)}
                        </>
                      )
                    }
                  }
                  return (
                    <>
                      <pre>
                        <code>{children}</code>
                      </pre>
                      {renderLanguageInfo(
                        trimmedLanguage || notSetLanguageLabel,
                      )}
                    </>
                  )
                },
              }}
            />
          </div>
        </div>
      </article>
    </>
  )
}

export default PostDetail
