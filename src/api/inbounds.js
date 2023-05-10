import service from '@/utils/request'

// @Tags Inbounds
// @Summary 创建Inbounds
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.Inbounds true "创建Inbounds"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /inbounds/createInbounds [post]
export const createInbounds = (data) => {
  return service({
    url: '/inbounds/createInbounds',
    method: 'post',
    data
  })
}

// @Tags Inbounds
// @Summary 删除Inbounds
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.Inbounds true "删除Inbounds"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /inbounds/deleteInbounds [delete]
export const deleteInbounds = (data) => {
  return service({
    url: '/inbounds/deleteInbounds',
    method: 'delete',
    data
  })
}

// @Tags Inbounds
// @Summary 删除Inbounds
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除Inbounds"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /inbounds/deleteInbounds [delete]
export const deleteInboundsByIds = (data) => {
  return service({
    url: '/inbounds/deleteInboundsByIds',
    method: 'delete',
    data
  })
}

// @Tags Inbounds
// @Summary 更新Inbounds
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.Inbounds true "更新Inbounds"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /inbounds/updateInbounds [put]
export const updateInbounds = (data) => {
  return service({
    url: '/inbounds/updateInbounds',
    method: 'put',
    data
  })
}

// @Tags Inbounds
// @Summary 用id查询Inbounds
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query model.Inbounds true "用id查询Inbounds"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /inbounds/findInbounds [get]
export const findInbounds = (params) => {
  return service({
    url: '/inbounds/findInbounds',
    method: 'get',
    params
  })
}

export const findInboundsLink = (params) => {
  return service({
    url: '/inbounds/findInboundsLink',
    method: 'get',
    params
  })
}

export const setInboundsLink = (data) => {
  return service({
    url: '/inbounds/setInboundsLink',
    method: 'post',
    data
  })
}

// @Tags Inbounds
// @Summary 分页获取Inbounds列表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query request.PageInfo true "分页获取Inbounds列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /inbounds/getInboundsList [get]
export const getInboundsList = (params) => {
  return service({
    url: '/inbounds/getInboundsList',
    method: 'get',
    params
  })
}
