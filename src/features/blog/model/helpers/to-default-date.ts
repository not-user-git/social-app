export const toDefaultDate = (date: string): string => {
  const newDate = new Date(date)
  return newDate.toLocaleDateString('ru-Ru', {
    hour: 'numeric',
    minute: 'numeric',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
