export function delHtmlTag (str) {
  return str ? str.replace(/<[^>]+>/g, '') : ''
}
