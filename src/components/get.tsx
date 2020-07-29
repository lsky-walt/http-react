import React from 'react'
import * as Axios from 'axios'
import Base from './base'

export interface GetHttpReact {
  url: string,
  children?: React.ReactChild,
  params?: any, // url params
  onResponse?: (response: Axios.AxiosRequestConfig) => void,
  onError?: (error: Axios.AxiosError) => void,
}

class Index extends React.PureComponent<GetHttpReact> {
  render() {
    return (
      <Base {...this.props} method="get" />
    )
  }
}

export default Index
