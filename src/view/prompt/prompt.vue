<template>
  <div>
    <div class="gva-search-box">
      <el-form ref="elSearchFormRef" :inline="true" :model="searchInfo" class="demo-form-inline" :rules="searchRule" @keyup.enter="onSubmit">
      <el-form-item label="创建日期" prop="createdAt">
      <template #label>
        <span>
          创建日期
          <el-tooltip content="搜索范围是开始日期（包含）至结束日期（不包含）">
            <el-icon><QuestionFilled /></el-icon>
          </el-tooltip>
        </span>
      </template>
      <el-date-picker v-model="searchInfo.startCreatedAt" type="datetime" placeholder="开始日期" :disabled-date="time=> searchInfo.endCreatedAt ? time.getTime() > searchInfo.endCreatedAt.getTime() : false"></el-date-picker>
       —
      <el-date-picker v-model="searchInfo.endCreatedAt" type="datetime" placeholder="结束日期" :disabled-date="time=> searchInfo.startCreatedAt ? time.getTime() < searchInfo.startCreatedAt.getTime() : false"></el-date-picker>
      </el-form-item>
        <el-form-item label="提示词名称" prop="name">
         <el-input v-model="searchInfo.name" placeholder="搜索条件" />

        </el-form-item>
        <el-form-item label="提示词描述" prop="description">
         <el-input v-model="searchInfo.description" placeholder="搜索条件" />

        </el-form-item>
        <el-form-item label="提示词内容" prop="content">
         <el-input v-model="searchInfo.content" placeholder="搜索条件" />

        </el-form-item>
        <el-form-item label="快捷键" prop="shortcutKey">
         <el-input v-model="searchInfo.shortcutKey" placeholder="搜索条件" />

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
                <el-button icon="delete" style="margin-left: 10px;" :disabled="!multipleSelection.length" @click="deleteVisible = true">删除</el-button>
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
        <el-table-column type="selection" width="55" />
        <el-table-column align="left" label="日期" width="180">
            <template #default="scope">{{ formatDate(scope.row.CreatedAt) }}</template>
        </el-table-column>
        <el-table-column align="left" label="提示词名称" prop="name" width="120" />
        <el-table-column align="left" label="提示词描述" prop="description" width="120" />
        <el-table-column align="left" label="提示词价格" prop="useFee" width="120" />
        <el-table-column align="left" label="提示词内容" prop="content" width="120" />
        <el-table-column align="left" label="是否分享" prop="isShare" width="120">
            <template #default="scope">
            {{ filterDict(scope.row.isShare,isShareOptions) }}
            </template>
        </el-table-column>
        <el-table-column align="left" label="快捷键" prop="shortcutKey" width="120" />
        <el-table-column align="left" label="类别分类" prop="category" width="120">
            <template #default="scope">
            {{ filterDict(scope.row.category,promptCategoryOptions) }}
            </template>
        </el-table-column>
        <el-table-column align="left" label="使用时间" prop="useDuration" width="120" />
        <el-table-column align="left" label="操作">
            <template #default="scope">
            <el-button type="primary" link icon="edit" class="table-button" @click="updatePromptFunc(scope.row)">变更</el-button>
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
    <el-dialog v-model="dialogFormVisible" :before-close="closeDialog" :title="type==='create'?'添加':'修改'" destroy-on-close>
      <el-form :model="formData" label-position="right" ref="elFormRef" :rules="rule" label-width="80px">
        <el-form-item label="提示词名称:"  prop="name" >
          <el-input v-model="formData.name" :clearable="false"  placeholder="请输入" />
        </el-form-item>
        <el-form-item label="提示词描述:"  prop="description" >
          <el-input v-model="formData.description" :clearable="true"  placeholder="请输入" />
        </el-form-item>
        <el-form-item label="提示词价格:"  prop="useFee" >
          <el-input v-model.number="formData.useFee" :clearable="false" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="提示词内容:"  prop="content" >
          <el-input v-model="formData.content" :clearable="true"  placeholder="请输入" />
        </el-form-item>
        <el-form-item label="是否分享:"  prop="isShare" >
          <el-select v-model="formData.isShare" placeholder="请选择" style="width:100%" :clearable="true" >
            <el-option v-for="(item,key) in isShareOptions" :key="key" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="快捷键:"  prop="shortcutKey" >
          <el-input v-model="formData.shortcutKey" :clearable="true"  placeholder="请输入" />
        </el-form-item>
        <el-form-item label="类别分类:"  prop="category" >
          <el-select v-model="formData.category" placeholder="请选择" style="width:100%" :clearable="true" >
            <el-option v-for="(item,key) in promptCategoryOptions" :key="key" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="使用时间:"  prop="useDuration" >
          <el-input v-model.number="formData.useDuration" :clearable="true" placeholder="请输入" />
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
  name: 'Prompt'
}
</script>

<script setup>
import {
  createPrompt,
  deletePrompt,
  deletePromptByIds,
  updatePrompt,
  findPrompt,
  getPromptList
} from '@/api/prompt'

// 全量引入格式化工具 请按需保留
import { getDictFunc, formatDate, formatBoolean, filterDict } from '@/utils/format'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref, reactive } from 'vue'

// 自动化生成的字典（可能为空）以及字段
const isShareOptions = ref([])
const promptCategoryOptions = ref([])
const formData = ref({
        name: '',
        description: '',
        useFee: 0,
        content: '',
        isShare: undefined,
        shortcutKey: '',
        category: undefined,
        useDuration: 0,
        })

// 验证规则
const rule = reactive({
               name : [{
                   required: true,
                   message: '提示词名称不能为空',
                   trigger: ['input','blur'],
               },
               {
                   whitespace: true,
                   message: '不能只输入空格',
                   trigger: ['input', 'blur'],
               }
               ],
               useFee : [{
                   required: true,
                   message: '',
                   trigger: ['input','blur'],
               },
               ],
               content : [{
                   required: true,
                   message: '提示词内容不能为空',
                   trigger: ['input','blur'],
               },
               {
                   whitespace: true,
                   message: '不能只输入空格',
                   trigger: ['input', 'blur'],
               }
               ],
               isShare : [{
                   required: true,
                   message: '',
                   trigger: ['input','blur'],
               },
               ],
               category : [{
                   required: true,
                   message: '',
                   trigger: ['input','blur'],
               },
               ],
               useDuration : [{
                   required: true,
                   message: '',
                   trigger: ['input','blur'],
               },
               ],
})

const searchRule = reactive({
  createdAt: [
    { validator: (rule, value, callback) => {
      if (searchInfo.value.startCreatedAt && !searchInfo.value.endCreatedAt) {
        callback(new Error('请填写结束日期'))
      } else if (!searchInfo.value.startCreatedAt && searchInfo.value.endCreatedAt) {
        callback(new Error('请填写开始日期'))
      } else if (searchInfo.value.startCreatedAt && searchInfo.value.endCreatedAt && (searchInfo.value.startCreatedAt.getTime() === searchInfo.value.endCreatedAt.getTime() || searchInfo.value.startCreatedAt.getTime() > searchInfo.value.endCreatedAt.getTime())) {
        callback(new Error('开始日期应当早于结束日期'))
      } else {
        callback()
      }
    }, trigger: 'change' }
  ],
})

const elFormRef = ref()
const elSearchFormRef = ref()

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
  elSearchFormRef.value?.validate(async(valid) => {
    if (!valid) return
    page.value = 1
    pageSize.value = 10
    getTableData()
  })
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
  const table = await getPromptList({ page: page.value, pageSize: pageSize.value, ...searchInfo.value })
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
    isShareOptions.value = await getDictFunc('isShare')
    promptCategoryOptions.value = await getDictFunc('promptCategory')
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
            deletePromptFunc(row)
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
      const res = await deletePromptByIds({ ids })
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
const updatePromptFunc = async(row) => {
    const res = await findPrompt({ id: row.id })
    type.value = 'update'
    if (res.code === 0) {
        formData.value = res.data.reprompt
        dialogFormVisible.value = true
    }
}


// 删除行
const deletePromptFunc = async (row) => {
    const res = await deletePrompt({ id: row.id })
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
        name: '',
        description: '',
        useFee: 0,
        content: '',
        isShare: undefined,
        shortcutKey: '',
        category: undefined,
        useDuration: 0,
        }
}
// 弹窗确定
const enterDialog = async () => {
     elFormRef.value?.validate( async (valid) => {
             if (!valid) return
              let res
              switch (type.value) {
                case 'create':
                  res = await createPrompt(formData.value)
                  break
                case 'update':
                  res = await updatePrompt(formData.value)
                  break
                default:
                  res = await createPrompt(formData.value)
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
