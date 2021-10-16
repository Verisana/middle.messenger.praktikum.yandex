export class EventBus {
  listeners: Record<string, Function[]>

  constructor() {
    this.listeners = {}
  }

  on(event: string, callback: Function) {
    if (!this.listeners[event]) {
      this.listeners[event] = []
    }

    this.listeners[event].push(callback)
  }

  off(event: string, callback: Function) {
    if (!this.listeners[event]) {
      console.log(`Попытка отписаться от отсутствующего события:${event}`)
    }

    this.listeners[event] = this.listeners[event].filter(
      (listener) => listener !== callback
    )
  }

  emit(event: string, ...args: unknown[]) {
    if (this.listeners[event]) {
      this.listeners[event].forEach((listener) => {
        listener(...args)
      })
    }
  }
}

const instance = new EventBus()

export function globalEventBus() {
  return instance
}
