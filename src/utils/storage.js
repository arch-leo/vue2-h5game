export function getCookie (name) {
  var arr = document.cookie.match(new RegExp('(^| )' + name + '=([^;]*)(;|$)'))
  if (arr !== null) {
    return arr[2]
  }
  return null
}
export function setItem (name, value) {
  localStorage.setItem(name, value ? JSON.stringify(value) : null)
}
// localStorage取值
export function getItem (name) {
  return localStorage.getItem(name) ? JSON.parse(localStorage.getItem(name)) : null
}
// localStorage删除指定键对应的值
export function delItem (name) {
  localStorage.removeItem(name)
}
// 批量删除localStorage
export function ClearItems () {
  localStorage.clear()
}
