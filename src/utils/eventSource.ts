export enum EventType {
  MSG = 'message',
}

type Cb = (msg: any) => void
const defaultCbs = {
  [EventType.MSG]: [],
}

export class Source {
  url = ''
  listening = false
  events?: EventSource
  resolve: any
  reject: any
  callbacks: Record<EventType, Cb[]> = defaultCbs
  reconnectFrequencySeconds = 5

  constructor() {
    this.getUrl()
  }

  getUrl() {
    this.url = `https://moodweather-api.midway.run/v1/subscribe`
  }

  connect() {
    const p = new Promise((resolve, reject) => {
      this.resolve = resolve
      this.reject = reject
    })
    this.events = new EventSource(this.url)
    console.log('did connnet')
    this.events.addEventListener('open', this.onOpen.bind(this))
    this.events.addEventListener('message', (e) => {
      this.onMessage(EventType.MSG, e)
    })
    this.events.addEventListener('error', this.onError.bind(this))
    return p
  }

  on(event: EventType, cb: (msg: any) => void) {
    if (this.callbacks[event].indexOf(cb) < 0) {
      this.callbacks[event].push(cb)
    }
  }

  off(event: EventType) {
    this.callbacks[event] = []
  }

  onOpen(e: any) {
    console.log('EventSource open')
    this.listening = true
    this.resolve && this.resolve()
  }

  onMessage(eventType: EventType, e: any) {
    try {
      const msg = JSON.parse(e?.data)
      console.log('EventSource message', eventType, msg)
      this.callbacks[eventType].forEach((cb) => {
        cb(msg)
      })
    } catch (err) {
      console.log('EventSource message parse error')
    }
  }

  onError(err: any) {
    const error = JSON.stringify(err, ['message', 'arguments', 'type', 'name'])
    if (!this.listening) {
      this.reject && this.reject(error)
    }
    console.log('EventSource error', error)
    this.reconnect()
  }

  reconnect() {
    this.events && this.events.close()
    setTimeout(async () => {
      try {
        this.getUrl()
        this.reconnectFrequencySeconds
        console.log('EventSource try reconnect', this.reconnectFrequencySeconds)
        await this.connect()
        console.log('EventSource reconnect success')
      } catch (err) {
        console.log('EventSource reconnect failed', err)
      }
    }, this.reconnectFrequencySeconds * 1000)
  }

  close() {
    this.events && this.events.close()
    this.listening = false
    this.callbacks[EventType.MSG] = []
    // remove listeners?
  }
}
