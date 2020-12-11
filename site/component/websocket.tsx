/* eslint-disable react/button-has-type */
import React from 'react'
import { WebSocket as WS } from '../../src'

const sendMsg = (socket: WebSocket): void => {
  socket.send('message test')
}
const onMessage = (messageEvent: MessageEvent): void => {
  console.log('message: ', messageEvent)
}

class Index extends React.PureComponent {
  render() {
    return (
      <WS
        url="ws://localhost:4000"
        onMessage={onMessage}
      >
        {({ socket }: {socket: WebSocket}) => <div><button onClick={() => sendMsg(socket)}>send msg</button></div>}
      </WS>
    )
  }
}

export default Index
