import React from 'react'
import * as Axios from 'axios'
import pick from 'lodash.pick'
import isequal from 'lodash.isequal'
import { debounce as de } from './util'
import { HttpContext } from './context/index'

export interface HttpReact {
  method: 'get' | 'post' | 'put' | 'delete',
  url: string,
  debounce?: number,
  params?: any, // url params
  data?: any, // post, put data
  children?: React.ReactChild,
  onResponse?: (response: Axios.AxiosRequestConfig) => void,
  onError?: (error: Axios.AxiosError) => void,
  onLoading?: (loading: boolean) => void,
}

interface HttpProps {
  method: 'get' | 'post' | 'put' | 'delete',
  url: string,
  params?: any, // url params
  data?: any, // post, put data
  onResponse?: (response: Axios.AxiosRequestConfig) => void,
  onError?: (error: Axios.AxiosError) => void,
  onLoading?: (loading: boolean) => void,
}

const compareKey = ['method', 'url', 'params', 'data', 'debounce']

class Index extends React.Component<HttpReact> {
  inLoading: () => void

  notLoading: () => void

  // @ts-ignore
  debounceHttp: (params: HttpProps) => void

  constructor(props: HttpReact) {
    super(props)
    this.inLoading = this.loading.bind(this, true)
    this.notLoading = this.loading.bind(this, false)

    this.http = this.http.bind(this)
    this.setDebounceHttp = this.setDebounceHttp.bind(this)

    // init http
    this.setDebounceHttp()
  }

  componentDidMount() {
    // this.http()
    const { children, debounce, ...params } = this.props
    this.debounceHttp(params)
  }

  componentDidUpdate(prevProps: HttpReact) {
    const { debounce, children, ...props } = this.props
    if (prevProps.debounce !== debounce) {
      this.setDebounceHttp()
    }

    if (!isequal(pick(this.props, compareKey), pick(prevProps, compareKey))) {
      this.debounceHttp(props)
    }
  }

  setDebounceHttp() {
    const { debounce = 100 } = this.props
    // @ts-ignore
    this.debounceHttp = de(this.http, debounce, true)
  }

  http(props: HttpProps) {
    const { axios } = this.context
    const {
      url, method = 'get', onResponse = () => {}, onError = () => {}, onLoading, ...options
    } = props

    // loading
    this.inLoading()

    axios({
      method,
      url,
      ...options,
    }).then((response: Axios.AxiosResponse) => {
      this.notLoading()
      if (typeof onResponse === 'function') onResponse(response)
    })
      .catch((error: Axios.AxiosError) => {
        this.notLoading()
        if (typeof onError === 'function') onError(error)
      })
  }

  loading(flag: boolean) {
    const { onLoading } = this.props
    if (typeof onLoading === 'function') onLoading(flag)
  }

  render() {
    const { children } = this.props
    return (
    <>{children}</>
    )
  }
}

Index.contextType = HttpContext

export default Index
