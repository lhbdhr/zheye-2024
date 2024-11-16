import { ImageProps } from '@/store/Utils'
const imageUrlReg = /oss-cn/
const useImageURL = (
  image: ImageProps | string | undefined,
  width: number | undefined,
  height: number | undefined
) => {
  if (typeof image === 'string') {
    if (imageUrlReg.test(image) && width && height) {
      return image + `?x-oss-process=image/resize,m_pad,h_${height},w_${width}`
    }
    return image
  } else if (image && image.url && width && height) {
    if (imageUrlReg.test(image.url)) {
      return (
        image.url + `?x-oss-process=image/resize,m_pad,h_${height},w_${width}`
      )
    }
    return image.url
  } else {
    return ''
  }
}

export default useImageURL
