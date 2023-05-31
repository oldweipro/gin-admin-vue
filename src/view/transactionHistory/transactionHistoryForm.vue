<template>
  <div>
    <div class="gva-form-box">
      <el-form :model="formData" ref="elFormRef" label-position="right" :rules="rule" label-width="80px">
        <el-form-item label="用户ID:" prop="userId">
          <el-input v-model.number="formData.userId" :clearable="false" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="钱包ID:" prop="walletId">
          <el-input v-model.number="formData.walletId" :clearable="false" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="交易类型:" prop="typeEnum">
        <el-select v-model="formData.typeEnum" placeholder="请选择" style="width:100%" :clearable="false">
          <el-option v-for="item in ['deposit', 'withdrawal', 'transfer']" :key="item" :label="item" :value="item" />
        </el-select>
        </el-form-item>
        <el-form-item label="交易金额:" prop="amount">
          <el-input v-model.number="formData.amount" :clearable="false" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="商品ID:" prop="productId">
          <el-input v-model.number="formData.productId" :clearable="false" placeholder="请输入" />
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
  name: 'TransactionHistory'
}
</script>

<script setup>
import {
  createTransactionHistory,
  updateTransactionHistory,
  findTransactionHistory
} from '@/api/transactionHistory'

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
            walletId: 0,
            amount: 0,
            productId: 0,
        })
// 验证规则
const rule = reactive({
               userId : [{
                   required: true,
                   message: '',
                   trigger: ['input','blur'],
               }],
               walletId : [{
                   required: true,
                   message: '',
                   trigger: ['input','blur'],
               }],
               typeEnum : [{
                   required: true,
                   message: '',
                   trigger: ['input','blur'],
               }],
               amount : [{
                   required: true,
                   message: '',
                   trigger: ['input','blur'],
               }],
               productId : [{
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
      const res = await findTransactionHistory({ ID: route.query.id })
      if (res.code === 0) {
        formData.value = res.data.retransactionHistory
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
               res = await createTransactionHistory(formData.value)
               break
             case 'update':
               res = await updateTransactionHistory(formData.value)
               break
             default:
               res = await createTransactionHistory(formData.value)
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
