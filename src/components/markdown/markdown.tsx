import './code-highlight-block.css'

import type { Options } from 'react-markdown'

import { useMemo } from 'react'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import rehypeHighlight from 'rehype-highlight'
import { mergeClasses, isExternalLink } from 'minimal-shared/utils'

import Link from '@mui/material/Link'

import { RouterLink } from 'src/routes/components'

import { Image } from '../image'
import { MarkdownRoot } from './styles'
import { markdownClasses } from './classes'

import type { MarkdownProps } from './types'

// ----------------------------------------------------------------------

export function Markdown({ children, sx, className, ...other }: MarkdownProps) {
  const content = useMemo(
    () => children,
    // if (isMarkdownContent(`${children}`)) {
    // }
    // return htmlToMarkdown(`${children}`.trim());
    [children]
  )

  return (
    <MarkdownRoot
      children={content}
      components={components as Options['components']}
      rehypePlugins={rehypePlugins as Options['rehypePlugins']}
      /* base64-encoded images
       * https://github.com/remarkjs/react-markdown/issues/774
       * urlTransform={(value: string) => value}
       */
      className={mergeClasses([markdownClasses.root, className])}
      sx={sx}
      {...other}
    />
  )
}

// ----------------------------------------------------------------------

type ComponentTag = {
  [key: string]: any
}

const rehypePlugins = [rehypeRaw, rehypeHighlight, [remarkGfm, { singleTilde: false }]]

const components = {
  img: ({ ...other }: ComponentTag) => (
    <Image
      ratio="16/9"
      className={markdownClasses.content.image}
      sx={{ borderRadius: 2 }}
      {...other}
    />
  ),
  a: ({ href, children, node, ...other }: ComponentTag) => {
    const linkProps = isExternalLink(href)
      ? { target: '_blank', rel: 'noopener' }
      : { component: RouterLink }

    return (
      <Link {...linkProps} href={href} className={markdownClasses.content.link} {...other}>
        {children}
      </Link>
    )
  },
  pre: ({ children }: ComponentTag) => (
    <div className={markdownClasses.content.codeBlock}>
      <pre>{children}</pre>
    </div>
  ),
  code({ className, children, node, ...other }: ComponentTag) {
    const language = /language-(\w+)/.exec(className || '')

    return language ? (
      <code {...other} className={className}>
        {children}
      </code>
    ) : (
      <code {...other} className={markdownClasses.content.codeInline}>
        {children}
      </code>
    )
  },
}
