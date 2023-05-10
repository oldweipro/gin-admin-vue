import service from '@/utils/request'

// @Tags ServerNode
// @Summary 创建ServerNode
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.ServerNode true "创建ServerNode"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /serverNode/createServerNode [post]
export const createServerNode = (data) => {
  return service({
    url: '/serverNode/createServerNode',
    method: 'post',
    data
  })
}

// @Tags ServerNode
// @Summary 删除ServerNode
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.ServerNode true "删除ServerNode"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /serverNode/deleteServerNode [delete]
export const deleteServerNode = (data) => {
  return service({
    url: '/serverNode/deleteServerNode',
    method: 'delete',
    data
  })
}

// @Tags ServerNode
// @Summary 删除ServerNode
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除ServerNode"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /serverNode/deleteServerNode [delete]
export const deleteServerNodeByIds = (data) => {
  return service({
    url: '/serverNode/deleteServerNodeByIds',
    method: 'delete',
    data
  })
}

// @Tags ServerNode
// @Summary 更新ServerNode
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.ServerNode true "更新ServerNode"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /serverNode/updateServerNode [put]
export const updateServerNode = (data) => {
  return service({
    url: '/serverNode/updateServerNode',
    method: 'put',
    data
  })
}

// @Tags ServerNode
// @Summary 用id查询ServerNode
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query model.ServerNode true "用id查询ServerNode"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /serverNode/findServerNode [get]
export const findServerNode = (params) => {
  return service({
    url: '/serverNode/findServerNode',
    method: 'get',
    params
  })
}

// @Tags ServerNode
// @Summary 分页获取ServerNode列表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query request.PageInfo true "分页获取ServerNode列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /serverNode/getServerNodeList [get]
export const getServerNodeList = (params) => {
  return service({
    url: '/serverNode/getServerNodeList',
    method: 'get',
    params
  })
}
