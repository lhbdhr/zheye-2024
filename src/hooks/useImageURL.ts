import { ImageProps } from '@/store/Utils'
import imgUrl from '../assets/avatar.jpg'
const imageUrlReg = /oss-cn/
const useImageURL = (
  image: ImageProps | string | undefined,
  type: 'avatar' | 'thumbnail' | 'origin',
  width?: number | undefined,
  height?: number | undefined
) => {
  if (typeof image === 'string') {
    if (imageUrlReg.test(image)) {
      return image + widthAndHeight(width, height)
    }
    return image
  } else if (image && image.url) {
    if (imageUrlReg.test(image.url)) {
      return image.url + widthAndHeight(width, height)
    }
    return image.url
  } else if (type === 'avatar') {
    return imgUrl
  } else {
    return ''
  }
}
function widthAndHeight(width: number | undefined, height: number | undefined) {
  if (width && height) {
    return `?x-oss-process=image/resize,m_pad,h_${height},w_${width}`
  } else if (width) {
    return `?x-oss-process=image/resize,m_pad,w_${width}`
  } else if (height) {
    return `?x-oss-process=image/resize,m_pad,h_${height}`
  }
  return ''
}
export default useImageURL
