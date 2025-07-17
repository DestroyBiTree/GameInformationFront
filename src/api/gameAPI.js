import axios from '@/utils/request'

// 分页获取游戏信息
export const getGamesByPage = (currentPage, pageSize) => {
  return axios.get(`/games/${currentPage}/${pageSize}`)
}

// 根据id获取游戏详情
export const getGameById = (id) => {
  return axios.get(`/games/detail/${id}`)
}

// 添加游戏信息
export const addGame = (game) => {
  return axios.post('/games', game)
}

// 更新游戏信息
export const updateGame = (id, game) => {
  return axios.put(`/games/${id}`, game)
}

// 删除游戏信息
export const deleteGame = (id) => {
  return axios.delete(`/games/${id}`)
} 