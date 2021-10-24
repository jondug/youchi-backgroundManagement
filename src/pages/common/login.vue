<template>
  <div id="adminLogin">
    <div class="loginForm">
      <h4>登录</h4>
      <el-form
        :model="ruleForm"
        status-icon
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="账号" prop="account">
          <el-input
            clearable
            v-model.number="ruleForm.account"
            label-width="40px"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input
            clearable
            type="password"
            v-model="ruleForm.passwd"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input
            clearable
            type="password"
            v-model="ruleForm.checkPass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <div style="margin-bottom: 20px">
          <el-radio v-model="radio" label="1">管理员登录</el-radio>
          <el-radio v-model="radio" label="2">商家登录</el-radio>
        </div>
        <!-- <el-form-item > -->
        <div style="display: flex; justify-content: space-around">
          <el-button type="primary" @click="toLogin">登录</el-button>
          <el-button type="primary" @click="toRegister">注册</el-button>
        </div>

        <!-- <el-button type="primary">提交</el-button> -->
        <!-- <el-button >重置</el-button> -->
        <!-- </el-form-item> -->
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "adminLogin",
  data() {
    return {
      radio: "1",
      ruleForm: {
        passwd: "",
        checkPass: "",
        account: "",
      },
    };
  },
  methods: {
    toLogin() {
      if (this.ruleForm.passwd != this.ruleForm.checkPass) {
        this.$alert("密码不一致", "错误", {
          confirmButtonText: "确定",
        });
        return;
      }
      var url = "";
      var c = this.radio;
      if (c == "1") {
        url = "admin/";
      } else if (c == "2") {
        url = "merchant/";
      }
      var that = this;
      this.axios({
        method: "post",
        url: url + "login",
        data: { account: that.ruleForm.account, passwd: that.ruleForm.passwd },
      }).then(function (response) {
        console.log(response.data.data);
        if (response.data.code == -1) {
          return;
        }
        if (c == "1") {
          that.$router.push("/adminMain/storeManager");
          window.location.reload();
        } else {
          that.info(response.data.data);
          localStorage.setItem("merchantToken", response.data.data);
          // console.log(localStorage.getItem("merchantName"))
          that.$router.push("/merchantMain/storeManager");
          window.location.reload();
        }
      });
    },
    info(token) {
      var that = this;
      this.axios({
        method: "post",
        url: "merchant/merchantInfo",
        headers: { token: token },
      }).then(function (response) {
        console.log(response.data);
        localStorage.setItem("merchantId", response.data.data.id);
        localStorage.setItem("merchantName", response.data.data.nickname);
        that.common.name =  response.data.data.nickname
      });
    },
    toRegister() {
      this.$router.push("/merchantRegister");
    },
  },
};
</script>

<style>
#adminLogin {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.loginForm {
  margin: 0 auto;
  width: 400px;
  /* border: #2c3e50 solid 1px; */
}
</style>