import React from 'react'
import * as Axios from 'axios'
import Base from './base'

export interface GetHttpReact {
  url: string,
  debounce?: number,
  params?: any, // url params
  children?: React.ReactChild,
  loading?: React.ReactNode | boolean,
  onResponse?: (response: Axios.AxiosRequestConfig) => void,
  onError?: (error: Axios.AxiosError) => void,
  onLoading?: (loading: boolean) => void,
}

class Index extends React.PureComponent<GetHttpReact> {
  render() {
    return (
      <Base {...this.props} method="get" />
    )
  }
}

export default Index
