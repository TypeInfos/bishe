import request from '@/axios'
import urls from '@/api'

// 获取波士顿矩阵数据
export const getMatrixDataAPI = params => request.post(urls.matrix, params)
