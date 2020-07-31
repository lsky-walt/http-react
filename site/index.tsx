/* eslint-disable no-plusplus */
/* eslint-disable react/button-has-type */
import React from 'react'
import { render } from 'react-dom'
import Base from './component/base'
import Nested from './component/nested'

interface SiteState {
  count: number
}

class Index extends React.PureComponent {
  render() {
    return (
      <div>
        <Nested />
      </div>
    )
  }
}

render(
  <Index />,
  document.getElementById('container'),
)
