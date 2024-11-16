import { ImageProps } from '@/store/Utils'
const useImageURL = (image: ImageProps | string | undefined) => {
  if (typeof image === 'string') {
    return image
  } else if (image) {
    return image.url
  } else {
    return ''
  }
}

export default useImageURL
