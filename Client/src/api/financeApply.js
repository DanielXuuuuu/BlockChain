import axios from '@/libs/api.request'

export const getAllfinanceApply = () => {
  return axios.request({
    url: 'api/financeApply/list',
    method: 'get'
  })
}

export const addApply = (formData) => {
  return axios.request({
    url: 'api/financeApply/add',
    formData,
    method: 'post'
  })
}
