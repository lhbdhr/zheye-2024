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
      destroy() // 调用销毁方法
    },
  })
  const node = document.createElement('div')
  const destroy = () => {
    render(null, node)
    document.body.removeChild(node)
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
