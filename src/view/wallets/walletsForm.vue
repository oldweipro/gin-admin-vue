<template>
  <div>
    <div class="gva-form-box">
      <el-form :model="formData" ref="elFormRef" label-position="right" :rules="rule" label-width="80px">
        <el-form-item label="用户id:" prop="userId">
          <el-input v-model.number="formData.userId" :clearable="false" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="钱包名称:" prop="walletName">
          <el-input v-model="formData.walletName" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="余额:" prop="balance">
          <el-input v-model.number="formData.balance" :clearable="true" placeholder="请输入" />
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
  name: 'Wallets'
}
</script>

<script setup>
import {
  createWallets,
  updateWallets,
  findWallets
} from '@/api/wallets'

// 自动获取字典
import { getDictFunc } from '@/utils/format'
import { useRoute, useRouter } from "vue-router"
import { ElMessage } from 'element-plus'
import { ref, reactive } from 'vue'
const route = useRoute()
const router = useRouter()

const type = ref('')
const formData = ref({
            userId: 0,
            walletName: '',
            balance: 0,
        })
// 验证规则
const rule = reactive({
               userId : [{
                   required: true,
                   message: '用户id不能为空',
                   trigger: ['input','blur'],
               }],
})

const elFormRef = ref()

// 初始化方法
const init = async () => {
 // 建议通过url传参获取目标数据id 调用 find方法进行查询数据操作 从而决定本页面是create还是update 以下为id作为url参数示例
    if (route.query.id) {
      const res = await findWallets({ id: route.query.id })
      if (res.code === 0) {
        formData.value = res.data.rewallets
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
               res = await createWallets(formData.value)
               break
             case 'update':
               res = await updateWallets(formData.value)
               break
             default:
               res = await createWallets(formData.value)
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
