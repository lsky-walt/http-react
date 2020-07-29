import React from 'react'
import * as Axios from 'axios'
import Base from './base'

export interface PostHttpReact {
  url: string,
  children?: React.ReactChild,
  params?: any, // url params
  data?: any, // post, put data
  onResponse?: (response: Axios.AxiosRequestConfig) => void,
  onError?: (error: Axios.AxiosError) => void,
}

class Index extends React.PureComponent<PostHttpReact> {
  render() {
    return (
      <Base {...this.props} method="post" />
    )
  }
}

export default Index
