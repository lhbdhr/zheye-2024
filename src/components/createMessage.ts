import { createApp } from 'vue'
import Message from './Message.vue'
export type MessageType = 'success' | 'error' | 'default'
const createMessage = (
  type: MessageType,
  message?: string,
  duration = 3000
) => {
  const MessageInstance = createApp(Message, {
    type,
    message,
  })
  const node = document.createElement('div')
  document.body.appendChild(node)
  MessageInstance.mount(node)
  setTimeout(() => {
    MessageInstance.unmount()
    document.body.removeChild(node)
  }, duration)
}

export default createMessage
