import service from '@/utils/request'

// @Tags PatrolSite
// @Summary 创建PatrolSite
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.PatrolSite true "创建PatrolSite"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /patrolSite/createPatrolSite [post]
export const createPatrolSite = (data) => {
  return service({
    url: '/patrolSite/createPatrolSite',
    method: 'post',
    data
  })
}

// @Tags PatrolSite
// @Summary 删除PatrolSite
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.PatrolSite true "删除PatrolSite"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /patrolSite/deletePatrolSite [delete]
export const deletePatrolSite = (data) => {
  return service({
    url: '/patrolSite/deletePatrolSite',
    method: 'delete',
    data
  })
}

// @Tags PatrolSite
// @Summary 删除PatrolSite
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除PatrolSite"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /patrolSite/deletePatrolSite [delete]
export const deletePatrolSiteByIds = (data) => {
  return service({
    url: '/patrolSite/deletePatrolSiteByIds',
    method: 'delete',
    data
  })
}

// @Tags PatrolSite
// @Summary 更新PatrolSite
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.PatrolSite true "更新PatrolSite"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /patrolSite/updatePatrolSite [put]
export const updatePatrolSite = (data) => {
  return service({
    url: '/patrolSite/updatePatrolSite',
    method: 'put',
    data
  })
}

// @Tags PatrolSite
// @Summary 用id查询PatrolSite
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query model.PatrolSite true "用id查询PatrolSite"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /patrolSite/findPatrolSite [get]
export const findPatrolSite = (params) => {
  return service({
    url: '/patrolSite/findPatrolSite',
    method: 'get',
    params
  })
}

// @Tags PatrolSite
// @Summary 分页获取PatrolSite列表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query request.PageInfo true "分页获取PatrolSite列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /patrolSite/getPatrolSiteList [get]
export const getPatrolSiteList = (params) => {
  return service({
    url: '/patrolSite/getPatrolSiteList',
    method: 'get',
    params
  })
}
