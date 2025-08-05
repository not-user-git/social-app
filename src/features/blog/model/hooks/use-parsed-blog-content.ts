import { useMemo } from 'react'
import { parsePostContent } from '@/features/blog/model/helpers/parse-blog-content.helper'

export function useParsedBlogContent(html: string) {
  return useMemo(() => parsePostContent(html), [html])
}
