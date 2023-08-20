<template>
  <div>
    <div class="gva-search-box">
      <el-form :inline="true" :model="searchInfo" class="demo-form-inline" @keyup.enter="onSubmit">
        <el-form-item label="公告:">
          <a>大家使用开心！</a>
        </el-form-item>
      </el-form>
    </div>
    <div class="gva-table-box">
      <el-table
        ref="multipleTable"
        style="width: 100%"
        tooltip-effect="dark"
        :data="tableData"
        row-key="id"
        @selection-change="handleSelectionChange"
      >
        <el-table-column align="left" label="带宽" prop="bandwidth"/>
        <el-table-column align="left" label="地区" prop="region"/>
        <el-table-column align="left" label="操作" min-width="150">
          <template #default="scope">
            <el-button type="primary" link icon="edit" @click="resetInboundsLink(scope.row)">重置</el-button>
            <el-button type="primary" link icon="link" @click="getInboundsLink(scope.row)">链接</el-button>
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
    <el-dialog v-model="dialogFormVisible" :before-close="closeDialog" :title="inboundsData.region">
      <el-form :model="inboundsData" label-position="right" label-width="100px">
        <qrcode-vue :value="inboundsData.link64" style="display: block; margin: 14px auto 14px;"/>
        <el-form-item label="地址:" prop="domain">
          <el-text type="success">{{ inboundsData.domain }}</el-text>
        </el-form-item>
        <el-form-item label="端口:" prop="port">
          <el-text type="success">{{ inboundsData.port }}</el-text>
        </el-form-item>
        <el-form-item label="uuid:" prop="clientId">
          <el-text type="success">{{ inboundsData.clientId }}</el-text>
        </el-form-item>
        <el-form-item label="alterId:" prop="alterId">
          <el-text type="success">0</el-text>
        </el-form-item>
        <el-form-item label="传输协议:" prop="protocol">
          <el-text type="success">{{ inboundsData.protocol }}</el-text>
        </el-form-item>
        <el-form-item label="路径:" prop="path">
          <el-text type="success">/</el-text>
        </el-form-item>
        <el-form-item label="vMess链接:" prop="vmess">
          <el-button type="primary" @click="enterDialog">点我复制</el-button>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="closeDialog">关 闭</el-button>
          <el-button type="primary" @click="enterDialog">复制链接</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'ServerNodeUser',
}
</script>

<script setup>
import {
  getServerNodeList,
} from '@/api/serverNode'

import {
  findInboundsLink, setInboundsLink,
} from '@/api/inbounds'

import useClipboard from 'vue-clipboard3'
import QrcodeVue from 'qrcode.vue'

// 全量引入格式化工具 请按需保留
import { ElMessage } from 'element-plus'
import { ref } from 'vue'

const inboundsData = ref({
  clientId: '',
  up: 0,
  down: 0,
  total: 0,
  remark: '',
  enable: true,
  expiryTime: 0,
  port: '0',
  protocol: '',
  settings: '',
  streamSettings: '',
  sniffing: '',
  listen: '',
  uid: 0,
  sid: 0,
  link: '',
  link64: '',
  domain: '地址不可用',
  region: '节点信息',
})

// =========== 表格控制部分 ===========
const page = ref(1)
const total = ref(0)
const pageSize = ref(10)
const tableData = ref([])
const searchInfo = ref({})

// 搜索
const onSubmit = () => {
  // page.value = 1
  // pageSize.value = 10
  // getTableData()
  ElMessage.info('这是个装饰品💍')
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

// 弹窗控制标记
const dialogFormVisible = ref(false)

// 查看链接
const getInboundsLink = async(row) => {
  const res = await findInboundsLink({ sid: row.id })
  if (res.code === 0) {
    inboundsData.value = res.data.inboundsData
    inboundsData.value.domain = res.data.domain
    inboundsData.value.region = res.data.region
    dialogFormVisible.value = true
  }
}

const resetInboundsLink = async(row) => {
  inboundsData.value.sid = row.id
  await setInboundsLink(inboundsData.value)
  ElMessage.warning('重置完成')
}

// 关闭弹窗
const closeDialog = () => {
  dialogFormVisible.value = false
  inboundsData.value = {
    clientId: '',
    up: 0,
    down: 0,
    total: 0,
    remark: '',
    enable: true,
    expiryTime: 0,
    port: '0',
    protocol: '',
    settings: '',
    streamSettings: '',
    sniffing: '',
    listen: '',
    uid: 0,
    sid: 0,
    link: '',
    link64: '',
    domain: '地址不可用',
    region: '节点信息',
  }
}
const { toClipboard } = useClipboard()
// 弹窗确定
const enterDialog = async() => {
  // 复制到剪切板
  try {
    await toClipboard(inboundsData.value.link64)
    ElMessage.success('复制成功')
  } catch (e) {
    ElMessage.warning('您的浏览器不支持复制：', e)
  }
  closeDialog()
  await getTableData()
}
</script>

<style>
</style>
