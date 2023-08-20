<template>
  <div>
    <div class="gva-search-box">
      <el-form :inline="true" :model="searchInfo" class="demo-form-inline" @keyup.enter="onSubmit">
        <el-form-item label="创建时间">
          <el-date-picker v-model="searchInfo.startCreatedAt" type="datetime" placeholder="开始时间"></el-date-picker>
          —
          <el-date-picker v-model="searchInfo.endCreatedAt" type="datetime" placeholder="结束时间"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="search" @click="onSubmit">查询</el-button>
          <el-button icon="refresh" @click="onReset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="gva-table-box">
      <div class="gva-btn-list">
        <el-button type="primary" icon="plus" @click="openDialog">新增</el-button>
        <el-popover v-model:visible="deleteVisible" placement="top" width="160">
          <p>确定要删除吗？</p>
          <div style="text-align: right; margin-top: 8px;">
            <el-button type="primary" link @click="deleteVisible = false">取消</el-button>
            <el-button type="primary" @click="onDelete">确定</el-button>
          </div>
          <template #reference>
            <el-button icon="delete" style="margin-left: 10px;" :disabled="!multipleSelection.length"
                       @click="deleteVisible = true">删除
            </el-button>
          </template>
        </el-popover>
      </div>
      <el-table
          ref="multipleTable"
          style="width: 100%"
          tooltip-effect="dark"
          :data="tableData"
          row-key="id"
          @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"/>
        <el-table-column align="left" label="日期" width="180">
          <template #default="scope">{{ formatDate(scope.row.createdAt) }}</template>
        </el-table-column>
        <el-table-column align="left" label="入站规则的id" prop="bid" width="120"/>
        <el-table-column align="left" label="上行流量" prop="up" width="120"/>
        <el-table-column align="left" label="下行流量" prop="down" width="120"/>
        <el-table-column align="left" label="限制总量" prop="total" width="120"/>
        <el-table-column align="left" label="入站规则名称" prop="remark" width="120"/>
        <el-table-column align="left" label="是否启用" prop="enable" width="120">
          <template #default="scope">{{ formatBoolean(scope.row.enable) }}</template>
        </el-table-column>
        <el-table-column align="left" label="过期时间" prop="expiryTime" width="120"/>
        <el-table-column align="left" label="端口" prop="port" width="120"/>
        <el-table-column align="left" label="协议" prop="protocol" width="120"/>
        <el-table-column align="left" label="基本信息" prop="settings" width="120"/>
        <el-table-column align="left" label="其他信息" prop="streamSettings" width="120"/>
        <el-table-column align="left" label="默认就行" prop="sniffing" width="120"/>
        <el-table-column align="left" label="监听IP默认留空" prop="listen" width="120"/>
        <el-table-column align="left" label="按钮组">
          <template #default="scope">
            <el-button type="primary" link icon="edit" class="table-button" @click="updateInboundsFunc(scope.row)">
              变更
            </el-button>
            <el-button type="primary" link icon="delete" @click="deleteRow(scope.row)">删除</el-button>
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
        <el-form-item label="入站规则的id:" prop="bid">
          <el-input v-model.number="formData.bid" :clearable="true" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="上行流量:" prop="up">
          <el-input v-model.number="formData.up" :clearable="true" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="下行流量:" prop="down">
          <el-input v-model.number="formData.down" :clearable="true" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="限制总量:" prop="total">
          <el-input v-model.number="formData.total" :clearable="true" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="入站规则名称:" prop="remark">
          <el-input v-model="formData.remark" :clearable="true" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="是否启用:" prop="enable">
          <el-switch v-model="formData.enable" active-color="#13ce66" inactive-color="#ff4949" active-text="是"
                     inactive-text="否" clearable></el-switch>
        </el-form-item>
        <el-form-item label="过期时间:" prop="expiryTime">
          <el-input v-model.number="formData.expiryTime" :clearable="true" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="端口:" prop="port">
          <el-input v-model.number="formData.port" :clearable="true" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="协议:" prop="protocol">
          <el-input v-model="formData.protocol" :clearable="true" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="基本信息:" prop="settings">
          <el-input v-model="formData.settings" :clearable="true" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="其他信息:" prop="streamSettings">
          <el-input v-model="formData.streamSettings" :clearable="true" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="默认就行:" prop="sniffing">
          <el-input v-model="formData.sniffing" :clearable="true" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="监听IP默认留空:" prop="listen">
          <el-input v-model="formData.listen" :clearable="true" placeholder="请输入"/>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="closeDialog">取 消</el-button>
          <el-button type="primary" @click="enterDialog">确 定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Inbounds'
}
</script>

<script setup>
import {
  createInbounds,
  deleteInbounds,
  deleteInboundsByIds,
  updateInbounds,
  findInbounds,
  getInboundsList
} from '@/api/inbounds'

// 全量引入格式化工具 请按需保留
import { formatDate, formatBoolean } from '@/utils/format'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref, reactive } from 'vue'

// 自动化生成的字典（可能为空）以及字段
const formData = ref({
  clientId: '',
  up: 0,
  down: 0,
  total: 0,
  remark: '',
  enable: true,
  expiryTime: 0,
  port: 0,
  protocol: '',
  settings: '',
  streamSettings: '',
  sniffing: '',
  listen: '',
  uid: 0,
  sid: 0,
  link: '',
  link64: '',
})

// 验证规则
const rule = reactive({})

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
  if (searchInfo.value.enable === '') {
    searchInfo.value.enable = null
  }
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
  const table = await getInboundsList({ page: page.value, pageSize: pageSize.value, ...searchInfo.value })
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
    deleteInboundsFunc(row)
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
    ids.push(item.id)
  })
  const res = await deleteInboundsByIds({ ids })
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
const updateInboundsFunc = async(row) => {
  const res = await findInbounds({ id: row.id })
  type.value = 'update'
  if (res.code === 0) {
    formData.value = res.data.reinbounds
    dialogFormVisible.value = true
  }
}

// 删除行
const deleteInboundsFunc = async(row) => {
  const res = await deleteInbounds({ id: row.id })
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
  formData.value = {
    clientId: '',
    up: 0,
    down: 0,
    total: 0,
    remark: '',
    enable: true,
    expiryTime: 0,
    port: 0,
    protocol: '',
    settings: '',
    streamSettings: '',
    sniffing: '',
    listen: '',
    uid: 0,
    sid: 0,
    link: '',
    link64: '',
  }
}
// 弹窗确定
const enterDialog = async() => {
  elFormRef.value?.validate(async(valid) => {
    if (!valid) return
    let res
    switch (type.value) {
      case 'create':
        res = await createInbounds(formData.value)
        break
      case 'update':
        res = await updateInbounds(formData.value)
        break
      default:
        res = await createInbounds(formData.value)
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
