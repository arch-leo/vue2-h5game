import axios from 'axios'
import qs from 'qs'
axios.defaults.withCredentials = true

const apiConfig = process.env.NODE_ENV === 'development' ? '' : 'https://sy.ifeng.com/service'
// // 首页
// export const apiActivities = (data) => axios.post(`${apiConfig}/activity`, qs.stringify(data))
// 用户信息
export const apiGetBind = (data) => axios.post(`${apiConfig}/getbind`, qs.stringify(data)) // 获取最热
// 首页
export const apiGetRecords = (data) => axios.post(`${apiConfig}/gamehistory`, qs.stringify(data)) // 最近在玩
export const apiGetHot = (data) => axios.post(`${apiConfig}/getrank`, qs.stringify(data)) // 获取最热
export const apiGetAct = (data) => axios.post(`${apiConfig}/getadurl`, qs.stringify(data)) // 获取活动 type 3 焦点图 type 4 活动
export const apiGetGift = (data) => axios.post(`${apiConfig}/getcard`, qs.stringify(data)) // 获取礼包
export const apiGetCard = (data) => axios.post(`${apiConfig}/getcardno`, qs.stringify(data)) // 获取礼包
// 游戏
export const apiGetClass = (data) => axios.post(`${apiConfig}/getclass`, qs.stringify(data)) // 获取游戏分类
export const apiGetGames = (data) => axios.post(`${apiConfig}/getgames`, qs.stringify(data)) // 获取游戏分类下的游戏列表
// 个人
export const apiSignin = (data) => axios.post(`${apiConfig}/login`, qs.stringify(data)) // 登录 （手机号或账号）
// export const apiSignup = (data) => axios.post(`${apiConfig}/reg`, qs.stringify(data)) // 注册 （账号）
export const apiSignup = (data) => axios.post(`${apiConfig}/phonereg`, qs.stringify(data)) // 注册 （账号）
export const apiResetPwd = (data) => axios.post(`${apiConfig}/changepwd`, qs.stringify(data)) // 注册 （账号）
export const apiBindBobile = (data) => axios.post(`${apiConfig}/bindmobile`, qs.stringify(data)) // 注册 （账号）
export const apiSendBindMsg = (data) => axios.post(`${apiConfig}/sendbindmsg`, qs.stringify(data)) // 注册 （账号）
export const apiRegMobile = (data) => axios.post(`${apiConfig}/regmobile`, qs.stringify(data)) // 注册 （账号）
export const apiSendRegMsg = (data) => axios.post(`${apiConfig}/sendregmsg`, qs.stringify(data)) // 注册 （账号）
// 我的礼包
export const apiGetMyCard = (data) => axios.post(`${apiConfig}/mycard`, qs.stringify(data)) // 获取我的礼包
