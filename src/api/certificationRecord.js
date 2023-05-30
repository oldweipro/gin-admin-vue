import service from '@/utils/request'

// @Tags CertificationRecord
// @Summary 创建CertificationRecord
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.CertificationRecord true "创建CertificationRecord"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /certificationRecord/createCertificationRecord [post]
export const createCertificationRecord = (data) => {
  return service({
    url: '/certificationRecord/createCertificationRecord',
    method: 'post',
    data
  })
}

// @Tags CertificationRecord
// @Summary 删除CertificationRecord
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.CertificationRecord true "删除CertificationRecord"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /certificationRecord/deleteCertificationRecord [delete]
export const deleteCertificationRecord = (data) => {
  return service({
    url: '/certificationRecord/deleteCertificationRecord',
    method: 'delete',
    data
  })
}

// @Tags CertificationRecord
// @Summary 删除CertificationRecord
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除CertificationRecord"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /certificationRecord/deleteCertificationRecord [delete]
export const deleteCertificationRecordByIds = (data) => {
  return service({
    url: '/certificationRecord/deleteCertificationRecordByIds',
    method: 'delete',
    data
  })
}

// @Tags CertificationRecord
// @Summary 更新CertificationRecord
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.CertificationRecord true "更新CertificationRecord"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /certificationRecord/updateCertificationRecord [put]
export const updateCertificationRecord = (data) => {
  return service({
    url: '/certificationRecord/updateCertificationRecord',
    method: 'put',
    data
  })
}

// @Tags CertificationRecord
// @Summary 用id查询CertificationRecord
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query model.CertificationRecord true "用id查询CertificationRecord"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /certificationRecord/findCertificationRecord [get]
export const findCertificationRecord = (params) => {
  return service({
    url: '/certificationRecord/findCertificationRecord',
    method: 'get',
    params
  })
}

// @Tags CertificationRecord
// @Summary 分页获取CertificationRecord列表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query request.PageInfo true "分页获取CertificationRecord列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /certificationRecord/getCertificationRecordList [get]
export const getCertificationRecordList = (params) => {
  return service({
    url: '/certificationRecord/getCertificationRecordList',
    method: 'get',
    params
  })
}
