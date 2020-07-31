import React, { createContext } from 'react'
import axios, { AxiosRequestConfig, AxiosInstance } from 'axios'

interface ContextType {
  axios: null | AxiosInstance,
}

export const HttpContext = createContext<ContextType>({
  axios: axios.create(),
})

export interface RootAxios extends AxiosRequestConfig {
  children?: React.ReactChild,
  instance?: AxiosInstance,
}

class HttpProvider extends React.Component<RootAxios> {
  axios: null | AxiosInstance

  constructor(props: RootAxios) {
    super(props)
    this.axios = axios.create()
  }

  // eslint-disable-next-line react/no-deprecated
  componentWillMount() {
    const { children, instance, ...defaults } = this.props
    if (instance) this.axios = instance
    if (this.axios && Object.keys(defaults).length > 0) this.axios.defaults = { ...this.axios.defaults, ...defaults }
  }

  componentWillUnmount() {
    if (this.axios) this.axios = null
  }

  render() {
    const { children } = this.props
    return (
      <HttpContext.Provider value={{ axios: this.axios }}>{children}</HttpContext.Provider>
    )
  }
}

export const HttpConsumer = HttpContext.Consumer

export default HttpProvider
