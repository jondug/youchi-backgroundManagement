<template>
  <div id="re">
    <div>注册</div>
    <input
      type="text"
      placeholder="账号"
      v-model="register.account"
      name=""
      id=""
    /><br />
    <!-- <input type="text" placeholder="电话" v-model="register.phone" name="" id="" /><br> -->
    <input
      type="password"
      placeholder="密码"
      v-model="register.passwd"
      name=""
      id=""
    /><br />
    <input
      type="password"
      placeholder="确认密码"
      v-model="register.apasswd"
      name=""
      id=""
    /><br />
    <input
      type="text"
      placeholder="昵称"
      v-model="register.nickname"
      name=""
      id=""
    /><br />
    <input
      type="text"
      placeholder="性别"
      v-model="register.sex"
      name=""
      id=""
    /><br />

    <!-- <input type="submit" placeholder="注册" @click="register()"> -->
    <button @click="register1()">注册</button>
    <button @click="l()">登录</button>
  </div>
</template>

<script>
export default {
  name: "re",
  data() {
    return {
      register: {
        account: "",
        phone: "",
        passwd: "",
        apasswd: "",
        nickname: "",
        sex: "",
      },
    };
  },
  methods: {
    l() {
      this.$router.push("/a_l");
    },
    register1() {
      if (this.register.passwd != this.register.apasswd) {
        alert("两次密码不一致");
        return;
      }
      // 发送 POST 请求
      this.axios({
        method: "post",
        url: "http://localhost:8081/admin/register",
        data: this.register,
      }).then(function (response) {
        console.log(response.data);
        if (response.data.code == -1) {
          alert(response.data.errorMsg);
        } else {
          alert(response.data.success);
        }
      });
    },
  },
};
</script>

<style>
#re {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>