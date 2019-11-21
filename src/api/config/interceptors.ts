import _ from 'lodash'
import { AxiosInstance } from 'axios'

export default (instance: AxiosInstance) => {
  instance.interceptors.request.use(
    options => {
      return Promise.resolve(options)
    },
    rejection => {
      return Promise.reject(rejection)
    }
  )
  instance.interceptors.response.use(
    response => {
      if (_.isPlainObject(response.data)) {
        const data = _.clone(response.data)
        return Object.freeze(data)
      }
      return response
    },
    rejection => {
      if (!rejection || _.get(rejection, 'response.status') === 0) {
        return Promise.reject(
          new RejectionReason('无法连接网络，请检查网络设置', rejection)
        )
      }

      if (
        (rejection instanceof Error || rejection instanceof TypeError)
      ) {
        return Promise.reject(rejection)
      }

      if (rejection.toJSON().message === 'Network Error') {
        return Promise.reject(new RejectionReason('网络连接异常', rejection))
      }

      const { status, config, data: response } = rejection.response || {
        status: undefined,
        config: undefined,
        data: undefined
      }
      const method = (config.method || '').toUpperCase()

      /**
       * 无法发出请求
       */
      if (status === 0) {
        return Promise.reject(
          new RejectionReason('无法发出请求，请检查头部信息', rejection)
        )
      }

      /**
       * 资源不存在
       */
      if (status === 404) {
        if (['POST', 'PUT', 'DELETE'].indexOf(method) !== -1) {
          return Promise.reject(
            new RejectionReason('无法提交数据，请确认来源正确', rejection)
          )
        }

        return Promise.reject(
          new RejectionReason(response.msg || '请求资源错误', rejection)
        )
      }

      /**
       * 资源已经被删除
       */
      if (status === 410) {
        return Promise.reject(
          new RejectionReason(response.msg || '当前资源已经被移除', rejection)
        )
      }

      /**
       * 服务器异常
       */
      if (status >= 500 && status < 600) {
        return Promise.reject(
          new RejectionReason(response.msg || '服务器繁忙', rejection)
        )
      }

      return Promise.reject(
        new RejectionReason(response.msg || '网络错误，请重试', rejection)
      )
    }
  )
}

class RejectionReason {
  constructor(message: string, exception: any) {
    let reason =
      exception instanceof Error || exception instanceof TypeError
        ? exception
        : new Error(message)
    reason = Object.assign(reason, exception)
    reason.message = message
    // Message.error(message)
    return reason
  }
}
