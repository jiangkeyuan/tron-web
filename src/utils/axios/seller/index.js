import service from '../request'
export const getLatestSells = async () => {
  return await service.get(`/seller/user/latest/sells`)
}

export const getAlmostSells = async () => {
  return await service.get(`/seller/user/almost/sells`)
}

export const getUserSells = async data => {
  return await service({
    url: '/seller/user/sells',
    method: 'post',
    data
  })
}
