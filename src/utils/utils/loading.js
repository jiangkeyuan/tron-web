import { ElLoading } from 'element-plus'
function openLoading (options) {
  const config = {
    lock: true,
    text: '查询中',
    target: document.querySelector('.el-table__empty-block')
  }
  const data = Object.assign(config, options)
  const loding = ElLoading.service(data)
  setTimeout(() => {
    loding.close()
  }, 3000)
  return loding
}
const awaitFnLoading =
  (fn, options = {}) =>
  async (...args) => {
    const Loading = openLoading(options)
    const result = await fn(...args)
    Loading.close()
    return result
  }

export { openLoading, awaitFnLoading }
