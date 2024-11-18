import { h, render } from 'vue'
import Message from './Message.vue'
export type MessageType = 'success' | 'error' | 'default'
const createMessage = (
  type: MessageType,
  message?: string,
  duration?: number
) => {
  const messageVnode = h(Message, {
    type,
    message,
  })
  const node = document.createElement('div')
  const destory = () => {
    render(null, node)
    document.body.removeChild(node)
  }
  document.body.appendChild(node)
  render(messageVnode, node)
  if (duration) {
    setTimeout(() => {
      destory()
    }, duration)
  }
  return {
    destory,
  }
}

export default createMessage
