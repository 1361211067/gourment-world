
import {post,get} from './axios'

// 首页顶部导航
export const getTabs = (data) => {
    return post('https://api.douguo.net/app/c', data)
}

// 获取热搜
export const getHotSearch = (data) => {
   return post('home/searchterms', data) 
}

// 首页轮播图
export const getBanner = (data) => {
    return post(`home/recommended/${data.url}`, data.data)
}

// 详情
export const getDetail = (data) => {
    return post(`recipe/v2/detail/${data}` )
}
