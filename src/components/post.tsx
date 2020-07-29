import React from 'react'
import * as Axios from 'axios'
import Base from './base'

export interface PostHttpReact {
  url: string,
  debounce?: number,
  params?: any, // url params
  data?: any, // post, put data
  children?: React.ReactChild,
  onResponse?: (response: Axios.AxiosRequestConfig) => void,
  onError?: (error: Axios.AxiosError) => void,
  onLoading?: (loading: boolean) => void,
}

class Index extends React.PureComponent<PostHttpReact> {
  render() {
    return (
      <Base {...this.props} method="post" />
    )
  }
}

export default Index
