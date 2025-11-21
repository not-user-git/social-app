import { useMemo } from 'react'
import { parsePostContent } from '@/features/blog/model/helpers/parse-blog-content.helper'

export const useParsedBlogContent = (html: string) =>
  useMemo(() => parsePostContent(html), [html])
