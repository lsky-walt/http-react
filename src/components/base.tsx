import React, { isValidElement } from 'react'
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
  loading?: React.ReactNode | boolean,
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

interface HttpState {
  show: boolean
}

const compareKey = ['method', 'url', 'params', 'data', 'debounce']

class Index extends React.Component<HttpReact, HttpState> {
  inLoading: () => void

  notLoading: () => void

  // @ts-ignore
  debounceHttp: (params: HttpProps) => void

  constructor(props: HttpReact) {
    super(props)
    this.inLoading = this.loading.bind(this, true)
    this.notLoading = this.loading.bind(this, false)
    this.renderChildren = this.renderChildren.bind(this)
    this.check = this.check.bind(this)

    this.http = this.http.bind(this)
    this.setDebounceHttp = this.setDebounceHttp.bind(this)

    // init http
    this.setDebounceHttp()

    this.state = {
      show: false,
    }
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
    const { debounce = 500 } = this.props
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

    this.setState({
      show: !flag,
    })
  }

  // check children
  check() {
    const { children } = this.props
    if (children) return children
    return null
  }

  // inject is loading
  renderChildren() {
    const { loading } = this.props
    const { show } = this.state
    if (!loading) return this.check()

    // is show
    if (!show) {
      if (isValidElement(loading)) return loading
      return null
    }

    return this.check()
  }

  render() {
    return this.renderChildren()
  }
}

Index.contextType = HttpContext

export default Index
