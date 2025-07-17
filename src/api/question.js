import axios from '@/utils/request'

// 添加提问
export const addQuestionAPI = question => {
  return axios.post('/questions', question)
}

// 分页查询所有问题
export const getQuestionsByPageAPI = (currentPage, pageSize) => {
  return axios.get(`/questions/${currentPage}/${pageSize}`)
}

// 根据用户ID查询问题
export const getQuestionsByUserIdAPI = userId => {
  return axios.get(`/questions/user/${userId}`)
}