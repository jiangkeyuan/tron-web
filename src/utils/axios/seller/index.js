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

export const getPermission = async data => {
    return await service({
      url: '/seller/user/authorize/permission',
      method: 'post',
      data
    })
}

export const getOperation = async data => {
    return await service({
      url: '/seller/user/authorize/operation',
      method: 'post',
      data
    })
}


export const getSellConfig = async () => {
    return await service({
      url: '/seller/user/sell/config',
      method: 'get'
    })
}
export const saveSellConfig = async (data) => {
    return await service({
      url: '/seller/user/sell/config',
      method: 'post',
      data
    })
}

export const getNothing = async () => {
    return await service({
      url: '/seller/nothing'
    })
}