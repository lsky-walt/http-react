import * as React from 'react'
import { addEventListener, AddEventListener } from './util'

export interface WebsocketProps {
  url: string,
  timeout?: number,
  max?: number,
  onOpen?: (event: Event) => void,
  onMessage?: (mse: MessageEvent) => void,
  onClose?: (event: CloseEvent) => void,
  onError?: (event: Event) => void,
  children: React.ReactNode
}

export interface WebSocketState {
  socket: WebSocket | null
}

class Index extends React.Component<WebsocketProps, WebSocketState> {
  onOpen: AddEventListener | null

  onMessage: AddEventListener | null

  onClose: AddEventListener | null

  onError: AddEventListener | null

  timer: any

  code: Array<number>

  max: number | void

  static displayName: string

  constructor(props: WebsocketProps) {
    super(props)

    this.onOpen = null
    this.onMessage = null
    this.onClose = null
    this.onError = null
    this.timer = null

    this.code = [1002, 1003, 1005, 1006, 1007, 1008, 1009, 1011, 1012, 1013, 1015]

    this.state = {
      socket: null,
    }

    this.max = props.max || 10

    this.close = this.close.bind(this)
    this.open = this.open.bind(this)
  }

  componentDidMount() {
    this.init()
  }

  componentDidUpdate(prevProps: WebsocketProps) {
    if (prevProps.url !== this.props.url) {
      this.clear()
      this.init()
    }
  }

  componentWillUnmount() {
    this.clear()
  }

  init() {
    const {
      url, onMessage, onError,
    } = this.props
    const socket: WebSocket = new WebSocket(url)

    this.onOpen = addEventListener(socket, 'open', this.open)

    if (typeof onMessage === 'function') {
      this.onMessage = addEventListener(socket, 'message', onMessage)
    }

    this.onClose = addEventListener(socket, 'close', this.close)

    if (typeof onError === 'function') {
      this.onError = addEventListener(socket, 'error', onError)
    }

    this.setState({
      socket,
    })
  }

  reOpen() {
    const { timeout = 1000, max = 10 } = this.props
    this.clear()
    clearTimeout(this.timer)
    if (typeof this.max !== 'number' || this.max <= 0) {
      console.error('Restart failed !')
      return
    }
    this.max -= 1
    console.warn('WebSocket will restart after 1s.')
    this.timer = setTimeout(() => {
      this.init()
    }, timeout)
  }

  checkCloseCode(code: number) {
    if (this.code.includes(code)) {
      this.reOpen()
    }
  }

  open(event: Event) {
    const { onOpen, max } = this.props
    if (typeof onOpen === 'function') {
      onOpen(event)
    }
    this.max = max || 10
  }

  close(closeEvent: CloseEvent) {
    const { onClose } = this.props
    if (typeof onClose === 'function') {
      onClose(closeEvent)
    }

    this.checkCloseCode(closeEvent.code)
  }

  clear() {
    if (this.onOpen) {
      this.onOpen.remove()
    }
    if (this.onMessage) {
      this.onMessage.remove()
    }
    if (this.onClose) {
      this.onClose.remove()
    }
    if (this.onError) {
      this.onError.remove()
    }

    this.setState({
      socket: null,
    })
  }

  render() {
    const { children } = this.props
    const { socket } = this.state
    if (typeof children === 'function') {
      return children({ socket })
    }
    return children
  }
}

Index.displayName = 'HttpWebSocket'

export default Index
