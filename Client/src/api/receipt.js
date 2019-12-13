import axios from '@/libs/api.request'

export const getReceiptDetail = ({receiptId}) => {
  const data = {
    receiptId,
  }
  return axios.request({
    url: 'api/receipt/detail',
    data ,
    method: 'post'
  })
}

export const receiptConfirm = ({receiptId}) => {
  const data = {
    receiptId,
  }
  return axios.request({
    url: 'api/financeApply/confirm',
    data ,
    method: 'post'
  })
}

export const receiptSettle = ({receiptId}) => {
  const data = {
    receiptId,
  }
  return axios.request({
    url: 'api/financeApply/settle',
    data ,
    method: 'post'
  })
}
