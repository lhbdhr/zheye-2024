import { defineStore } from 'pinia'
import { ImageProps } from './Utils'
export interface ColumnProps {
  _id: string
  title: string
  avatar?: ImageProps
  description: string
}
export const useColumnStore = defineStore('column', {
  state: () => ({
    columns: [] as ColumnProps[],
  }),
  getters: {
    getColumnById: (state) => {
      return (id: string) => state.columns.find((c) => c._id === id)
    },
  },
  actions: {
    fetchAllColumns() {},

    addTestColumn() {
      this.columns.push(
        {
          _id: '1',
          title: 'test1的专栏',
          description:
            '这是的test1专栏，有一段非常有意思的简介，可以更新一下欧, 这是的test1专栏，有一段非常有意思的简介，可以更新一下欧',
          avatar: {
            url: 'https://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_150,w_150',
          },
        },
        {
          _id: '2',
          title: 'test2的专栏',
          description:
            '这是的test2专栏，有一段非常有意思的简介，可以更新一下欧',
          avatar: {
            url: 'https://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100',
          },
        },
        {
          _id: '3',
          title: 'test3的专栏',
          description:
            '这是的test1专栏，有一段非常有意思的简介，可以更新一下欧 这是的test1专栏，有一段非常有意思的简介，可以更新一下欧',
          avatar: {
            url: 'https://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100',
          },
        },
        {
          _id: '4',
          title: 'test4的专栏',
          description:
            '这是的test2专栏，有一段非常有意思的简介，可以更新一下欧',
          avatar: {
            url: 'https://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100',
          },
        },
        {
          _id: '5',
          title: 'test5的专栏',
          description:
            '这是的test2专栏，有一段非常有意思的简介，可以更新一下欧',
          avatar: {
            url: 'https://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100',
          },
        }
      )
    },
  },
})
