import { useEffect } from 'react'

export const useDocumentTitle = (title?: string) => {
  useEffect(() => {
    document.title = title ? `${title} - Voqsy` : 'Загрузка - Voqsy'
    return () => {
      document.title = 'Voqsy'
    }
  }, [title])
}
