
<p align="center">
  <img src="./assets/orange.png" width="120" alt="logo" />
</p>

<h1 align="center">Http React</h1>

<p align="center">
  <a href="https://github.com/lsky-walt/http-react">A http React Component</a>
</p>


<p align="center">
  <img href="https://github.com/lsky-walt/http-react" src="https://img.shields.io/badge/npm-0.0.4-blue?style=flat-square">
  <img href="https://github.com/lsky-walt/http-react" src="https://img.shields.io/badge/React-%3E=16.9.0-brightgreen?style=flat-square">
  <img href="https://github.com/lsky-walt/http-react" src="https://img.shields.io/badge/axios-%3E=0.19.0-brightgreen?style=flat-square">
  <img href="https://github.com/lsky-walt/http-react" src="https://img.shields.io/badge/size-21k-blue?style=flat-square">
  <img href="https://github.com/lsky-walt/http-react" src="https://img.shields.io/badge/gzip-5.8k-important?style=flat-square">
</p>


## ✨ Features

- Extends [Axios](https://github.com/axios/axios)
- React Component
- Support `<HttpProvider />`

## 📦 installing

### npm

```javascript
$ npm install @lsky/http-react --save
```


### yarn

```javascript
$ yarn add @lsky/http-react
```

### And you need to install Axios and React

```javascript
$ yarn add react axios
```

## 🔨 Example

```javascript
import React from 'react'
import HttpReact, { Post, Get, HttpProvider } from '@lsky/http-react'

class Index extends React.Component {
  render() {
    return (
      <div>
        <HttpReact
          url="/test/test"
          data={{ param: 'abc' }}
          method="post"
          onResponse={(response) => { console.log('response: ', response) }}
          onError={(error) => console.log('error: ', error)}
          onLoading={(loading) => console.log('isLoading: ', loading)}
        >
          http react
        </HttpReact>
        <Post
          url="/test/test"
          data={{ param: 'abc' }}
          onResponse={(response) => { console.log('post: ', response) }}
        >
          post http react
        </Post>
        <Get
          url="/test/test"
          params={{ param: 'abc' }}
          onResponse={(response) => { console.log('get: ', response) }}
        >
          post http react
        </Get>

        <HttpProvider baseURL={"http://localhost:3000"}>
          <Post
            url="/test/test"
            data={{ path: '/test/test' }}
            onResponse={(response) => { console.log('post: ', response) }}
          >
            post http react
          </Post>
        </HttpProvider>
        <Get 
          url={get.url} 
          onResponse={(response) => { console.log('get: ', response) }} 
          loading={<div>loading...</div>} 
        />
      </div>
    )
  }
}

```

### ⚡️ WebSocket

```javascript
import React from 'react'
import { WebSocket } from '@lsky/http-react'

const sendMsg = (socket) => {
  socket.send('message test')
}
const onMessage = (messageEvent) => {
  console.log('message: ', messageEvent)
}

class Index extends React.PureComponent {
  render() {
    return (
      <WebSocket
        url="ws://localhost:4000"
        onMessage={onMessage}
      >
        {({ socket }) => <div><button onClick={() => sendMsg(socket)}>send msg</button></div>}
      </WebSocket>
    )
  }
}
```


## 🍰 Components & PropTypes

### HttpReact

| attr | type | default value | desc |
| --- | --- | --- | --- |
| method | string | null | http method |
| url | string | null | url |
| debounce | number | 500 | debounce |
| data | string \| plain object \| URLSearchParams | null | `data` is the data to be sent as the request body; Only applicable for request methods 'PUT', 'POST', and 'PATCH' |
| params | plain object | null | `params` are the URL parameters to be sent with the request |
| children | React.ReactChild | null | react node |
| loading | React.ReactNode \| boolean | null | show in loading |
| onResponse | (response) => void | null | onResponse |
| onError | (error) => void | null | onError |
| onLoading | (isLoading: boolean) => void | null | onLoading |


### Get

| attr | type | default value | desc |
| --- | --- | --- | --- |
| url | string | null | url |
| debounce | number | 500 | debounce |
| params | plain object | null | `params` are the URL parameters to be sent with the request |
| children | React.ReactChild | null | react node |
| loading | React.ReactNode \| boolean | null | show in loading |
| onResponse | (response) => void | null | onResponse |
| onError | (error) => void | null | onError |
| onLoading | (isLoading: boolean) => void | null | onLoading |


### Post

| attr | type | default value | desc |
| --- | --- | --- | --- |
| url | string | null | url |
| debounce | number | 500 | debounce |
| data | string \| plain object \| URLSearchParams | null | `data` is the data to be sent as the request body; Only applicable for request methods 'PUT', 'POST', and 'PATCH' |
| params | plain object | null | `params` are the URL parameters to be sent with the request |
| children | React.ReactChild | null | react node |
| loading | React.ReactNode \| boolean | null | show in loading |
| onResponse | (response) => void | null | onResponse |
| onError | (error) => void | null | onError |
| onLoading | (isLoading: boolean) => void | null | onLoading |


### WebSocket

| attr | type | default value | desc |
| --- | --- | --- | --- |
| url | string | null | websocket url |
| timeout | number | 1000 | restart time |
| max | number | 10 | restart count |
| children | React.ReactNode \| ({socket}) => React.ReactNode | null | react node |
| onOpen | (event) => void | null | socket open callback |
| onMessage | (messageEvent) => void | null | recieve message callback |
| onClose | (closeEvent) => void | null | socket close callback |
| onError | (event) => void | null | socket error callback |