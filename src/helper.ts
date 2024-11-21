interface CheckCondition {
  validType?: string[]
  size?: number
}
type ErrorType = 'validType' | 'validSize' | null
export function beforeUploadCheck(file: File, condition: CheckCondition) {
  const { validType, size } = condition
  const isValidType = validType ? validType.includes(file.type) : true
  const isValidSize = size ? file.size / 1024 / 1024 < size : true
  let error: ErrorType = null
  if (!isValidType) {
    error = 'validType'
  } else if (!isValidSize) {
    error = 'validSize'
  }
  return {
    passed: isValidType && isValidSize,
    error,
  }
}
