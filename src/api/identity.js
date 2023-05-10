import service from '@/utils/request'

// @Tags Identity
// @Summary 创建Identity
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.Identity true "创建Identity"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /identity/createIdentity [post]
export const createIdentity = (data) => {
  return service({
    url: '/identity/createIdentity',
    method: 'post',
    data
  })
}

// @Tags Identity
// @Summary 删除Identity
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.Identity true "删除Identity"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /identity/deleteIdentity [delete]
export const deleteIdentity = (data) => {
  return service({
    url: '/identity/deleteIdentity',
    method: 'delete',
    data
  })
}

// @Tags Identity
// @Summary 删除Identity
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除Identity"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /identity/deleteIdentity [delete]
export const deleteIdentityByIds = (data) => {
  return service({
    url: '/identity/deleteIdentityByIds',
    method: 'delete',
    data
  })
}

// @Tags Identity
// @Summary 更新Identity
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.Identity true "更新Identity"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /identity/updateIdentity [put]
export const updateIdentity = (data) => {
  return service({
    url: '/identity/updateIdentity',
    method: 'put',
    data
  })
}

// @Tags Identity
// @Summary 用id查询Identity
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query model.Identity true "用id查询Identity"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /identity/findIdentity [get]
export const findIdentity = (params) => {
  return service({
    url: '/identity/findIdentity',
    method: 'get',
    params
  })
}

// @Tags Identity
// @Summary 分页获取Identity列表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query request.PageInfo true "分页获取Identity列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /identity/getIdentityList [get]
export const getIdentityList = (params) => {
  return service({
    url: '/identity/getIdentityList',
    method: 'get',
    params
  })
}
