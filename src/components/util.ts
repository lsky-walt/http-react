import ReactDOM from 'react-dom'

export interface AddEventListener {
  remove: () => void
}

function addEventListener(target: HTMLElement | WebSocket, eventType: string, cb: (event: any) => void, option?: any): AddEventListener {
  /* eslint camelcase: 2 */
  const callback = ReactDOM.unstable_batchedUpdates ? function run(e: Event) {
    ReactDOM.unstable_batchedUpdates(cb, e)
  } : cb

  if (target.addEventListener) {
    target.addEventListener(eventType, callback, option)
  }

  return {
    remove: function remove() {
      if (target.removeEventListener) {
        target.removeEventListener(eventType, callback)
      }
    },
  }
}

const debounce = (fn: Function, timeout: number, immediately: boolean = false) => {
  let timer: any = null
  let params:any = null
  return function (...args: any[]) {
    // @ts-ignore
    const ctx = this
    if (!timer) {
      params = args
      if (immediately) fn.apply(ctx, args)
    }
    clearTimeout(timer)
    timer = setTimeout(() => {
      timer = null
      if (!immediately || (immediately && params !== args)) fn.apply(ctx, args)
    }, timeout)
  }
}

export {
  debounce,
  addEventListener,
}
