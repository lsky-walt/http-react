import React from 'react'
import HttpProvider, { HttpConsumer } from './components/context/index'
import Base, { HttpReact as HR } from './components/base'
import Get, { GetHttpReact as GHR } from './components/get'
import Post, { PostHttpReact as PHR } from './components/post'
import WebSocket, { WebsocketProps as WP } from './components/websocket'

export interface HttpReact extends HR {}
export interface GetHttpReact extends GHR {}
export interface PostHttpReact extends PHR {}
export interface WebsocketProps extends WP {}

export default Base

export {
  Get,
  Post,
  WebSocket,
  HttpProvider,
  HttpConsumer,
}
