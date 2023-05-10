import service from '@/utils/request'

// @Tags PatrolTask
// @Summary 创建PatrolTask
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.PatrolTask true "创建PatrolTask"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /patrolTask/createPatrolTask [post]
export const createPatrolTask = (data) => {
  return service({
    url: '/patrolTask/createPatrolTask',
    method: 'post',
    data
  })
}

// @Tags PatrolTask
// @Summary 删除PatrolTask
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.PatrolTask true "删除PatrolTask"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /patrolTask/deletePatrolTask [delete]
export const deletePatrolTask = (data) => {
  return service({
    url: '/patrolTask/deletePatrolTask',
    method: 'delete',
    data
  })
}

// @Tags PatrolTask
// @Summary 删除PatrolTask
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除PatrolTask"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /patrolTask/deletePatrolTask [delete]
export const deletePatrolTaskByIds = (data) => {
  return service({
    url: '/patrolTask/deletePatrolTaskByIds',
    method: 'delete',
    data
  })
}

// @Tags PatrolTask
// @Summary 更新PatrolTask
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.PatrolTask true "更新PatrolTask"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /patrolTask/updatePatrolTask [put]
export const updatePatrolTask = (data) => {
  return service({
    url: '/patrolTask/updatePatrolTask',
    method: 'put',
    data
  })
}

// @Tags PatrolTask
// @Summary 用id查询PatrolTask
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query model.PatrolTask true "用id查询PatrolTask"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /patrolTask/findPatrolTask [get]
export const findPatrolTask = (params) => {
  return service({
    url: '/patrolTask/findPatrolTask',
    method: 'get',
    params
  })
}

// @Tags PatrolTask
// @Summary 分页获取PatrolTask列表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query request.PageInfo true "分页获取PatrolTask列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /patrolTask/getPatrolTaskList [get]
export const getPatrolTaskList = (params) => {
  return service({
    url: '/patrolTask/getPatrolTaskList',
    method: 'get',
    params
  })
}
