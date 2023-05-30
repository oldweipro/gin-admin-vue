<template>
  <div>
    <div class="gva-form-box">
      <el-form :model="formData" ref="elFormRef" label-position="right" :rules="rule" label-width="80px">
        <el-form-item label="数量:" prop="amount">
          <el-input v-model.number="formData.amount" :clearable="false" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="过期时间:" prop="expirationTime">
          <el-input v-model.number="formData.expirationTime" :clearable="false" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="票据名称:" prop="ticketName">
          <el-input v-model="formData.ticketName" :clearable="false" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="归属:" prop="belongTo">
          <el-input v-model.number="formData.belongTo" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="save">保存</el-button>
          <el-button type="primary" @click="back">返回</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChatTicket'
}
</script>

<script setup>
import {
  createChatTicket,
  updateChatTicket,
  findChatTicket
} from '@/api/chatTicket'

// 自动获取字典
import { getDictFunc } from '@/utils/format'
import { useRoute, useRouter } from "vue-router"
import { ElMessage } from 'element-plus'
import { ref, reactive } from 'vue'
const route = useRoute()
const router = useRouter()

const type = ref('')
const formData = ref({
            amount: 0,
            expirationTime: 0,
            ticketName: '',
            belongTo: 0,
        })
// 验证规则
const rule = reactive({
               amount : [{
                   required: true,
                   message: '数量不能为空',
                   trigger: ['input','blur'],
               }],
               expirationTime : [{
                   required: true,
                   message: '',
                   trigger: ['input','blur'],
               }],
               ticketName : [{
                   required: true,
                   message: '',
                   trigger: ['input','blur'],
               }],
})

const elFormRef = ref()

// 初始化方法
const init = async () => {
 // 建议通过url传参获取目标数据ID 调用 find方法进行查询数据操作 从而决定本页面是create还是update 以下为id作为url参数示例
    if (route.query.id) {
      const res = await findChatTicket({ ID: route.query.id })
      if (res.code === 0) {
        formData.value = res.data.rechatTicket
        type.value = 'update'
      }
    } else {
      type.value = 'create'
    }
}

init()
// 保存按钮
const save = async() => {
      elFormRef.value?.validate( async (valid) => {
         if (!valid) return
            let res
           switch (type.value) {
             case 'create':
               res = await createChatTicket(formData.value)
               break
             case 'update':
               res = await updateChatTicket(formData.value)
               break
             default:
               res = await createChatTicket(formData.value)
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
