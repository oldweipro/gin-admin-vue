import service from '@/utils/request'

// @Tags ChatTicket
// @Summary 创建ChatTicket
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.ChatTicket true "创建ChatTicket"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /chatTicket/createChatTicket [post]
export const createChatTicket = (data) => {
  return service({
    url: '/chatTicket/createChatTicket',
    method: 'post',
    data
  })
}

// @Tags ChatTicket
// @Summary 删除ChatTicket
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.ChatTicket true "删除ChatTicket"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /chatTicket/deleteChatTicket [delete]
export const deleteChatTicket = (data) => {
  return service({
    url: '/chatTicket/deleteChatTicket',
    method: 'delete',
    data
  })
}

// @Tags ChatTicket
// @Summary 删除ChatTicket
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除ChatTicket"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /chatTicket/deleteChatTicket [delete]
export const deleteChatTicketByIds = (data) => {
  return service({
    url: '/chatTicket/deleteChatTicketByIds',
    method: 'delete',
    data
  })
}

// @Tags ChatTicket
// @Summary 更新ChatTicket
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.ChatTicket true "更新ChatTicket"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /chatTicket/updateChatTicket [put]
export const updateChatTicket = (data) => {
  return service({
    url: '/chatTicket/updateChatTicket',
    method: 'put',
    data
  })
}

// @Tags ChatTicket
// @Summary 用id查询ChatTicket
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query model.ChatTicket true "用id查询ChatTicket"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /chatTicket/findChatTicket [get]
export const findChatTicket = (params) => {
  return service({
    url: '/chatTicket/findChatTicket',
    method: 'get',
    params
  })
}

// @Tags ChatTicket
// @Summary 分页获取ChatTicket列表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query request.PageInfo true "分页获取ChatTicket列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /chatTicket/getChatTicketList [get]
export const getChatTicketList = (params) => {
  return service({
    url: '/chatTicket/getChatTicketList',
    method: 'get',
    params
  })
}
