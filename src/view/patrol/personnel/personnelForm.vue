<template>
  <div>
    <div class="gva-form-box">
      <el-form :model="formData" ref="elFormRef" label-position="right" :rules="rule" label-width="80px">
        <el-form-item label="人员URL:" prop="personUrl">
          <el-input v-model="formData.personUrl" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="特长:" prop="specialty">
          <el-input v-model="formData.specialty" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="单位编号:" prop="unitNo">
          <el-input v-model="formData.unitNo" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="民族:" prop="nation">
          <el-input v-model="formData.nation" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="单位名称:" prop="companyName">
          <el-input v-model="formData.companyName" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="是否重点人员:" prop="isSecurityFocus">
          <el-input v-model.number="formData.isSecurityFocus" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="房间ID:" prop="roomId">
          <el-input v-model="formData.roomId" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="楼层ID:" prop="floorId">
          <el-input v-model="formData.floorId" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="建筑物编号:" prop="buildingNo">
          <el-input v-model="formData.buildingNo" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="联系方式:" prop="contact">
          <el-input v-model="formData.contact" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="自定义地址:" prop="userDefinedAddress">
          <el-input v-model="formData.userDefinedAddress" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="房屋编号:" prop="houseNo">
          <el-input v-model="formData.houseNo" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="重点人员详情:" prop="securityFocusDetail">
          <el-input v-model="formData.securityFocusDetail" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="与户主关系:" prop="relationshipWithHouseHolder">
          <el-input v-model="formData.relationshipWithHouseHolder" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="特殊人员标记:" prop="specialPersonMark">
          <el-input v-model="formData.specialPersonMark" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="体格特征:" prop="bodyFeature">
          <el-input v-model="formData.bodyFeature" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="身高:" prop="height">
          <el-input v-model.number="formData.height" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="血型名称:" prop="bloodTypeName">
          <el-input v-model="formData.bloodTypeName" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="人员图片URL:" prop="pictureUrl">
          <el-input v-model="formData.pictureUrl" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="生日:" prop="birth">
          <el-input v-model="formData.birth" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="是否常住人口:" prop="isUsualResidence">
          <el-input v-model.number="formData.isUsualResidence" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="建筑物名称:" prop="buildingName">
          <el-input v-model="formData.buildingName" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="国籍:" prop="nationality">
          <el-input v-model="formData.nationality" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="身份证号:" prop="cardId">
          <el-input v-model="formData.cardId" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="认证过期时间:" prop="authExpireTime">
          <el-input v-model="formData.authExpireTime" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="楼层编号:" prop="floorNo">
          <el-input v-model="formData.floorNo" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="数据来源:" prop="dataSource">
          <el-input v-model.number="formData.dataSource" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="婚姻状况:" prop="maritalStatus">
          <el-input v-model="formData.maritalStatus" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="状态:" prop="status">
          <el-input v-model="formData.status" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="失败原因:" prop="failedReason">
          <el-input v-model="formData.failedReason" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="详细单位名称:" prop="detailedCompanyName">
          <el-input v-model="formData.detailedCompanyName" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="其他联系方式:" prop="otherContact">
          <el-input v-model="formData.otherContact" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="是否户主:" prop="isHouseHolder">
          <el-input v-model.number="formData.isHouseHolder" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="刑事记录详情:" prop="criminalRecordDetail">
          <el-input v-model="formData.criminalRecordDetail" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="户籍地详细地址:" prop="censusAddrDetailname">
          <el-input v-model="formData.censusAddrDetailname" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="血型:" prop="bloodType">
          <el-input v-model.number="formData.bloodType" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="区域ID:" prop="precinctId">
          <el-input v-model="formData.precinctId" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="录入人联系方式:" prop="inputerContact">
          <el-input v-model="formData.inputerContact" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="别名:" prop="aliasNames">
          <el-input v-model="formData.aliasNames" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="单位ID:" prop="unitId">
          <el-input v-model="formData.unitId" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="人员类型:" prop="personType">
          <el-input v-model="formData.personType" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="地址:" prop="address">
          <el-input v-model="formData.address" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="性别:" prop="sex">
          <el-input v-model.number="formData.sex" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="证件类型:" prop="cardType">
          <el-input v-model.number="formData.cardType" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="更新时间:" prop="updateTime">
          <el-input v-model="formData.updateTime" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="建筑物ID:" prop="buildingId">
          <el-input v-model="formData.buildingId" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="人员真实姓名:" prop="personName">
          <el-input v-model="formData.personName" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="居住关系:" prop="liveRelationShip">
          <el-input v-model="formData.liveRelationShip" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="是否有刑事记录:" prop="isCriminalRecord">
          <el-input v-model.number="formData.isCriminalRecord" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="创建时间:" prop="createTime">
          <el-input v-model="formData.createTime" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="文化程度:" prop="culture">
          <el-input v-model="formData.culture" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="不在注册地原因:" prop="notInRegisteredPlaceReason">
          <el-input v-model="formData.notInRegisteredPlaceReason" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="租赁时间:" prop="rentTime">
          <el-input v-model="formData.rentTime" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="老家名称来自哪里:" prop="originName">
          <el-input v-model="formData.originName" :clearable="true" placeholder="请输入" />
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
  name: 'Personnel'
}
</script>

<script setup>
import {
  createPersonnel,
  updatePersonnel,
  findPersonnel
} from '@/api/personnel'

// 自动获取字典
import { getDictFunc } from '@/utils/format'
import { useRoute, useRouter } from "vue-router"
import { ElMessage } from 'element-plus'
import { ref, reactive } from 'vue'
const route = useRoute()
const router = useRouter()

const type = ref('')
const formData = ref({
            personUrl: '',
            specialty: '',
            unitNo: '',
            nation: '',
            companyName: '',
            isSecurityFocus: 0,
            roomId: '',
            floorId: '',
            buildingNo: '',
            contact: '',
            userDefinedAddress: '',
            houseNo: '',
            securityFocusDetail: '',
            relationshipWithHouseHolder: '',
            specialPersonMark: '',
            bodyFeature: '',
            height: 0,
            bloodTypeName: '',
            pictureUrl: '',
            birth: '',
            isUsualResidence: 0,
            buildingName: '',
            nationality: '',
            cardId: '',
            authExpireTime: '',
            floorNo: '',
            dataSource: 0,
            maritalStatus: '',
            status: '',
            failedReason: '',
            detailedCompanyName: '',
            otherContact: '',
            isHouseHolder: 0,
            criminalRecordDetail: '',
            censusAddrDetailname: '',
            bloodType: 0,
            precinctId: '',
            inputerContact: '',
            aliasNames: '',
            unitId: '',
            personType: '',
            address: '',
            sex: 0,
            cardType: 0,
            updateTime: '',
            buildingId: '',
            personName: '',
            liveRelationShip: '',
            isCriminalRecord: 0,
            createTime: '',
            culture: '',
            notInRegisteredPlaceReason: '',
            rentTime: '',
            originName: '',
        })
// 验证规则
const rule = reactive({
})

const elFormRef = ref()

// 初始化方法
const init = async () => {
 // 建议通过url传参获取目标数据ID 调用 find方法进行查询数据操作 从而决定本页面是create还是update 以下为id作为url参数示例
    if (route.query.id) {
      const res = await findPersonnel({ ID: route.query.id })
      if (res.code === 0) {
        formData.value = res.data.repersonnel
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
               res = await createPersonnel(formData.value)
               break
             case 'update':
               res = await updatePersonnel(formData.value)
               break
             default:
               res = await createPersonnel(formData.value)
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
