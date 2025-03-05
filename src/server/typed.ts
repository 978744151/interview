import type {
  AxiosRequestConfig,
  RawAxiosRequestHeaders,
  AxiosHeaders,
} from 'axios'
export interface newAxiosRequestConfig extends AxiosRequestConfig {
  headers: RawAxiosRequestHeaders & AxiosHeaders
}
