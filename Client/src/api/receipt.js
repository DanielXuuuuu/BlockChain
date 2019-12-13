import axios from '@/libs/api.request'

export const getReceiptDetail = ({receiptId} ) => {
  const data = {
    receiptId,
  }
  return axios.request({
    url: 'api/receipt/detail',
    data ,
    method: 'post'
  })
}

export const receiptConfirm = (data ) => {
  return axios.request({
    url: 'api/financeApply/confirm',
    data ,
    method: 'post'
  })
}

export const receiptSettle = (data ) => {
  return axios.request({
    url: 'api/financeApply/settle',
    data ,
    method: 'post'
  })
}
