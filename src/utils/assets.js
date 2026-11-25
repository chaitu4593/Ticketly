const baseUrl = import.meta.env.BASE_URL
const basePath = baseUrl.replace(/^\/|\/$/g, '')

export function getPublicAssetUrl(path) {
  if (!path || /^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(path)) return path

  const normalizedPath = path.replace(/^\/+/, '')
  if (basePath && (normalizedPath === basePath || normalizedPath.startsWith(`${basePath}/`))) {
    return `/${normalizedPath}`
  }

  return `${baseUrl}${normalizedPath}`
}
