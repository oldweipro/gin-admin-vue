<template>
  <div>
    <div class="gva-form-box">
      <el-form :model="formData" ref="elFormRef" label-position="right" :rules="rule" label-width="80px">
        <el-form-item label="密钥:" prop="sk">
          <el-input v-model.number="formData.sk" :clearable="false" placeholder="请输入" />
       </el-form-item>
        <el-form-item label="密钥名字:" prop="skName">
          <el-input v-model="formData.skName" :clearable="false" placeholder="请输入" />
       </el-form-item>
        <el-form-item label="关联用户ID:" prop="userId">
          <el-input v-model.number="formData.userId" :clearable="false" placeholder="请输入" />
       </el-form-item>
        <el-form-item label="过期时间:" prop="expire">
          <el-date-picker v-model="formData.expire" type="date" placeholder="选择日期" :clearable="false"></el-date-picker>
       </el-form-item>
        <el-form-item label="余额:" prop="amount">
          <el-input v-model.number="formData.amount" :clearable="false" placeholder="请输入" />
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
  name: 'SecretKey'
}
</script>

<script setup>
import {
  createSecretKey,
  updateSecretKey,
  findSecretKey
} from '@/api/secretKey'

// 自动获取字典
import { getDictFunc } from '@/utils/format'
import { useRoute, useRouter } from "vue-router"
import { ElMessage } from 'element-plus'
import { ref, reactive } from 'vue'
const route = useRoute()
const router = useRouter()

const type = ref('')
const formData = ref({
            sk: 0,
            skName: '',
            userId: 0,
            expire: new Date(),
            amount: 0,
        })
// 验证规则
const rule = reactive({
               sk : [{
                   required: true,
                   message: '',
                   trigger: ['input','blur'],
               }],
               skName : [{
                   required: true,
                   message: '',
                   trigger: ['input','blur'],
               }],
               userId : [{
                   required: true,
                   message: '',
                   trigger: ['input','blur'],
               }],
               expire : [{
                   required: true,
                   message: '',
                   trigger: ['input','blur'],
               }],
               amount : [{
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
      const res = await findSecretKey({ ID: route.query.id })
      if (res.code === 0) {
        formData.value = res.data.resecretKey
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
               res = await createSecretKey(formData.value)
               break
             case 'update':
               res = await updateSecretKey(formData.value)
               break
             default:
               res = await createSecretKey(formData.value)
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
