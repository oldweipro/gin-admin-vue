import service from '@/utils/request'

// @Tags Conversation
// @Summary 创建Conversation
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.Conversation true "创建Conversation"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /conversation/createConversation [post]
export const createConversation = (data) => {
  return service({
    url: '/conversation/createConversation',
    method: 'post',
    data
  })
}

// @Tags Conversation
// @Summary 删除Conversation
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.Conversation true "删除Conversation"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /conversation/deleteConversation [delete]
export const deleteConversation = (data) => {
  return service({
    url: '/conversation/deleteConversation',
    method: 'delete',
    data
  })
}

// @Tags Conversation
// @Summary 删除Conversation
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除Conversation"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /conversation/deleteConversation [delete]
export const deleteConversationByIds = (data) => {
  return service({
    url: '/conversation/deleteConversationByIds',
    method: 'delete',
    data
  })
}

// @Tags Conversation
// @Summary 更新Conversation
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.Conversation true "更新Conversation"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /conversation/updateConversation [put]
export const updateConversation = (data) => {
  return service({
    url: '/conversation/updateConversation',
    method: 'put',
    data
  })
}

// @Tags Conversation
// @Summary 用id查询Conversation
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query model.Conversation true "用id查询Conversation"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /conversation/findConversation [get]
export const findConversation = (params) => {
  return service({
    url: '/conversation/findConversation',
    method: 'get',
    params
  })
}

// @Tags Conversation
// @Summary 分页获取Conversation列表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query request.PageInfo true "分页获取Conversation列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /conversation/getConversationList [get]
export const getConversationList = (params) => {
  return service({
    url: '/conversation/getConversationList',
    method: 'get',
    params
  })
}
