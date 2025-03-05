import { validatenull } from '@/utils/validate'
import website from '@/plugins/website'

interface Params {
  name?: string
  type?: string
  debug?: boolean
  content?: {}
}

const keyName: string = website.key + '_'
/**
 * 存储localStorage
 */
export const setStore = (params: Params) => {
  let { name, content, type } = params
  name = keyName + name
  let obj = {
    dataType: typeof content,
    content: content,
    type: type,
    datetime: new Date().getTime()
  }
  if (!type) window.sessionStorage.setItem(name, JSON.stringify(obj))
  else window.localStorage.setItem(name, JSON.stringify(obj))
}
/**
 * 获取localStorage
 */

export const getStore = (params: Params) => {
  let { name, debug } = params
  name = keyName + name
  let obj: any = {},
    content

  if (validatenull(obj)) {
    if (params.type === 'session') {
      obj = window.sessionStorage.getItem(name)
    } else {
      obj = window.localStorage.getItem(name)
    }
  }
  if (validatenull(obj)) return
  try {
    obj = JSON.parse(obj)
  } catch {
    return obj
  }
  if (debug) {
    return obj
  }
  if (obj.dataType == 'string') {
    content = obj.content
  } else if (obj.dataType == 'number') {
    content = Number(obj.content)
  } else if (obj.dataType == 'boolean') {
    content = eval(obj.content)
  } else if (obj.dataType == 'object') {
    content = obj.content
  }
  return content
}
/**
 * 删除localStorage
 */
export const removeStore = (params: Params) => {
  let { name, type } = params
  name = keyName + name
  if (type) {
    window.sessionStorage.removeItem(name)
  } else {
    window.localStorage.removeItem(name)
  }
}


/**
 * 清空全部localStorage
 */
export const clearStore = (params: Params) => {
  let { type } = params
  if (type) {
    window.sessionStorage.clear()
  } else {
    window.localStorage.clear()
  }
}
