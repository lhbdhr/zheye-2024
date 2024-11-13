import mitt from 'mitt'
export type ValidateFunc = () => boolean
type Events = {
  'form-item-created': ValidateFunc
}
export const emitter = mitt<Events>()
export default emitter
