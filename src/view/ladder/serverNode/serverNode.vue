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
            <el-button
                icon="delete"
                style="margin-left: 10px;"
                :disabled="!multipleSelection.length"
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
          row-key="ID"
          @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"/>
        <el-table-column align="left" label="日期" width="180">
          <template #default="scope">{{ formatDate(scope.row.CreatedAt) }}</template>
        </el-table-column>
        <el-table-column align="left" label="服务器名称" prop="serverName" width="120"/>
        <el-table-column align="left" label="服务器主机地址" prop="serverHost" width="120"/>
        <el-table-column align="left" label="服务器端口" prop="serverPort" width="120"/>
        <el-table-column align="left" label="服务器状态" prop="serverStatus" width="120"/>
        <el-table-column align="left" label="备注描述" prop="describe" width="120"/>
        <el-table-column align="left" label="带宽" prop="bandwidth" width="120"/>
        <el-table-column align="left" label="服务器地区" prop="region" width="120"/>
        <el-table-column align="left" label="域名" prop="domain" width="120"/>
        <el-table-column align="left" label="用户名" prop="username" width="120"/>
        <el-table-column align="left" label="密码" prop="password" width="120"/>
        <el-table-column align="left" label="pem文件" prop="pemFile" width="120"/>
        <el-table-column align="left" label="key文件" prop="keyFile" width="120"/>
        <el-table-column align="left" label="按钮组">
          <template #default="scope">
            <el-button type="primary" link icon="edit" class="table-button" @click="updateServerNodeFunc(scope.row)">
              变更
            </el-button>
            <el-button type="primary" link icon="link" @click="getInboundsLink(scope.row)">链接</el-button>
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
        <el-form-item label="服务器名称:" prop="serverName">
          <el-input v-model="formData.serverName" :clearable="true" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="服务器主机地址:" prop="serverHost">
          <el-input v-model="formData.serverHost" :clearable="true" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="服务器端口:" prop="serverPort">
          <el-input v-model.number="formData.serverPort" :clearable="true" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="服务器状态:" prop="serverStatus">
          <el-input v-model.number="formData.serverStatus" :clearable="true" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="备注描述:" prop="describe">
          <el-input v-model="formData.describe" :clearable="true" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="带宽:" prop="bandwidth">
          <el-input v-model="formData.bandwidth" :clearable="true" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="服务器地区:" prop="region">
          <el-input v-model="formData.region" :clearable="true" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="域名:" prop="domain">
          <el-input v-model="formData.domain" :clearable="true" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="用户名:" prop="username">
          <el-input v-model="formData.username" :clearable="true" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="密码:" prop="password">
          <el-input v-model="formData.password" :clearable="true" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="pem文件:" prop="pemFile">
          <el-input v-model="formData.pemFile" :clearable="true" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="key文件:" prop="keyFile">
          <el-input v-model="formData.keyFile" :clearable="true" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="cookie:" prop="cookie">
          <el-input v-model="formData.cookie" :clearable="true" placeholder="请输入"/>
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
  name: 'ServerNode'
}
</script>

<script setup>
import {
  createServerNode,
  deleteServerNode,
  deleteServerNodeByIds,
  updateServerNode,
  findServerNode,
  getServerNodeList
} from '@/api/serverNode'

import {
  findInboundsLink
} from '@/api/inbounds'

// 全量引入格式化工具 请按需保留
import { formatDate } from '@/utils/format'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref, reactive } from 'vue'

// 自动化生成的字典（可能为空）以及字段
const formData = ref({
  serverName: '',
  serverHost: '',
  serverPort: 0,
  serverStatus: 0,
  describe: '',
  bandwidth: '',
  region: '',
  domain: '',
  username: '',
  password: '',
  pemFile: '',
  keyFile: '',
  cookie: '',
})

// 验证规则
const rule = reactive({
  serverName: [{
    required: true,
    message: '服务器节点名称不能为空',
    trigger: ['input', 'blur'],
  }],
  serverHost: [{
    required: true,
    message: '服务器主机地址不能为空',
    trigger: ['input', 'blur'],
  }],
  serverPort: [{
    required: true,
    message: '服务器端口不能为空',
    trigger: ['input', 'blur'],
  }],
  serverStatus: [{
    required: true,
    message: '',
    trigger: ['input', 'blur'],
  }],
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
  const table = await getServerNodeList({ page: page.value, pageSize: pageSize.value, ...searchInfo.value })
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
    deleteServerNodeFunc(row)
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
  const res = await deleteServerNodeByIds({ ids })
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
const updateServerNodeFunc = async(row) => {
  const res = await findServerNode({ ID: row.ID })
  type.value = 'update'
  if (res.code === 0) {
    formData.value = res.data.reserverNode
    dialogFormVisible.value = true
  }
}

// 查看链接
const getInboundsLink = async(row) => {
  const res = await findInboundsLink({ sid: row.ID })
  console.log(res)
}

// 删除行
const deleteServerNodeFunc = async(row) => {
  const res = await deleteServerNode({ ID: row.ID })
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
    serverName: '',
    serverHost: '',
    serverPort: 0,
    serverStatus: 0,
    describe: '',
    bandwidth: '',
    region: '',
    domain: '',
    username: '',
    password: '',
    pemFile: '',
    keyFile: '',
    cookie: '',
  }
}
// 弹窗确定
const enterDialog = async() => {
  elFormRef.value?.validate(async(valid) => {
    if (!valid) return
    let res
    switch (type.value) {
      case 'create':
        res = await createServerNode(formData.value)
        break
      case 'update':
        res = await updateServerNode(formData.value)
        break
      default:
        res = await createServerNode(formData.value)
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
