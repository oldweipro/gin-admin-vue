<template>
  <div>
    <div class="gva-search-box">
      <el-form :inline="true" :model="searchInfo" class="demo-form-inline">
      <el-form-item label="创建时间">
      <el-date-picker v-model="searchInfo.startCreatedAt" type="datetime" placeholder="开始时间"></el-date-picker>
       —
      <el-date-picker v-model="searchInfo.endCreatedAt" type="datetime" placeholder="结束时间"></el-date-picker>
      </el-form-item>
        <el-form-item label="地址">
         <el-input v-model="searchInfo.address" placeholder="搜索条件" />

        </el-form-item>
        <el-form-item label="性别">
            
             <el-input v-model.number="searchInfo.sex" placeholder="搜索条件" />

        </el-form-item>
        <el-form-item label="人员真实姓名">
         <el-input v-model="searchInfo.personName" placeholder="搜索条件" />

        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" icon="search" @click="onSubmit">查询</el-button>
          <el-button size="small" icon="refresh" @click="onReset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="gva-table-box">
        <div class="gva-btn-list">
            <el-button size="small" type="primary" icon="plus" @click="syncPersonnelInfo">同步人员</el-button>
            <el-button size="small" type="primary" icon="plus" @click="syncPersonnelImgInfo">同步图片</el-button>
            <el-button size="small" type="primary" icon="plus" @click="openDialog">新增</el-button>
            <el-popover v-model:visible="deleteVisible" placement="top" width="160">
            <p>确定要删除吗？</p>
            <div style="text-align: right; margin-top: 8px;">
                <el-button size="small" type="primary" link @click="deleteVisible = false">取消</el-button>
                <el-button size="small" type="primary" @click="onDelete">确定</el-button>
            </div>
            <template #reference>
                <el-button icon="delete" size="small" style="margin-left: 10px;" :disabled="!multipleSelection.length" @click="deleteVisible = true">删除</el-button>
            </template>
            </el-popover>
        </div>
        <el-table
        ref="multipleTable"
        style="width: 100%"
        tooltip-effect="dark"
        :data="tableData"
        row-key="ID"
        @selection-change="handleSelectionChange"
        >
        <el-table-column type="selection" width="55" />
        <el-table-column align="left" label="日期" width="180">
            <template #default="scope">{{ formatDate(scope.row.CreatedAt) }}</template>
        </el-table-column>
        <el-table-column align="left" label="人员URL" prop="personUrl" width="120" />
        <el-table-column align="left" label="特长" prop="specialty" width="120" />
        <el-table-column align="left" label="单位编号" prop="unitNo" width="120" />
        <el-table-column align="left" label="民族" prop="nation" width="120" />
        <el-table-column align="left" label="单位名称" prop="companyName" width="120" />
        <el-table-column align="left" label="是否重点人员" prop="isSecurityFocus" width="120" />
        <el-table-column align="left" label="房间ID" prop="roomId" width="120" />
        <el-table-column align="left" label="楼层ID" prop="floorId" width="120" />
        <el-table-column align="left" label="建筑物编号" prop="buildingNo" width="120" />
        <el-table-column align="left" label="联系方式" prop="contact" width="120" />
        <el-table-column align="left" label="自定义地址" prop="userDefinedAddress" width="120" />
        <el-table-column align="left" label="房屋编号" prop="houseNo" width="120" />
        <el-table-column align="left" label="重点人员详情" prop="securityFocusDetail" width="120" />
        <el-table-column align="left" label="与户主关系" prop="relationshipWithHouseHolder" width="120" />
        <el-table-column align="left" label="特殊人员标记" prop="specialPersonMark" width="120" />
        <el-table-column align="left" label="体格特征" prop="bodyFeature" width="120" />
        <el-table-column align="left" label="身高" prop="height" width="120" />
        <el-table-column align="left" label="血型名称" prop="bloodTypeName" width="120" />
        <el-table-column align="left" label="人员图片URL" prop="pictureUrl" width="120" />
        <el-table-column align="left" label="生日" prop="birth" width="120" />
        <el-table-column align="left" label="是否常住人口" prop="isUsualResidence" width="120" />
        <el-table-column align="left" label="建筑物名称" prop="buildingName" width="120" />
        <el-table-column align="left" label="国籍" prop="nationality" width="120" />
        <el-table-column align="left" label="身份证号" prop="cardId" width="120" />
        <el-table-column align="left" label="认证过期时间" prop="authExpireTime" width="120" />
        <el-table-column align="left" label="楼层编号" prop="floorNo" width="120" />
        <el-table-column align="left" label="数据来源" prop="dataSource" width="120" />
        <el-table-column align="left" label="婚姻状况" prop="maritalStatus" width="120" />
        <el-table-column align="left" label="状态" prop="status" width="120" />
        <el-table-column align="left" label="失败原因" prop="failedReason" width="120" />
        <el-table-column align="left" label="详细单位名称" prop="detailedCompanyName" width="120" />
        <el-table-column align="left" label="其他联系方式" prop="otherContact" width="120" />
        <el-table-column align="left" label="是否户主" prop="isHouseHolder" width="120" />
        <el-table-column align="left" label="刑事记录详情" prop="criminalRecordDetail" width="120" />
        <el-table-column align="left" label="户籍地详细地址" prop="censusAddrDetailname" width="120" />
        <el-table-column align="left" label="血型" prop="bloodType" width="120" />
        <el-table-column align="left" label="区域ID" prop="precinctId" width="120" />
        <el-table-column align="left" label="录入人联系方式" prop="inputerContact" width="120" />
        <el-table-column align="left" label="别名" prop="aliasNames" width="120" />
        <el-table-column align="left" label="单位ID" prop="unitId" width="120" />
        <el-table-column align="left" label="人员类型" prop="personType" width="120" />
        <el-table-column align="left" label="地址" prop="address" width="120" />
        <el-table-column align="left" label="性别" prop="sex" width="120" />
        <el-table-column align="left" label="证件类型" prop="cardType" width="120" />
        <el-table-column align="left" label="更新时间" prop="updateTime" width="120" />
        <el-table-column align="left" label="建筑物ID" prop="buildingId" width="120" />
        <el-table-column align="left" label="人员真实姓名" prop="personName" width="120" />
        <el-table-column align="left" label="居住关系" prop="liveRelationShip" width="120" />
        <el-table-column align="left" label="是否有刑事记录" prop="isCriminalRecord" width="120" />
        <el-table-column align="left" label="创建时间" prop="createTime" width="120" />
        <el-table-column align="left" label="文化程度" prop="culture" width="120" />
        <el-table-column align="left" label="不在注册地原因" prop="notInRegisteredPlaceReason" width="120" />
        <el-table-column align="left" label="租赁时间" prop="rentTime" width="120" />
        <el-table-column align="left" label="老家名称来自哪里" prop="originName" width="120" />
        <el-table-column align="left" label="按钮组">
            <template #default="scope">
            <el-button type="primary" link icon="edit" size="small" class="table-button" @click="updatePersonnelFunc(scope.row)">变更</el-button>
            <el-button type="primary" link icon="delete" size="small" @click="deleteRow(scope.row)">删除</el-button>
            </template>
        </el-table-column>
        </el-table>
        <div class="gva-pagination">
            <el-pagination
            layout="total, sizes, prev, pager, next, jumper"
            :current-page="page"
            :page-size="pageSize"
            :page-sizes="[10, 30, 50, 100]"
            :total="total"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
            />
        </div>
    </div>
    <el-dialog v-model="dialogFormVisible" :before-close="closeDialog" title="弹窗操作">
      <el-form :model="formData" label-position="right" ref="elFormRef" :rules="rule" label-width="80px">
        <el-form-item label="人员URL:"  prop="personUrl" >
          <el-input v-model="formData.personUrl" :clearable="true"  placeholder="请输入" />
        </el-form-item>
        <el-form-item label="特长:"  prop="specialty" >
          <el-input v-model="formData.specialty" :clearable="true"  placeholder="请输入" />
        </el-form-item>
        <el-form-item label="单位编号:"  prop="unitNo" >
          <el-input v-model="formData.unitNo" :clearable="true"  placeholder="请输入" />
        </el-form-item>
        <el-form-item label="民族:"  prop="nation" >
          <el-input v-model="formData.nation" :clearable="true"  placeholder="请输入" />
        </el-form-item>
        <el-form-item label="单位名称:"  prop="companyName" >
          <el-input v-model="formData.companyName" :clearable="true"  placeholder="请输入" />
        </el-form-item>
        <el-form-item label="是否重点人员:"  prop="isSecurityFocus" >
          <el-input v-model.number="formData.isSecurityFocus" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="房间ID:"  prop="roomId" >
          <el-input v-model="formData.roomId" :clearable="true"  placeholder="请输入" />
        </el-form-item>
        <el-form-item label="楼层ID:"  prop="floorId" >
          <el-input v-model="formData.floorId" :clearable="true"  placeholder="请输入" />
        </el-form-item>
        <el-form-item label="建筑物编号:"  prop="buildingNo" >
          <el-input v-model="formData.buildingNo" :clearable="true"  placeholder="请输入" />
        </el-form-item>
        <el-form-item label="联系方式:"  prop="contact" >
          <el-input v-model="formData.contact" :clearable="true"  placeholder="请输入" />
        </el-form-item>
        <el-form-item label="自定义地址:"  prop="userDefinedAddress" >
          <el-input v-model="formData.userDefinedAddress" :clearable="true"  placeholder="请输入" />
        </el-form-item>
        <el-form-item label="房屋编号:"  prop="houseNo" >
          <el-input v-model="formData.houseNo" :clearable="true"  placeholder="请输入" />
        </el-form-item>
        <el-form-item label="重点人员详情:"  prop="securityFocusDetail" >
          <el-input v-model="formData.securityFocusDetail" :clearable="true"  placeholder="请输入" />
        </el-form-item>
        <el-form-item label="与户主关系:"  prop="relationshipWithHouseHolder" >
          <el-input v-model="formData.relationshipWithHouseHolder" :clearable="true"  placeholder="请输入" />
        </el-form-item>
        <el-form-item label="特殊人员标记:"  prop="specialPersonMark" >
          <el-input v-model="formData.specialPersonMark" :clearable="true"  placeholder="请输入" />
        </el-form-item>
        <el-form-item label="体格特征:"  prop="bodyFeature" >
          <el-input v-model="formData.bodyFeature" :clearable="true"  placeholder="请输入" />
        </el-form-item>
        <el-form-item label="身高:"  prop="height" >
          <el-input v-model.number="formData.height" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="血型名称:"  prop="bloodTypeName" >
          <el-input v-model="formData.bloodTypeName" :clearable="true"  placeholder="请输入" />
        </el-form-item>
        <el-form-item label="人员图片URL:"  prop="pictureUrl" >
          <el-input v-model="formData.pictureUrl" :clearable="true"  placeholder="请输入" />
        </el-form-item>
        <el-form-item label="生日:"  prop="birth" >
          <el-input v-model="formData.birth" :clearable="true"  placeholder="请输入" />
        </el-form-item>
        <el-form-item label="是否常住人口:"  prop="isUsualResidence" >
          <el-input v-model.number="formData.isUsualResidence" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="建筑物名称:"  prop="buildingName" >
          <el-input v-model="formData.buildingName" :clearable="true"  placeholder="请输入" />
        </el-form-item>
        <el-form-item label="国籍:"  prop="nationality" >
          <el-input v-model="formData.nationality" :clearable="true"  placeholder="请输入" />
        </el-form-item>
        <el-form-item label="身份证号:"  prop="cardId" >
          <el-input v-model="formData.cardId" :clearable="true"  placeholder="请输入" />
        </el-form-item>
        <el-form-item label="认证过期时间:"  prop="authExpireTime" >
          <el-input v-model="formData.authExpireTime" :clearable="true"  placeholder="请输入" />
        </el-form-item>
        <el-form-item label="楼层编号:"  prop="floorNo" >
          <el-input v-model="formData.floorNo" :clearable="true"  placeholder="请输入" />
        </el-form-item>
        <el-form-item label="数据来源:"  prop="dataSource" >
          <el-input v-model.number="formData.dataSource" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="婚姻状况:"  prop="maritalStatus" >
          <el-input v-model="formData.maritalStatus" :clearable="true"  placeholder="请输入" />
        </el-form-item>
        <el-form-item label="状态:"  prop="status" >
          <el-input v-model="formData.status" :clearable="true"  placeholder="请输入" />
        </el-form-item>
        <el-form-item label="失败原因:"  prop="failedReason" >
          <el-input v-model="formData.failedReason" :clearable="true"  placeholder="请输入" />
        </el-form-item>
        <el-form-item label="详细单位名称:"  prop="detailedCompanyName" >
          <el-input v-model="formData.detailedCompanyName" :clearable="true"  placeholder="请输入" />
        </el-form-item>
        <el-form-item label="其他联系方式:"  prop="otherContact" >
          <el-input v-model="formData.otherContact" :clearable="true"  placeholder="请输入" />
        </el-form-item>
        <el-form-item label="是否户主:"  prop="isHouseHolder" >
          <el-input v-model.number="formData.isHouseHolder" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="刑事记录详情:"  prop="criminalRecordDetail" >
          <el-input v-model="formData.criminalRecordDetail" :clearable="true"  placeholder="请输入" />
        </el-form-item>
        <el-form-item label="户籍地详细地址:"  prop="censusAddrDetailname" >
          <el-input v-model="formData.censusAddrDetailname" :clearable="true"  placeholder="请输入" />
        </el-form-item>
        <el-form-item label="血型:"  prop="bloodType" >
          <el-input v-model.number="formData.bloodType" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="区域ID:"  prop="precinctId" >
          <el-input v-model="formData.precinctId" :clearable="true"  placeholder="请输入" />
        </el-form-item>
        <el-form-item label="录入人联系方式:"  prop="inputerContact" >
          <el-input v-model="formData.inputerContact" :clearable="true"  placeholder="请输入" />
        </el-form-item>
        <el-form-item label="别名:"  prop="aliasNames" >
          <el-input v-model="formData.aliasNames" :clearable="true"  placeholder="请输入" />
        </el-form-item>
        <el-form-item label="单位ID:"  prop="unitId" >
          <el-input v-model="formData.unitId" :clearable="true"  placeholder="请输入" />
        </el-form-item>
        <el-form-item label="人员类型:"  prop="personType" >
          <el-input v-model="formData.personType" :clearable="true"  placeholder="请输入" />
        </el-form-item>
        <el-form-item label="地址:"  prop="address" >
          <el-input v-model="formData.address" :clearable="true"  placeholder="请输入" />
        </el-form-item>
        <el-form-item label="性别:"  prop="sex" >
          <el-input v-model.number="formData.sex" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="证件类型:"  prop="cardType" >
          <el-input v-model.number="formData.cardType" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="更新时间:"  prop="updateTime" >
          <el-input v-model="formData.updateTime" :clearable="true"  placeholder="请输入" />
        </el-form-item>
        <el-form-item label="建筑物ID:"  prop="buildingId" >
          <el-input v-model="formData.buildingId" :clearable="true"  placeholder="请输入" />
        </el-form-item>
        <el-form-item label="人员真实姓名:"  prop="personName" >
          <el-input v-model="formData.personName" :clearable="true"  placeholder="请输入" />
        </el-form-item>
        <el-form-item label="居住关系:"  prop="liveRelationShip" >
          <el-input v-model="formData.liveRelationShip" :clearable="true"  placeholder="请输入" />
        </el-form-item>
        <el-form-item label="是否有刑事记录:"  prop="isCriminalRecord" >
          <el-input v-model.number="formData.isCriminalRecord" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="创建时间:"  prop="createTime" >
          <el-input v-model="formData.createTime" :clearable="true"  placeholder="请输入" />
        </el-form-item>
        <el-form-item label="文化程度:"  prop="culture" >
          <el-input v-model="formData.culture" :clearable="true"  placeholder="请输入" />
        </el-form-item>
        <el-form-item label="不在注册地原因:"  prop="notInRegisteredPlaceReason" >
          <el-input v-model="formData.notInRegisteredPlaceReason" :clearable="true"  placeholder="请输入" />
        </el-form-item>
        <el-form-item label="租赁时间:"  prop="rentTime" >
          <el-input v-model="formData.rentTime" :clearable="true"  placeholder="请输入" />
        </el-form-item>
        <el-form-item label="老家名称来自哪里:"  prop="originName" >
          <el-input v-model="formData.originName" :clearable="true"  placeholder="请输入" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button size="small" @click="closeDialog">取 消</el-button>
          <el-button size="small" type="primary" @click="enterDialog">确 定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Personnel'
}
</script>

<script setup>
import {
  syncPersonnel,
  syncPersonnelImg,
  createPersonnel,
  deletePersonnel,
  deletePersonnelByIds,
  updatePersonnel,
  findPersonnel,
  getPersonnelList
} from '@/api/personnel'

// 全量引入格式化工具 请按需保留
import { getDictFunc, formatDate, formatBoolean, filterDict } from '@/utils/format'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref, reactive } from 'vue'

// 自动化生成的字典（可能为空）以及字段
const formData = ref({
        personUrl: '',
        specialty: '',
        unitNo: '',
        nation: '',
        companyName: '',
        isSecurityFocus: 0,
        roomId: '',
        floorId: '',
        buildingNo: '',
        contact: '',
        userDefinedAddress: '',
        houseNo: '',
        securityFocusDetail: '',
        relationshipWithHouseHolder: '',
        specialPersonMark: '',
        bodyFeature: '',
        height: 0,
        bloodTypeName: '',
        pictureUrl: '',
        birth: '',
        isUsualResidence: 0,
        buildingName: '',
        nationality: '',
        cardId: '',
        authExpireTime: '',
        floorNo: '',
        dataSource: 0,
        maritalStatus: '',
        status: '',
        failedReason: '',
        detailedCompanyName: '',
        otherContact: '',
        isHouseHolder: 0,
        criminalRecordDetail: '',
        censusAddrDetailname: '',
        bloodType: 0,
        precinctId: '',
        inputerContact: '',
        aliasNames: '',
        unitId: '',
        personType: '',
        address: '',
        sex: 0,
        cardType: 0,
        updateTime: '',
        buildingId: '',
        personName: '',
        liveRelationShip: '',
        isCriminalRecord: 0,
        createTime: '',
        culture: '',
        notInRegisteredPlaceReason: '',
        rentTime: '',
        originName: '',
        })

// 验证规则
const rule = reactive({
})

const elFormRef = ref()


// =========== 表格控制部分 ===========
const page = ref(1)
const total = ref(0)
const pageSize = ref(10)
const tableData = ref([])
const searchInfo = ref({})

// 重置
const onReset = () => {
  searchInfo.value = {}
  getTableData()
}

// 搜索
const onSubmit = () => {
  page.value = 1
  pageSize.value = 10
  getTableData()
}

// 分页
const handleSizeChange = (val) => {
  pageSize.value = val
  getTableData()
}

// 修改页面容量
const handleCurrentChange = (val) => {
  page.value = val
  getTableData()
}

// 查询
const getTableData = async() => {
  const table = await getPersonnelList({ page: page.value, pageSize: pageSize.value, ...searchInfo.value })
  if (table.code === 0) {
    tableData.value = table.data.list
    total.value = table.data.total
    page.value = table.data.page
    pageSize.value = table.data.pageSize
  }
}

getTableData()

// ============== 表格控制部分结束 ===============

// 获取需要的字典 可能为空 按需保留
const setOptions = async () =>{
}

// 获取需要的字典 可能为空 按需保留
setOptions()


// 多选数据
const multipleSelection = ref([])
// 多选
const handleSelectionChange = (val) => {
    multipleSelection.value = val
}

// 删除行
const deleteRow = (row) => {
    ElMessageBox.confirm('确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(() => {
            deletePersonnelFunc(row)
        })
    }


// 批量删除控制标记
const deleteVisible = ref(false)

// 多选删除
const onDelete = async() => {
      const ids = []
      if (multipleSelection.value.length === 0) {
        ElMessage({
          type: 'warning',
          message: '请选择要删除的数据'
        })
        return
      }
      multipleSelection.value &&
        multipleSelection.value.map(item => {
          ids.push(item.ID)
        })
      const res = await deletePersonnelByIds({ ids })
      if (res.code === 0) {
        ElMessage({
          type: 'success',
          message: '删除成功'
        })
        if (tableData.value.length === ids.length && page.value > 1) {
          page.value--
        }
        deleteVisible.value = false
        getTableData()
      }
    }

// 行为控制标记（弹窗内部需要增还是改）
const type = ref('')

// 更新行
const updatePersonnelFunc = async(row) => {
    const res = await findPersonnel({ ID: row.ID })
    type.value = 'update'
    if (res.code === 0) {
        formData.value = res.data.repersonnel
        dialogFormVisible.value = true
    }
}


// 删除行
const deletePersonnelFunc = async (row) => {
    const res = await deletePersonnel({ ID: row.ID })
    if (res.code === 0) {
        ElMessage({
                type: 'success',
                message: '删除成功'
            })
            if (tableData.value.length === 1 && page.value > 1) {
            page.value--
        }
        getTableData()
    }
}

// 弹窗控制标记
const dialogFormVisible = ref(false)

// 打开弹窗
const openDialog = () => {
    type.value = 'create'
    dialogFormVisible.value = true
}
// 同步人员信息
const syncPersonnelInfo = async () => {
  let res = await syncPersonnel()
  console.log(res)
}
// 同步图片信息
const syncPersonnelImgInfo = async () => {
  let res = await syncPersonnelImg()
  console.log(res)
}

// 关闭弹窗
const closeDialog = () => {
    dialogFormVisible.value = false
    formData.value = {
        personUrl: '',
        specialty: '',
        unitNo: '',
        nation: '',
        companyName: '',
        isSecurityFocus: 0,
        roomId: '',
        floorId: '',
        buildingNo: '',
        contact: '',
        userDefinedAddress: '',
        houseNo: '',
        securityFocusDetail: '',
        relationshipWithHouseHolder: '',
        specialPersonMark: '',
        bodyFeature: '',
        height: 0,
        bloodTypeName: '',
        pictureUrl: '',
        birth: '',
        isUsualResidence: 0,
        buildingName: '',
        nationality: '',
        cardId: '',
        authExpireTime: '',
        floorNo: '',
        dataSource: 0,
        maritalStatus: '',
        status: '',
        failedReason: '',
        detailedCompanyName: '',
        otherContact: '',
        isHouseHolder: 0,
        criminalRecordDetail: '',
        censusAddrDetailname: '',
        bloodType: 0,
        precinctId: '',
        inputerContact: '',
        aliasNames: '',
        unitId: '',
        personType: '',
        address: '',
        sex: 0,
        cardType: 0,
        updateTime: '',
        buildingId: '',
        personName: '',
        liveRelationShip: '',
        isCriminalRecord: 0,
        createTime: '',
        culture: '',
        notInRegisteredPlaceReason: '',
        rentTime: '',
        originName: '',
        }
}
// 弹窗确定
const enterDialog = async () => {
     elFormRef.value?.validate( async (valid) => {
             if (!valid) return
              let res
              switch (type.value) {
                case 'create':
                  res = await createPersonnel(formData.value)
                  break
                case 'update':
                  res = await updatePersonnel(formData.value)
                  break
                default:
                  res = await createPersonnel(formData.value)
                  break
              }
              if (res.code === 0) {
                ElMessage({
                  type: 'success',
                  message: '创建/更改成功'
                })
                closeDialog()
                getTableData()
              }
      })
}
</script>

<style>
</style>
