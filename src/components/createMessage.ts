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
    onCloseMessage: () => {
      destroy()
    },
  })
  const node = document.createElement('div')
  const destroy = () => {
    render(null, node)
    if (node && document.body.contains(node)) {
      document.body.removeChild(node)
    }
  }
  document.body.appendChild(node)
  render(messageVnode, node)
  if (duration) {
    setTimeout(() => {
      destroy()
    }, duration)
  }
  return {
    destroy,
  }
}

export default createMessage
