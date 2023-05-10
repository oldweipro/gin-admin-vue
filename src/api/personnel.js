import service from '@/utils/request'

// syncPersonnel 同步人员信息
export const syncPersonnel = (data) => {
  return service({
    url: '/personnel/syncPersonnel',
    method: 'post',
    data
  })
}
// syncPersonnelImg 同步图片信息
export const syncPersonnelImg = (data) => {
  return service({
    url: '/personnel/syncPersonnelImg',
    method: 'post',
    data
  })
}
// @Tags Personnel
// @Summary 创建Personnel
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.Personnel true "创建Personnel"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /personnel/createPersonnel [post]
export const createPersonnel = (data) => {
  return service({
    url: '/personnel/createPersonnel',
    method: 'post',
    data
  })
}

// @Tags Personnel
// @Summary 删除Personnel
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.Personnel true "删除Personnel"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /personnel/deletePersonnel [delete]
export const deletePersonnel = (data) => {
  return service({
    url: '/personnel/deletePersonnel',
    method: 'delete',
    data
  })
}

// @Tags Personnel
// @Summary 删除Personnel
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除Personnel"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /personnel/deletePersonnel [delete]
export const deletePersonnelByIds = (data) => {
  return service({
    url: '/personnel/deletePersonnelByIds',
    method: 'delete',
    data
  })
}

// @Tags Personnel
// @Summary 更新Personnel
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.Personnel true "更新Personnel"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /personnel/updatePersonnel [put]
export const updatePersonnel = (data) => {
  return service({
    url: '/personnel/updatePersonnel',
    method: 'put',
    data
  })
}

// @Tags Personnel
// @Summary 用id查询Personnel
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query model.Personnel true "用id查询Personnel"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /personnel/findPersonnel [get]
export const findPersonnel = (params) => {
  return service({
    url: '/personnel/findPersonnel',
    method: 'get',
    params
  })
}

// @Tags Personnel
// @Summary 分页获取Personnel列表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query request.PageInfo true "分页获取Personnel列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /personnel/getPersonnelList [get]
export const getPersonnelList = (params) => {
  return service({
    url: '/personnel/getPersonnelList',
    method: 'get',
    params
  })
}
