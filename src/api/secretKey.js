import service from '@/utils/request'

// @Tags SecretKey
// @Summary 创建SecretKey
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.SecretKey true "创建SecretKey"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /secretKey/createSecretKey [post]
export const createSecretKey = (data) => {
  return service({
    url: '/secretKey/createSecretKey',
    method: 'post',
    data
  })
}

// @Tags SecretKey
// @Summary 删除SecretKey
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.SecretKey true "删除SecretKey"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /secretKey/deleteSecretKey [delete]
export const deleteSecretKey = (data) => {
  return service({
    url: '/secretKey/deleteSecretKey',
    method: 'delete',
    data
  })
}

// @Tags SecretKey
// @Summary 删除SecretKey
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除SecretKey"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /secretKey/deleteSecretKey [delete]
export const deleteSecretKeyByIds = (data) => {
  return service({
    url: '/secretKey/deleteSecretKeyByIds',
    method: 'delete',
    data
  })
}

// @Tags SecretKey
// @Summary 更新SecretKey
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.SecretKey true "更新SecretKey"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /secretKey/updateSecretKey [put]
export const updateSecretKey = (data) => {
  return service({
    url: '/secretKey/updateSecretKey',
    method: 'put',
    data
  })
}

// @Tags SecretKey
// @Summary 用id查询SecretKey
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query model.SecretKey true "用id查询SecretKey"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /secretKey/findSecretKey [get]
export const findSecretKey = (params) => {
  return service({
    url: '/secretKey/findSecretKey',
    method: 'get',
    params
  })
}

// @Tags SecretKey
// @Summary 分页获取SecretKey列表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query request.PageInfo true "分页获取SecretKey列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /secretKey/getSecretKeyList [get]
export const getSecretKeyList = (params) => {
  return service({
    url: '/secretKey/getSecretKeyList',
    method: 'get',
    params
  })
}
