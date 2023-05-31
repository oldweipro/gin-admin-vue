import service from '@/utils/request'

// @Tags TransactionHistory
// @Summary 创建TransactionHistory
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.TransactionHistory true "创建TransactionHistory"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /transactionHistory/createTransactionHistory [post]
export const createTransactionHistory = (data) => {
  return service({
    url: '/transactionHistory/createTransactionHistory',
    method: 'post',
    data
  })
}

// @Tags TransactionHistory
// @Summary 删除TransactionHistory
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.TransactionHistory true "删除TransactionHistory"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /transactionHistory/deleteTransactionHistory [delete]
export const deleteTransactionHistory = (data) => {
  return service({
    url: '/transactionHistory/deleteTransactionHistory',
    method: 'delete',
    data
  })
}

// @Tags TransactionHistory
// @Summary 删除TransactionHistory
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除TransactionHistory"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /transactionHistory/deleteTransactionHistory [delete]
export const deleteTransactionHistoryByIds = (data) => {
  return service({
    url: '/transactionHistory/deleteTransactionHistoryByIds',
    method: 'delete',
    data
  })
}

// @Tags TransactionHistory
// @Summary 更新TransactionHistory
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.TransactionHistory true "更新TransactionHistory"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /transactionHistory/updateTransactionHistory [put]
export const updateTransactionHistory = (data) => {
  return service({
    url: '/transactionHistory/updateTransactionHistory',
    method: 'put',
    data
  })
}

// @Tags TransactionHistory
// @Summary 用id查询TransactionHistory
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query model.TransactionHistory true "用id查询TransactionHistory"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /transactionHistory/findTransactionHistory [get]
export const findTransactionHistory = (params) => {
  return service({
    url: '/transactionHistory/findTransactionHistory',
    method: 'get',
    params
  })
}

// @Tags TransactionHistory
// @Summary 分页获取TransactionHistory列表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query request.PageInfo true "分页获取TransactionHistory列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /transactionHistory/getTransactionHistoryList [get]
export const getTransactionHistoryList = (params) => {
  return service({
    url: '/transactionHistory/getTransactionHistoryList',
    method: 'get',
    params
  })
}
