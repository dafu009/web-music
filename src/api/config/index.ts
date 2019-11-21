import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import makeInterceptors from './interceptors'
import defaultSetting from './defalut-config'
import urls from '../url'

type urlObject = typeof urls
type apisType = {
  [k in keyof urlObject]: {
    [a in keyof urlObject[k]['path']]: (
      param?: AxiosRequestConfig
    ) => Promise<any>
  } & { _get: { [a in keyof urlObject[k]['path']]?: string } }
}

/**
 * 加载拦截器
 */
const axiosInstance = axios.create(defaultSetting as any)
makeInterceptors(axiosInstance)

export const createApi = () => {
  const apis = {} as apisType
  Object.keys(urls).forEach(key => {
    const { path } = urls[key as keyof urlObject]
    apis[key as keyof urlObject] = {
      ..._getSender(path)
    }
  })
  return apis
}

const _getSender = <T extends {}> (path: T) => {
  const sender = {
    _get: {}
  } as any
  for (const pathKey in path) {
    const _path = path[pathKey]
    const url = `${_path}`

    sender._get[pathKey] = url

    sender[pathKey] = (params: AxiosRequestConfig) =>
      axiosInstance.request({ url, ...params })
  }
  return sender
}