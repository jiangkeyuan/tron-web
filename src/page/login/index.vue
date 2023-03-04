<template>
    <div class="login">
        <div class="login-header">
            <Logo></Logo>
            <GlobalIzation :isLogin="true"></GlobalIzation>
        </div>
        <div class="login-content">
            <img class="login-content-img" src="@/assets/login/login-content.png" alt=""/>
            <LoginForm v-model:data.sync="data" :type="type" ref="loginFormRef">
                <div class="login-content-login" v-if="type === '0'">
                    <el-button type="primary" color="#294aa5" class="login-content-button" @click="login">登录</el-button>
                    <div class="login-content-login-text">
                        <el-button type="primary" text class="login-content-login-text-button" @click="()=>changeType('1')">注册</el-button>
                        <el-button type="primary" text class="login-content-login-text-button" @click="()=>changeType('2')">忘记密码?</el-button>
                    </div>
                    <el-divider>或使用以下方式快速登录</el-divider>
                    <div class="login-content-other-login-text-button">
                        <img width="20" src="@//assets/login/tron-link-logo.svg"/>
                        <span>TronLink</span>
                    </div>
                </div>
                <div v-if="type === '1'">
                    <div>
                        <el-button type="primary" color="#294aa5" class="login-content-button">注册</el-button>
                    </div>
                    <div>
                        <el-button class="login-content-button" @click="()=>changeType('0')">返回</el-button>
                    </div>
                </div>
                <div v-if="type === '2'" class="login-content-login-text-other">
                    <div>
                        <el-button type="primary" color="#294aa5" class="login-content-button">发送验证码</el-button>
                    </div>
                    <div>
                        <el-button class="login-content-button" @click="()=>changeType('0')">返回</el-button>
                    </div>
                </div>
            </LoginForm>
        </div>
    </div>
</template>
<script setup>
    import Logo from "@/components/logo.vue";
    import GlobalIzation from "@/components/GlobalIzation.vue";
    import LoginForm from "./components/login-form.vue";
    const data = reactive({
        eamil:"",
        passWord:"",
        code:""
    })

    let type = ref('0');// 0是登陆 1 是注册 2 是忘记密码
    let loginFormRef = ref();

    const login = ()=>{
        console.log(data);
    }
    const changeType = (t)=>{
        Object.keys(data).map(v=>{
            data[v] = '';
        })
        clearRules();
        type.value = t;
    }

    const clearRules = ()=>{
        loginFormRef.value.clearRules();
    }
</script>
<style scoped>
.login{
    width: 100vw;
    height: 100vh;
    background-image:url("../../assets/login/login-background.png");
    background-size: 100px 80px;
    background-repeat: repeat;
    position: relative;
}
.login-header{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 20px 70px;
}
.login-content{
    margin: 0 auto;
    width: 930px;
    max-width: 75%;
    box-sizing: border-box;
    height: 520px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    display: flex;
    flex-direction: row;
    box-shadow: 1px 1px 10px #c4cade;
    border-radius: 10px;
    overflow: hidden;
}
.login-content-img{
    width: 50%;
    height: 100%;
}
.login-content-right{
    width: 50%;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    box-sizing: border-box;
    padding: 30px;
}
.login-content-button{
    width: 100%;
    height: 40px;
    margin-bottom: 24px;
}
.login-content-login{
    width: 100%;
}
.login-content-login-text{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.login-content-login-text-button{
    font-size: 14px;
    font-variant: tabular-nums;
    line-height: 1.5715;
    list-style: none;
    color:#294aa5;
}
.login-content-other-login-text-button{
    width: 130px;
    height: 24px;
    border-radius: 8px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    font-weight: 400;
    cursor: pointer;
    color: #294aa5;
    margin: auto;
    border: 1px solid #294aa5;
    border-radius: 6px;
    padding: 5px 0;
}
.login-content-other-login-text-button img{
    margin-right: 0.3em;
}
.login-content-login-text-other{
    display: flex;
    flex-direction: column;
}
</style>