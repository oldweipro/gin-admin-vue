import service from '@/utils/request'

// @Tags PatrolItem
// @Summary 创建PatrolItem
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.PatrolItem true "创建PatrolItem"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /patrolItem/createPatrolItem [post]
export const createPatrolItem = (data) => {
  return service({
    url: '/patrolItem/createPatrolItem',
    method: 'post',
    data
  })
}

// @Tags PatrolItem
// @Summary 删除PatrolItem
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.PatrolItem true "删除PatrolItem"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /patrolItem/deletePatrolItem [delete]
export const deletePatrolItem = (data) => {
  return service({
    url: '/patrolItem/deletePatrolItem',
    method: 'delete',
    data
  })
}

// @Tags PatrolItem
// @Summary 删除PatrolItem
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除PatrolItem"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /patrolItem/deletePatrolItem [delete]
export const deletePatrolItemByIds = (data) => {
  return service({
    url: '/patrolItem/deletePatrolItemByIds',
    method: 'delete',
    data
  })
}

// @Tags PatrolItem
// @Summary 更新PatrolItem
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.PatrolItem true "更新PatrolItem"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /patrolItem/updatePatrolItem [put]
export const updatePatrolItem = (data) => {
  return service({
    url: '/patrolItem/updatePatrolItem',
    method: 'put',
    data
  })
}

// @Tags PatrolItem
// @Summary 用id查询PatrolItem
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query model.PatrolItem true "用id查询PatrolItem"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /patrolItem/findPatrolItem [get]
export const findPatrolItem = (params) => {
  return service({
    url: '/patrolItem/findPatrolItem',
    method: 'get',
    params
  })
}

// @Tags PatrolItem
// @Summary 分页获取PatrolItem列表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query request.PageInfo true "分页获取PatrolItem列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /patrolItem/getPatrolItemList [get]
export const getPatrolItemList = (params) => {
  return service({
    url: '/patrolItem/getPatrolItemList',
    method: 'get',
    params
  })
}
