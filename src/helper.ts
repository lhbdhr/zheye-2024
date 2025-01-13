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
export const objToArr = <T>(obj: { [key: string]: T }) => {
  return Object.keys(obj).map((key) => obj[key])
}
export const arrToObj = <T extends { _id?: string }>(arr: Array<T>) => {
  return arr.reduce((prev, current) => {
    if (current._id) {
      prev[current._id] = current
    }
    return prev
  }, {} as { [key: string]: T })
}
// interface TestProps {
//   _id: string
//   name: string
// }
// const testData: TestProps[] = [
//   { _id: '3', name: 'a' },
//   { _id: '2', name: 'b' },
// ]
// const result = arrToObj(testData)
// console.log('testData1', result)

// const testData2: { [key: string]: TestProps } = {
//   '1': { _id: '1', name: 'a' },
//   '2': { _id: '2', name: 'b' },
// }
// const result2 = objToArr(testData2)
// console.log('testData2', result2)
