/* eslint-disable react/prefer-stateless-function */
// eslint-disable-next-line max-classes-per-file
import * as React from 'react'
import * as Axios from 'axios'

export interface HttpReactProps {
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

export interface GetHttpReact {
  url: string,
  debounce?: number,
  params?: any, // url params
  children?: React.ReactChild,
  onResponse?: (response: Axios.AxiosRequestConfig) => void,
  onError?: (error: Axios.AxiosError) => void,
  onLoading?: (loading: boolean) => void,
}

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

export interface RootAxios extends Axios.AxiosRequestConfig {
  children?: React.ReactChild,
  instance?: Axios.AxiosInstance
}

declare class Get extends React.Component<GetHttpReact, {}> {
  render(): JSX.Element;
}

declare class Post extends React.Component<PostHttpReact, {}> {
  render(): JSX.Element;
}

declare class HttpProvider extends React.Component<RootAxios, {}> {
  render(): JSX.Element;
}

declare class HttpReact extends React.Component<HttpReactProps, {}> {
  static Get: typeof Get

  static Post: typeof Post

  static HttpProvider: typeof HttpProvider

  render(): JSX.Element;
}
