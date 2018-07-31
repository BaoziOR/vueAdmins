import fetch from '../fetch';
//获取管理员列表
export const getUserListPage = params => { return fetch.post(`/main/admin/auth/fetch_admin_list`, params); };

//更新管理员
export const editUser = params => { return fetch.post(`/main/admin/auth/update_admin`, params); };
//获取日志
export const logList = params => { return fetch.post(`/main/admin/auth/fetch_admin_log_list`,params); };
//新闻
export const getNewsListPage = params => { return fetch.post(`/main/admin/news/getNewsList`, params); };
//新闻分类
export const getnewsChannels = params => { return fetch.post(`/main/admin/news/getnewschannels`, params); };
//新闻标签
export const getnewsTags = params => { return fetch.post(`/main/admin/news/getnewstags`, params); };
// 添加新闻
export const addnewsCreated = params => { return fetch.post(`/main/admin/news/create`, params); };
//编辑新闻时获取新闻详情
export const getDetailNews = params => { return fetch.post(`/main/admin/news/getDetailNews`, params); };
//编辑新闻‘
export const editNews = params => { return fetch.post(`/main/admin/news/revisenews`, params); };
