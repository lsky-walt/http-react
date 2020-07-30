/* eslint-disable no-plusplus */
/* eslint-disable react/button-has-type */
import React from 'react'
import { render } from 'react-dom'
// eslint-disable-next-line import/no-named-as-default
import HttpReact, { Post, Get } from '../src'

import { http, post, get } from './config'

interface SiteState {
  count: number
}

class Index extends React.Component<{}, SiteState> {
  constructor() {
    // @ts-ignore
    super()
    this.state = {
      count: 0,
    }
  }

  render() {
    const { count } = this.state
    return (
      <div>
        <button onClick={() => {
          this.setState({
            count: count + 1,
          })
        }}
        >
          count++
        </button>
        <HttpReact
          url={http.url}
          data={{ ...http.data, count }}
          method="post"
          onResponse={(response) => { console.log('response: ', response) }}
          onError={(error) => console.log('error: ', error)}
          onLoading={(loading) => console.log('isLoading: ', loading)}
        >
          <div>
            http react
            {' '}
            {count}
          </div>
        </HttpReact>
        <Post
          url={post.url}
          data={post.data}
          onResponse={(response) => { console.log('post: ', response) }}
        >
          post http react
        </Post>
        <Get url={get.url} onResponse={(response) => { console.log('get: ', response) }} loading={<div>loading...</div>} />
      </div>
    )
  }
}

render(
  <Index />,
  document.getElementById('container'),
)
