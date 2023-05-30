import service from '@/utils/request'

// @Tags Wallets
// @Summary 创建Wallets
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.Wallets true "创建Wallets"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /wallets/createWallets [post]
export const createWallets = (data) => {
  return service({
    url: '/wallets/createWallets',
    method: 'post',
    data
  })
}

// @Tags Wallets
// @Summary 删除Wallets
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.Wallets true "删除Wallets"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /wallets/deleteWallets [delete]
export const deleteWallets = (data) => {
  return service({
    url: '/wallets/deleteWallets',
    method: 'delete',
    data
  })
}

// @Tags Wallets
// @Summary 删除Wallets
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除Wallets"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /wallets/deleteWallets [delete]
export const deleteWalletsByIds = (data) => {
  return service({
    url: '/wallets/deleteWalletsByIds',
    method: 'delete',
    data
  })
}

// @Tags Wallets
// @Summary 更新Wallets
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.Wallets true "更新Wallets"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /wallets/updateWallets [put]
export const updateWallets = (data) => {
  return service({
    url: '/wallets/updateWallets',
    method: 'put',
    data
  })
}

// @Tags Wallets
// @Summary 用id查询Wallets
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query model.Wallets true "用id查询Wallets"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /wallets/findWallets [get]
export const findWallets = (params) => {
  return service({
    url: '/wallets/findWallets',
    method: 'get',
    params
  })
}

// @Tags Wallets
// @Summary 分页获取Wallets列表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query request.PageInfo true "分页获取Wallets列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /wallets/getWalletsList [get]
export const getWalletsList = (params) => {
  return service({
    url: '/wallets/getWalletsList',
    method: 'get',
    params
  })
}
