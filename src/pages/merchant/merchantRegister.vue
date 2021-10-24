<template>
  <div>
    <div style="width: 400px; margin: 30px auto; text-align: center">
      <h2>商家注册</h2>
      <el-form
        :model="ruleForm"
        status-icon
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="账号" prop="account">
          <el-input
            type="text"
            v-model="ruleForm.account"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="nickname">
          <el-input
            type="text"
            v-model="ruleForm.nickname"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="passwd">
          <el-input
            type="password"
            v-model="ruleForm.passwd"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPasswd">
          <el-input
            type="password"
            v-model="ruleForm.checkPasswd"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input
            v-model="ruleForm.phone"
            type="text"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        account: "",
        nickname: "",
        passwd: "",
        checkPasswd: "",
        phone: "",
      },
    };
  },
  methods: {
    submitForm() {
      console.log(this.ruleForm);
      if (this.ruleForm.passwd != this.ruleForm.checkPasswd) {
        this.$alert("密码不一致", "错误", {
          confirmButtonText: "确定",
        });
        return;
      }
      var that = this;
      this.axios({
        method: "post",
        url: "/merchant/register",
        data: that.ruleForm,
      }).then(function (response) {
        console.log(response.data);
        // alert(response.data.data.errorMsg)
        if ((response.data.code == -1)) {
          that.$alert(response.data.errorMsg, "错误", {
            confirmButtonText: "确定",
          });
        } else {
        //   alert(response.data.data);
          that.$router.push("/login");
        }
      });
    },
    resetForm() {
      this.ruleForm = {};
    },
  },
};
</script>

<style>
</style>