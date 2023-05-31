import service from '@/utils/request'

// @Tags Feedback
// @Summary 创建Feedback
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.Feedback true "创建Feedback"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /feedback/createFeedback [post]
export const createFeedback = (data) => {
  return service({
    url: '/feedback/createFeedback',
    method: 'post',
    data
  })
}

// @Tags Feedback
// @Summary 删除Feedback
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.Feedback true "删除Feedback"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /feedback/deleteFeedback [delete]
export const deleteFeedback = (data) => {
  return service({
    url: '/feedback/deleteFeedback',
    method: 'delete',
    data
  })
}

// @Tags Feedback
// @Summary 删除Feedback
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除Feedback"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /feedback/deleteFeedback [delete]
export const deleteFeedbackByIds = (data) => {
  return service({
    url: '/feedback/deleteFeedbackByIds',
    method: 'delete',
    data
  })
}

// @Tags Feedback
// @Summary 更新Feedback
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.Feedback true "更新Feedback"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /feedback/updateFeedback [put]
export const updateFeedback = (data) => {
  return service({
    url: '/feedback/updateFeedback',
    method: 'put',
    data
  })
}

// @Tags Feedback
// @Summary 用id查询Feedback
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query model.Feedback true "用id查询Feedback"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /feedback/findFeedback [get]
export const findFeedback = (params) => {
  return service({
    url: '/feedback/findFeedback',
    method: 'get',
    params
  })
}

// @Tags Feedback
// @Summary 分页获取Feedback列表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query request.PageInfo true "分页获取Feedback列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /feedback/getFeedbackList [get]
export const getFeedbackList = (params) => {
  return service({
    url: '/feedback/getFeedbackList',
    method: 'get',
    params
  })
}
