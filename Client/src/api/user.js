import { get, post } from '../libs/http'

export const registerEnterprise = ({ userName, password }) => {
  const data = {
    userName,
    password
  }
  return axios.request({
    url: 'login',
    data,
    method: 'post'
  })
}

export const registerThirdParty = ({ userName, password }) => {
  const data = {
    userName,
    password
  }
  return axios.request({
    url: 'api',
    data,
    method: 'post'
  })
}

export function getUserInfo(params) {
  return fetch('/api/user/detail', params)
}