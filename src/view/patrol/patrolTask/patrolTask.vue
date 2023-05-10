<template>
  <div>
    <div class="gva-search-box">
      <el-form :inline="true" :model="searchInfo" class="demo-form-inline">
      <el-form-item label="创建时间">
      <el-date-picker v-model="searchInfo.startCreatedAt" type="datetime" placeholder="开始时间"></el-date-picker>
       —
      <el-date-picker v-model="searchInfo.endCreatedAt" type="datetime" placeholder="结束时间"></el-date-picker>
      </el-form-item>
        <el-form-item label="任务名称">
         <el-input v-model="searchInfo.taskName" placeholder="搜索条件" />

        </el-form-item>
        <el-form-item label="任务内容项列表">
         <el-input v-model="searchInfo.taskItemIdList" placeholder="搜索条件" />

        </el-form-item>
        <el-form-item label="巡检次数">
          <el-input v-model.number="searchInfo.patrolTimes" placeholder="搜索条件" />
        </el-form-item>
        <el-form-item label="多次巡更间隔时长，单位分钟">
          <el-input v-model.number="searchInfo.intervalDuration" placeholder="搜索条件" />
        </el-form-item>
           <el-form-item label="巡检打卡方式" prop="clockMode">
            <el-select v-model="searchInfo.clockMode" clearable placeholder="请选择" @clear="()=>{searchInfo.clockMode=undefined}">
              <el-option v-for="(item,key) in patrolClockModeOptions" :key="key" :label="item.label" :value="item.value" />
            </el-select>
            </el-form-item>
        <el-form-item label="巡检地点ID集合">
         <el-input v-model="searchInfo.siteIdList" placeholder="搜索条件" />

        </el-form-item>
        <el-form-item label="任务时间周期">
         <el-input v-model="searchInfo.taskCycleTime" placeholder="搜索条件" />

        </el-form-item>
        <el-form-item label="当天巡检有效时间">
         <el-input v-model="searchInfo.validTime" placeholder="搜索条件" />

        </el-form-item>
        <el-form-item label="所属项目">
          <el-input v-model.number="searchInfo.deptId" placeholder="搜索条件" />
        </el-form-item>
        <el-form-item label="分配任务">
         <el-input v-model="searchInfo.assignTasks" placeholder="搜索条件" />

        </el-form-item>
        <el-form-item label="抄送至监管员">
         <el-input v-model="searchInfo.copySupervisor" placeholder="搜索条件" />

        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" icon="search" @click="onSubmit">查询</el-button>
          <el-button size="small" icon="refresh" @click="onReset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="gva-table-box">
      <div class="gva-btn-list">
        <el-button size="small" type="primary" icon="plus" @click="openDialog">新增</el-button>
        <el-popover v-model:visible="deleteVisible" placement="top" width="160"><p>确定要删除吗？</p>
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
        <el-table-column align="left" label="任务名称" prop="taskName" width="120" />
        <el-table-column align="left" label="任务内容" prop="taskItemIdList" width="120">
          <template #default="scope">
            {{ filterPatrolItem(scope.row.taskItemIdList, taskItemIdListOptions) }}
          </template>
        </el-table-column>
        <el-table-column align="left" label="巡检次数" prop="patrolTimes" width="120" />
        <el-table-column align="left" label="更间隔时长" prop="intervalDuration" width="120" />
        <el-table-column align="left" label="打卡方式" prop="clockMode" width="120">
            <template #default="scope">
            {{ filterDict(scope.row.clockMode,patrolClockModeOptions) }}
            </template>
        </el-table-column>
        <el-table-column align="left" label="巡检地点" prop="siteIdList" width="120" />
        <el-table-column align="left" label="时间周期" prop="taskCycleTime" width="120" />
        <el-table-column align="left" label="巡检有效时间" prop="validTime" width="120" />
        <el-table-column align="left" label="所属项目" prop="deptId" width="120" />
        <el-table-column align="left" label="分配任务" prop="assignTasks" width="120">
          <template #default="scope">
<!--            <el-avatar :src="filterAssignTasks(scope.row.assignTasks, assignTasksContent)" />-->
            {{ filterAssignTasks(scope.row.assignTasks, assignTasksContent) }}
          </template>
        </el-table-column>
        <el-table-column align="left" label="抄送至监管员" prop="copySupervisor" width="120" >
          <template #default="scope">
            {{ filterCopySupervisor(scope.row.copySupervisor,copySupervisorList) }}
          </template>
        </el-table-column>
        <el-table-column align="left" label="按钮组">
            <template #default="scope">
            <el-button type="primary" link icon="edit" size="small" class="table-button" @click="updatePatrolTaskFunc(scope.row)">变更</el-button>
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
    <el-dialog v-model="dialogFormVisible" :before-close="closeDialog" title="弹窗操作" >
      <el-form :model="formData" label-position="right" ref="elFormRef" :rules="rule" label-width="90px">
        <el-form-item label="任务名称:" prop="taskName">
          <el-input v-model="formData.taskName" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="任务内容:" prop="taskItemIdList">
          <div style="display: inline-block">
            <p style="margin-left: 10px"></p>
            <el-select v-model="formData.taskItemIdList" multiple filterable allow-create default-first-option @change="elSelectOnChange($event)" placeholder="请选择">
              <el-option v-for="item in taskItemIdListOptions" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </div>
        </el-form-item>
        <el-form-item label="巡检次数:" prop="patrolTimes">
          <el-input v-model.number="formData.patrolTimes" :clearable="true" placeholder="请输入" @input="patrolTimesInputEvent($event)" />
        </el-form-item>
        <el-form-item label="间隔时长:" prop="intervalDuration" v-show="intervalDurationVisible" >
          <el-input v-model.number="formData.intervalDuration" :clearable="true" placeholder="多次巡更间隔时长，单位分钟" />
        </el-form-item>
        <el-form-item label="打卡方式:" prop="clockMode">
          <el-select v-model="formData.clockMode" placeholder="巡检打卡方式" style="width:100%" :clearable="true">
            <el-option v-for="(item,key) in patrolClockModeOptions" :key="key" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="巡检路线:" prop="siteIdList">
          <div style="display: inline-block">
            <p style="margin-left: 10px"></p>
            <el-select v-model="formData.siteIdList" multiple filterable allow-create default-first-option placeholder="请选择"
            >
              <el-option v-for="item in patrolRouteListOptions" :key="item.value" :label="item.label" :value="item.value"
              />
            </el-select>
          </div>
        </el-form-item>
        <el-form-item label="时间周期:"  prop="taskCycleTime" >
          <div class="block">
            <span class="demonstration"></span>
            <el-date-picker
              v-model="formData.taskCycleTime"
              type="daterange"
              :disabled-date="disabledDate"
              range-separator="到"
              start-placeholder="开始日期"
              end-placeholder="结束日期" />
          </div>
        </el-form-item>
        <el-form-item label="有效时间:" prop="validTime">
          <el-time-picker v-model="formData.validTime" is-range range-separator="到" start-placeholder="开始时间" end-placeholder="结束时间" />
        </el-form-item>
        <el-form-item label="分配任务:"  prop="assignTasks" >
          <el-select v-model="formData.assignTasks" placeholder="请选择" :clearable="true" multiple>
            <el-option v-for="item in assignTasksContent" :key="item.value" :label="item.label" :value="item.value">
              <el-avatar :src="item.headerImg" style="float: left"/>
              <span style="float: right;color: var(--el-text-color-secondary);font-size: 13px;">{{ item.label }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="抄送监管员:"  prop="copySupervisor" >
          <el-select v-model="formData.copySupervisor" placeholder="请选择" :clearable="true" multiple>
            <el-option v-for="item in copySupervisorList" :key="item.value" :label="item.label" :value="item.value">
              <el-avatar :src="item.headerImg" style="float: left"/>
              <span style="float: right;color: var(--el-text-color-secondary);font-size: 13px;">{{ item.label }}</span>
            </el-option>
          </el-select>
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
  name: 'PatrolTask'
}
</script>

<script setup>
// 导入后端接口方法
import {
  createPatrolTask,
  deletePatrolTask,
  deletePatrolTaskByIds,
  updatePatrolTask,
  findPatrolTask,
  getPatrolTaskList
} from '@/api/patrolTask'

// 全量引入格式化工具 请按需保留
import { getDictFunc, formatDate, filterDict } from '@/utils/format'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref, reactive } from 'vue'
import { createPatrolItem, getPatrolItemList } from '@/api/patrolItem'
import { getUserList } from '@/api/user'
import { getPatrolSiteList } from '@/api/patrolSite'

// 自动化生成的字典（可能为空）以及字段
const patrolClockModeOptions = ref([])
const formData = ref({
  taskName: '',
  taskItemIdList: [],
  patrolTimes: 1,
  intervalDuration: 0,
  clockMode: '',
  siteIdList: '',
  taskCycleTime: '',
  validTime: '',
  deptId: 0,
  assignTasks: '',
  copySupervisor: '',
})

// 验证规则
const rule = reactive({
  taskName: [{
    required: true,
    message: '',
    trigger: ['input', 'blur'],
  }],
  taskItemIdList: [{
    required: true,
    message: '',
    trigger: ['input', 'blur'],
  }],
  patrolTimes: [{
    required: true,
    message: '',
    trigger: ['input', 'blur'],
  }],
  clockMode: [{
    required: true,
    message: '',
    trigger: ['input', 'blur'],
  }],
})

const elFormRef = ref()
const intervalDurationVisible = ref(false)
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
  const table = await getPatrolTaskList({ page: page.value, pageSize: pageSize.value, ...searchInfo.value })
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
const setOptions = async() => {
  patrolClockModeOptions.value = await getDictFunc('patrolClockMode')
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
    deletePatrolTaskFunc(row)
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
  multipleSelection.value && multipleSelection.value.map(item => {
    ids.push(item.ID)
  })
  const res = await deletePatrolTaskByIds({ ids })
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
const updatePatrolTaskFunc = async(row) => {
  const res = await findPatrolTask({ ID: row.ID })
  // 巡检有效时间在点击变更时，弹框内要显示已有内容
  const validTimes = res.data.repatrolTask.validTime.split(',')
  const now = new Date()
  const validTimeList = []
  for (const validTime of validTimes) {
    const fullDate = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate() + ' ' + validTime
    validTimeList.push(fullDate)
  }

  // 时间周期在点击变更时，弹框内要显示已有内容
  const taskCycleTimes = res.data.repatrolTask.taskCycleTime.split(',')
  const taskCycleTimesList = []
  for (const taskCycleTime of taskCycleTimes) {
    const fullDates = taskCycleTime
    taskCycleTimesList.push(fullDates)
  }

  // 巡检路线在点击变更时，弹框内要显示已有内容
  const patrolRoutes = res.data.repatrolTask.siteIdList.split(',')
  const patrolRouteList = []
  for (const siteIdList of patrolRoutes) {
    const fullRouteDate = siteIdList
    patrolRouteList.push(fullRouteDate)
  }
  // 巡检内容在点击变更时，弹框内要显示已有内容
  const taskItems = res.data.repatrolTask.taskItemIdList.split(',')
  const taskItemIdListData = []
  for (const taskItemId of taskItems) {
    taskItemIdListData.push(parseInt(taskItemId))
  }
  // 分配任务在点击变更时，弹框内要显示已有内容
  const assignTasksList = res.data.repatrolTask.assignTasks.split(',')
  const assignTasksListData = []
  for (const assignTasksId of assignTasksList) {
    assignTasksListData.push(parseInt(assignTasksId))
  }

  // 抄送监督员，在点击变更时，弹框内要显示已有内容
  const copySupervisorList = res.data.repatrolTask.copySupervisor.split(',')
  const copySupervisorListData = []
  for (const copySupervisorId of copySupervisorList) {
    copySupervisorListData.push(parseInt(copySupervisorId))
  }

  type.value = 'update'
  if (res.code === 0) {
    formData.value = res.data.repatrolTask
    formData.value.validTime = validTimeList
    formData.value.taskCycleTime = taskCycleTimesList
    formData.value.siteIdList = patrolRouteList
    formData.value.taskItemIdList = taskItemIdListData
    formData.value.assignTasks = assignTasksListData
    formData.value.copySupervisor = copySupervisorListData
    formData.value.intervalDuration > 1 ? intervalDurationVisible.value = true : intervalDurationVisible.value = false
    dialogFormVisible.value = true
  }
}

// 删除行
const deletePatrolTaskFunc = async(row) => {
  const res = await deletePatrolTask({ ID: row.ID })
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

// 关闭弹窗
const closeDialog = () => {
  dialogFormVisible.value = false
  intervalDurationVisible.value = false
  formData.value = {
    taskName: '',
    taskItemIdList: '',
    patrolTimes: 0,
    intervalDuration: 0,
    clockMode: '',
    siteIdList: '',
    taskCycleTime: '',
    validTime: '',
    deptId: 0,
    assignTasks: '',
    copySupervisor: '',
  }
}
// 弹窗确定
const enterDialog = async() => {
  // 在还未校验之前，把taskItemIdList值给弄进formData去
  elFormRef.value?.validate(async(valid) => {
    if (!valid) return
    let res
    const requestFormData = {}
    requestFormData.ID = formData.value.ID
    requestFormData.taskItemIdList = formData.value.taskItemIdList.toString()
    const validTimeStart = new Date(formData.value.validTime[0])
    const validTimeEnd = new Date(formData.value.validTime[1])
    requestFormData.validTime = validTimeStart.getHours() + ':' + validTimeStart.getMinutes() + ':' + validTimeStart.getSeconds() + ',' + validTimeEnd.getHours() + ':' + validTimeEnd.getMinutes() + ':' + validTimeEnd.getSeconds()
    requestFormData.taskName = formData.value.taskName
    requestFormData.patrolTimes = formData.value.patrolTimes
    requestFormData.intervalDuration = formData.value.intervalDuration
    requestFormData.clockMode = formData.value.clockMode
    requestFormData.siteIdList = formData.value.siteIdList.toString()
    const taskCycleTimeStart = new Date(formData.value.taskCycleTime[0])
    const taskCycleTimeEnd = new Date(formData.value.taskCycleTime[1])
    requestFormData.taskCycleTime = taskCycleTimeStart.getFullYear() + '-' + (taskCycleTimeStart.getMonth() + 1) + '-' + taskCycleTimeStart.getDate() + ',' + taskCycleTimeEnd.getFullYear() + '-' + (taskCycleTimeEnd.getMonth() + 1) + '-' + taskCycleTimeEnd.getDate()
    requestFormData.deptId = formData.value.deptId
    requestFormData.assignTasks = formData.value.assignTasks.toString()
    requestFormData.copySupervisor = formData.value.copySupervisor.toString()
    switch (type.value) {
      case 'create':
        res = await createPatrolTask(requestFormData)
        break
      case 'update':
        requestFormData.CreatedAt = formData.value.CreatedAt
        res = await updatePatrolTask(requestFormData)
        break
      default:
        res = await createPatrolTask(requestFormData)
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

// 巡检时间周期
const disabledDate = (time) => {
  return time.getTime() < Date.now() - 8.64e7
}
// 任务内容
const taskItemIdListOptions = ref([])

const getItemList = async() => {
  // 调用getPatrolItemList接口，能够得到巡检内容数据
  const table = await getPatrolItemList({ page: 1, pageSize: 1000 })
  // 得到的数据类型是一个list集合
  const itemList = table.data.list
  // 把集合里面的内容元素遍历出来
  for (const item of itemList) {
    // 然后封装到上面的options数组中
    taskItemIdListOptions.value.push({
      'label': item.itemTitle,
      'value': item.ID
    })
  }
}

getItemList()

// 任务内容在table表格中显示
const filterPatrolItem = (value, options) => {
  const valueList = value.split(',')
  let res = ''
  for (const index in valueList) {
    const rowLabel = options && options.filter(item => item.value === parseInt(valueList[index]))
    res += rowLabel && rowLabel[0] && rowLabel[0].label
  }
  return res
}

// 弹框任务内容下拉列表显示内容
const elSelectOnChange = async(event) => {
  // 获得最后一个被选中的元素数据
  const contentItem = event[event.length - 1]
  if (typeof contentItem === 'string') {
    const res = await createPatrolItem({
      itemTitle: contentItem,
      deptId: 0,
    })
  }
}

// 分配任务
const assignTasksContent = ref([])
const getTaskUser = async() => {
  // 调用getUserList接口，能够得到用户列表数据
  const table1 = await getUserList({ page: 1, pageSize: 1000 })
  // 得到的数据类型是一个list集合
  const taskUser = table1.data.list
  // 把集合里面的内容元素遍历出来
  for (const item of taskUser) {
    // 然后封装到上面的options4数组中
    assignTasksContent.value.push({
      headerImg: item.headerImg,
      value: item.ID,
      label: item.nickName
    })
  }
}

getTaskUser()

// 分配任务在table表格中显示
const filterAssignTasks = (value, options) => {
  const valueListData = value.split(',')
  let res = ''
  for (const index in valueListData) {
    if (options.length > 0) {
      const rowLabel = options.filter(item => item.value === parseInt(valueListData[index]))
      if (rowLabel.length > 0) {
        res += rowLabel[0].label
      }
    }
  }
  return res
}
// 抄送
const copySupervisorList = ref([])
const getTaskUserData = async() => {
  // 调用getUserList接口，能够得到用户列表数据
  const table1 = await getUserList({ page: 1, pageSize: 1000 })
  // 得到的数据类型是一个list集合
  const taskUser = table1.data.list
  // 把集合里面的内容元素遍历出来
  for (const item of taskUser) {
    // 然后封装到上面的options4数组中
    copySupervisorList.value.push({
      headerImg: item.headerImg,
      value: item.ID,
      label: item.nickName
    })
  }
}

getTaskUserData()
// 抄送在-table中显示出来filterCopySupervisor
const filterCopySupervisor = (value, options) => {
  const valueData = value.split(',')
  let res = ''
  for (const index in valueData) {
    if (options.length > 0) {
      const rowLabel = options.filter(item => item.value === parseInt(valueData[index]))
      if (rowLabel.length > 0) {
        res += rowLabel[0].label
      }
    }
  }
  return res
}

const patrolRouteListOptions = ref([])

const getPatrolSiteData = async() => {
  // 调用getPatrolSiteList接口，能够得到巡检地点数据
  const table2 = await getPatrolSiteList({ page: 1, pageSize: 1000 })
  // 得到的数据类型是一个list集合
  const itemList = table2.data.list
  // 把集合里面的内容元素遍历出来
  for (const item of itemList) {
    // 然后封装到上面的options数组中
    patrolRouteListOptions.value.push({
      'label': item.itemTitle,
      'value': item.siteName
    })
  }
}

getPatrolSiteData()

const patrolTimesInputEvent = (event) => {
  if (event > 1) {
    intervalDurationVisible.value = true
  } else {
    intervalDurationVisible.value = false
  }
}
</script>

<style>

</style>
