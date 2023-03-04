<template>
    
    <div class="login-content-right">
        <el-form 
            :model="value" 
            :rules="rules" 
            ref="ruleFormRef"
        >
            <h2 class="login-content-right-title">
                {{ filterName(props.type) }}
             </h2>
            <el-form-item class="login-content-right-input" prop="email">
                <el-input
                    class="login-content-right-input-l"
                    v-model.trim="value.email"
                    placeholder="请输入您的邮箱地址"
                >
                    <template #prefix>
                        <img src="@/assets/login/login-user.svg" alt=""/>
                    </template>
                </el-input>
            </el-form-item>
            <Transition :duration="550" name="slide-up">
                <el-form-item 
                    v-if="props.type !== '2'"
                    class="login-content-right-input" 
                    prop="passWord"
                    :rules="[
                        { required: true, message: '请输入密码！', trigger: ['blur','change'] },
                        { required: true,min:8, message: '请输入大于8位数的密码！', trigger: ['blur','change'] },
                    ]"
                >
                    <el-input
                        class="login-content-right-input-l"
                        v-model.trim="value.passWord"
                        type="password"
                        placeholder="请输入您的密码"
                        show-password
                    >
                        <template #prefix>
                            <img src="@/assets/login/login-password.svg" alt="" color="red"/>
                        </template>
                    </el-input>
                </el-form-item>
            </Transition>
            
            <Transition :duration="550" name="slide-up">
                <el-form-item 
                    v-if="props.type === '1'"
                    prop="confirmPassword"
                    class="login-content-right-input" 
                    :rules="[
                        { required: true, message: '请输入二次密码！', trigger: ['blur','change'] },
                        { required: true, validator: checkPassWord, trigger: ['blur','change'] },
                    ]"
                >
                    <el-input
                        clearable
                        class="login-content-right-input-l"
                        v-model.trim="value.confirmPassword"
                        type="password"
                        placeholder="确认密码"
                        show-password
                    >
                        <template #prefix>
                            <img src="@/assets/login/login-password.svg" alt="" color="red"/>
                        </template>
                    </el-input>
                </el-form-item>
            </Transition>
        
            <el-form-item class="login-content-right-input login-content-right-c" prop="code">
                <el-input
                    class="login-content-right-input-l login-content-right-input-code"
                    v-model="value.code"
                    placeholder="请输入验证码"
                >
                    <template #prefix>
                        <img src="@/assets/login/login-code.svg" alt=""/>
                    </template>
                </el-input>
                <img class="login-content-right-c-img" data-v-55227a40="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPAAAABQBAMAAADVZ+VPAAAAElBMVEUAAAAFYllFopmI5dxUsagGY1qFNfeOAAAAAXRSTlMAQObYZgAAA6pJREFUeJzsWVmO1UAM7IIL2DdAnACJ+98NuWz3kv3Ny0uQJv5gJqOoy+Uub6GUUv6Ue+zn35uAjzKWT/uxYtCbgG9j/Ni3M+AWsYmoBjDkQg8MVjyvAfv9IlwoGRNOaRchK1QBoom5cBUwYLAKclft7vvzuPw3GFNqVwD75YI0nauzLx+u53B6LipHDPZFPpVaAUmmJm2i80+OL/KZzHJeCrbmSCNhm3aPqLga9TNxgxeMqjtgdyzhkefY6fMCzxTCO0t7EgOFOmMFxN46OdiIKCoZZ8gZ5xAVn3B6rPP2khKCsbtEwSE83KUsZTPzhuEzq1M9VinqfEBNs1KFLbIs8VDBqoPDuJ15gtqU7BfVdIKMJV9lQJC5tsi3UJO7jFFxUY9XQT24Z+w/LbFUl+5b9xiPXkbpSMZsjKWGkpRr3HnfWOmXaJeLlZD0XsYBlbEVjsYYLGT5ZK4xp2lT3Ek/2WaN7PkSVyjK3K2MRb2o1LfhI9mMMgQjoe16E4F2chTVlLEXkir4VNqUcdaAnvEG5zxR3QnxeWtkXOUc8UH6MJw7wy3blS5ujc7BkMlwZByVKxnnudgFkfVo81xreSFt9amjTBiXkFfflAfGy2E1dawyZueNyhDd3oXcMzapDMxH8mVNSNC1e4Z63mYmSNKaMOaIPWRn7wPWZbR2zyZhZ9z7P2eck0DHrIv61kA4F11gcHyHdBcWjMcCzrEE2gh0jDe7JQQLRYz6FXaBjopqO7ftURgZt/60EWhHLnOJkcZMNUyUKBBoBd+i06LabXY744GdrZO/tMLWVtOA8pKIvgsNG01N45VLHAn2yZczLIJAF4Xw01Jt2JWlb5c5PRwaxNRpRiuyXMqDG0ADpvJ0jFG7cnd4syD3yEaTzdcTRWe1sK5p4tviSKgix8/jI6/pEuZoIHViKbktNurAdH9gTjFAUpbyZJO1tF6J8asDug7os9VEsVpLaBD/8qRda6XmODU0nalyUAcft6/Clm6aJOBsM5sy8vbsRfut8X5U9cYu2o/0a9PeK6Y5kIbWdl706B6YIY8gy8KEuPSiSK1n8xHzZYv2I7txA+d8a92xwr5rUfr3132fFziJnkA4lm49sHQwx3Uc8N8y3/UPUPBvYGCQTtnQ/eKOWB27s+q8iX9cKiYHTocSLeQ94Fe/nYnmd6ELvyoXV4XbKRp7wWqbOCWrXrG444sD/dhjR+wuWT7/bWz26ybcH79vAr6N8WOPPfZ/2b8AAAD//xP3QstdzuyCAAAAAElFTkSuQmCC"/>
            </el-form-item>
        </el-form>

        <slot></slot>
    </div>
</template>
<script setup>
const props = defineProps({
    data:{
        default:{},
        type:Object
    },
    type:String
});

const emit = defineEmits(['update:data'])
const ruleFormRef = ref();

const value = reactive(props.data);
watch(value,(o,n)=>{
    emit('update:data',n);
})

const rules = reactive({
  code: [
    { required: true, message: '请输入验证码', trigger: ['blur','change'] },
  ],
  email: [
    { required: true, message: '请输入邮箱！', trigger: ['blur','change'] },
    { required: true, pattern:/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, message: '请输入正确的邮箱！', trigger: ['blur','change'] },
  ]
})

const submitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!', fields)
    }
  })
}

const filterName = (type)=>{
    switch (type) {
        case '0':
            return '登陆'
        case '1':
            return '注册'
        case '2':
            return '忘记密码'
        default:
            return '登陆'
    }
}

const clearRules = ()=>{
    ruleFormRef.value.resetFields();
}

const checkPassWord = (rule, v, callback)=>{
    if (v !== value.passWord) {
        callback(new Error("两次输入的密码不一致！"))
    } else {
        callback()
    }
}


defineExpose({
    clearRules,
})
</script>
<style scoped>
.login-content-right-title{
    font-size: 30px;
    margin-bottom: 30px;
    font-weight: 700;
}
.login-content-right-input{
    margin-bottom: 24px;
}
.login-content-right-input-l{
    height: 40px;
}
.login-content-right-input-l img{
    width: 16px;
}
.login-content-right-input-code{
    width: 60%;
}
.login-content-right-c{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    box-sizing: border-box;
}
.login-content-right-c-img{
    width: 120px;
    height: 40px;
    position: absolute;
    right: 0;
}
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.25s ease-out;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
</style>