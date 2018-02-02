<template>
    <div class="login-wrap">
        <div class="ms-title">后台管理系统</div>
        <div class="ms-login">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" placeholder="username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="password" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')" :loading="logining">登录</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
    import { requestLogin } from '../../api/api';
    export default {
        data: function(){
            return {
                logining: false,
                ruleForm: {
                    username: 'admin',
                    password: '123456'
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                },
                checked: true
            }
        },
        methods: {
            submitForm(formName) {
                const self = this;
                self.$refs[formName].validate((valid) => {
                    if (valid) {
                        //localStorage.setItem('ms_username',self.ruleForm.username);
                        //self.$router.push('/basetable');
                        this.logining = true;
                        var loginParams = { username: self.ruleForm.username, password: self.ruleForm.password };
                        requestLogin(loginParams)
                        //this.$store.dispatch('login', loginParams)
                        .then(data => {
                            this.logining = false;
                            let { msg, code, user } = data;
                            if (code !== 200) {
                                this.$message({
                                message: msg,
                                type: 'error'
                                });
                            } else {
                                localStorage.setItem('user', JSON.stringify(user));
                                this.$router.push({ path: '/basetable' });
                            }
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
    }
    .ms-title{
        position: absolute;
        top:50%;
        width:100%;
        margin-top: -230px;
        text-align: center;
        font-size:30px;
        color: #fff;

    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:300px;
        height:180px;
        margin:-150px 0 0 -190px;
        padding:40px;
        border-radius: 5px;
        background: #fff;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
</style>