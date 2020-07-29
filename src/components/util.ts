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
}
