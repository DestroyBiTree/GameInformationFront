import axios from '@/utils/request'

// 获取所有天气配置信息
export const getWeatherConfigs = () => {
  return axios.get('/weather/config/getAllWeatherConfig')
}

// 根据ID获取天气配置信息
export const getWeatherConfigById = (id) => {
  return axios.get(`/weather/config/${id}`)
}

// 更新天气配置信息
export const updateWeatherConfig = (weatherConfig) => {
  return axios.post('/weather/config/updateWeatherConfig', weatherConfig)
}