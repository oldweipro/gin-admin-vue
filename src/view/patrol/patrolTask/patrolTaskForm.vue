<template>
  <div>
    <div class="gva-form-box">
      <el-form :model="formData" ref="elFormRef" label-position="right" :rules="rule" label-width="80px">
        <el-form-item label="任务名称:" prop="taskName">
          <el-input v-model="formData.taskName" :clearable="true" placeholder="请输入1" />
        </el-form-item>
        <el-form-item label="任务内容项列表:" prop="taskItemIdList">
          <el-input v-model="formData.taskItemIdList" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="巡检次数:" prop="patrolTimes">
          <el-input v-model.number="formData.patrolTimes" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="多次巡更间隔时长，单位分钟:" prop="intervalDuration">
          <el-input v-model.number="formData.intervalDuration" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="巡检打卡方式:" prop="clockMode">
          <el-select v-model="formData.clockMode" placeholder="请选择" :clearable="true">
            <el-option v-for="(item,key) in patrolClockModeOptions" :key="key" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="巡检地点ID集合:" prop="siteIdList">
          <el-input v-model="formData.siteIdList" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="任务时间周期:" prop="taskCycleTime">
          <el-input v-model="formData.taskCycleTime" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="当天巡检有效时间:" prop="validTime">
          <el-input v-model="formData.validTime" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="所属项目:" prop="deptId">
          <el-input v-model.number="formData.deptId" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="分配任务:" prop="assignTasks">
          <el-input v-model="formData.assignTasks" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="抄送至监管员:" prop="copySupervisor">
          <el-input v-model="formData.copySupervisor" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" @click="save">保存</el-button>
          <el-button size="small" type="primary" @click="back">返回</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PatrolTask'
}
</script>

<script setup>
import {
  createPatrolTask,
  updatePatrolTask,
  findPatrolTask
} from '@/api/patrolTask'

// 自动获取字典
import { getDictFunc } from '@/utils/format'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { ref, reactive } from 'vue'
const route = useRoute()
const router = useRouter()

const type = ref('')
const patrolClockModeOptions = ref([])
const formData = ref({
  taskName: '',
  taskItemIdList: '',
  patrolTimes: 0,
  intervalDuration: 0,
  clockMode: undefined,
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

// 初始化方法
const init = async() => {
  // 建议通过url传参获取目标数据ID 调用 find方法进行查询数据操作 从而决定本页面是create还是update 以下为id作为url参数示例
  if (route.query.id) {
    const res = await findPatrolTask({ ID: route.query.id })
    if (res.code === 0) {
      formData.value = res.data.repatrolTask
      type.value = 'update'
    }
  } else {
    type.value = 'create'
  }
  patrolClockModeOptions.value = await getDictFunc('patrolClockMode')
}

init()
// 保存按钮
const save = async() => {
  elFormRef.value?.validate(async(valid) => {
    if (!valid) return
    let res
    switch (type.value) {
      case 'create':
        res = await createPatrolTask(formData.value)
        break
      case 'update':
        res = await updatePatrolTask(formData.value)
        break
      default:
        res = await createPatrolTask(formData.value)
        break
    }
    if (res.code === 0) {
      ElMessage({
        type: 'success',
        message: '创建/更改成功'
      })
    }
  })
}

// 返回按钮
const back = () => {
  router.go(-1)
}

</script>

<style>
</style>
