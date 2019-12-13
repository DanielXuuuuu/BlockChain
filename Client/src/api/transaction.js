import axios from '@/libs/api.request'

export const getTransactionData = () => {
  return axios.request({
    url: 'api/transaction/list',
    method: 'get'
  })
}

export const TransactionWithNewReceipt = (formData) => {
  return axios.request({
    url: 'api/transaction/createNewReceipt',
    formData,
    method: 'post'
  })
}

export const TransactionByTransferReceipt = (formData) => {
  return axios.request({
    url: 'api/transaction/transferReceipt',
    formData,
    method: 'post'
  })
}
