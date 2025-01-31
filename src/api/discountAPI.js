import axios from '@/utils/request'


// 根据id获取旅游策略
export const discountAPI = userName => {
  return axios.get(`/discount/searchDiscount/${userName}`)
}

// 根据id获取旅游策略
export const discountByIdAPI = userId => {
  return axios.get(`/discount/searchDiscountById/${userId}`)
}