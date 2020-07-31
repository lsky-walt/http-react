/* eslint-disable no-plusplus */
/* eslint-disable react/button-has-type */
import React from 'react'
// eslint-disable-next-line import/no-named-as-default
import HttpReact, { Post, Get } from '../../src'

import { http, post, get } from '../config'

interface SiteState {
  count: number,
  first: boolean,
  second: boolean,
  third: boolean,
}

class Index extends React.Component<{}, SiteState> {
  first: (flag: any) => void

  third: (flag: any) => void

  second: (flag: any) => void

  constructor() {
    // @ts-ignore
    super()
    this.state = {
      count: 0,
      first: true,
      second: true,
      third: true,
    }

    this.first = this.update.bind(this, 'first')
    this.second = this.update.bind(this, 'second')
    this.third = this.update.bind(this, 'third')
  }

  update(key: 'first' | 'second' | 'third', flag: boolean) {
    // @ts-ignore
    this.setState({
      [key]: flag,
    })
  }

  render() {
    const {
      count, first, second, third,
    } = this.state
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
          onLoading={this.first}
        >
          {
            !first ? (
              <Post
                url={post.url}
                data={post.data}
                onResponse={(response) => { console.log('post: ', response) }}
                onLoading={this.second}
              >
                {
                  !second ? (
                    <Get
                      url={get.url}
                      onResponse={(response) => { console.log('get: ', response) }}
                      loading={<div>loading...</div>}
                      onLoading={this.third}
                    >
                      {
                        !third ? `nested state count: ${count}` : undefined
                      }
                    </Get>
                  ) : undefined
                }
              </Post>
            ) : undefined
          }
        </HttpReact>
      </div>
    )
  }
}

export default Index
