

export const getCAToken = () => {
  const meta = document.querySelector('meta[name="CA_TOKEN"]')
  if (!(meta instanceof HTMLMetaElement) || meta.content === '')
    throw new Error('UI bootstrap token missing')
  return meta.content
}

