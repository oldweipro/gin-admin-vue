import service from '@/utils/request'

// @Tags Prompt
// @Summary 创建Prompt
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.Prompt true "创建Prompt"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /prompt/createPrompt [post]
export const createPrompt = (data) => {
  return service({
    url: '/prompt/createPrompt',
    method: 'post',
    data
  })
}

// @Tags Prompt
// @Summary 删除Prompt
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.Prompt true "删除Prompt"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /prompt/deletePrompt [delete]
export const deletePrompt = (data) => {
  return service({
    url: '/prompt/deletePrompt',
    method: 'delete',
    data
  })
}

// @Tags Prompt
// @Summary 删除Prompt
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除Prompt"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /prompt/deletePrompt [delete]
export const deletePromptByIds = (data) => {
  return service({
    url: '/prompt/deletePromptByIds',
    method: 'delete',
    data
  })
}

// @Tags Prompt
// @Summary 更新Prompt
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.Prompt true "更新Prompt"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /prompt/updatePrompt [put]
export const updatePrompt = (data) => {
  return service({
    url: '/prompt/updatePrompt',
    method: 'put',
    data
  })
}

// @Tags Prompt
// @Summary 用id查询Prompt
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query model.Prompt true "用id查询Prompt"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /prompt/findPrompt [get]
export const findPrompt = (params) => {
  return service({
    url: '/prompt/findPrompt',
    method: 'get',
    params
  })
}

// @Tags Prompt
// @Summary 分页获取Prompt列表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query request.PageInfo true "分页获取Prompt列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /prompt/getPromptList [get]
export const getPromptList = (params) => {
  return service({
    url: '/prompt/getPromptList',
    method: 'get',
    params
  })
}
