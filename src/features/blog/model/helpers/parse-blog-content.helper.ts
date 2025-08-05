export const parsePostContent = (input: string): {
  text: string
  hashtags: string[]
} => {
  const words = input.trim().split(/\s+/)

  const textParts: string[] = []
  const hashtags: string[] = []

  for (const word of words) {
    if (word.startsWith('#')) {
      hashtags.push(word.slice(0, 16))
    } else {
      textParts.push(word)
    }
  }

  return {
    text: textParts.join(' '),
    hashtags
  }
}
