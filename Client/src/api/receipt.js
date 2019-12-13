import axios from '@/libs/api.request'

export const getReceiptDetail = (formData) => {
  return axios.request({
    url: 'api/receipt/detail',
    formData,
    method: 'post'
  })
}

export const receiptConfirm = (formData) => {
  return axios.request({
    url: 'api/financeApply/confirm',
    formData,
    method: 'post'
  })
}

export const receiptSettle = (formData) => {
  return axios.request({
    url: 'api/financeApply/settle',
    formData,
    method: 'post'
  })
}
