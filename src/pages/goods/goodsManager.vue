<template>
  <div style="width: 80%; height: 80%">
    <el-tabs v-model="activeName" type="border-card">
      <el-tab-pane label="菜单管理" name="first" style="width: 100%">
        <el-table :data="tableData" style="width: 100%" max-height="400">
          <el-table-column prop="id" label="编号" width="50"> </el-table-column>
          <el-table-column prop="name" label="姓名" width="180">
          </el-table-column>
          <el-table-column prop="cover" label="图片" width="180">
            <template slot-scope="scope">
              <el-image
                style="width: 150px; hight: auto"
                :preview-src-list="['http://localhost:8888/' + scope.row.cover]"
                :src="'http://localhost:8888/' + scope.row.cover"
                alt=""
                slot="error"
              >
                <div slot="error" class="image-slot">
                  <!-- <p>图片加载失败</p> -->
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
            </template>
          </el-table-column>
          <el-table-column prop="inventory" label="库存" width="180">
          </el-table-column>
          <el-table-column prop="price" label="价格"> </el-table-column>
          <el-table-column fixed="right" label="操作" width="120">
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="deleteRow(scope.$index, tableData)"
                type="text"
                size="small"
              >
                移除
              </el-button>
              <el-button
                @click.native.prevent="modifyeRow(scope.$index, tableData)"
                type="text"
                size="small"
              >
                修改
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>

      <el-tab-pane label="添加菜品" name="second">
        <!-- <el-card class="box-card"> -->
        <el-form
          :model="ruleForm"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
          style="width: 80%"
        >
          <el-form-item label="菜名" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="配料" prop="introduce">
            <el-input v-model="ruleForm.introduce"></el-input>
          </el-form-item>
          <el-form-item label="类别" prop="dishesClassifyId">
            <el-select
              v-model="ruleForm.dishesClassifyId"
              placeholder="请选择类别"
            >
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="设置库存" prop="inventory">
            <div class="block">
              <el-slider
                :max="max"
                @input="input(ruleForm.inventory)"
                v-model="ruleForm.inventory"
                
              >
              </el-slider>
              <el-input-number v-model="ruleForm.inventory" @focus="handleChange" :min="0" :max="max"></el-input-number>
            </div>
          </el-form-item>
          <el-form-item label="设置价格" prop="price">
            <el-input-number
              v-model="ruleForm.price"
              :precision="2"
              :step="1"
              :min=0
              :max="Infinity"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="设置折扣" prop="discount">
            <el-input-number
              v-model="ruleForm.discount"
              :precision="1"
              :step="0.1"
              :max="1"
              :mix="0.1"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="上传图片" prop="cover">
            <el-upload
              action="http://localhost:8888/goods/upload"
              list-type="picture-card"
              class="upload-demo"
              ref="upload"
              :on-success="submitForm"
              :file-list="fileList"
              :limit="1"
              :auto-upload="false"
              :on-exceed="handleExceed"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog >
              <img width="100%" :src="dialogImageUrl" alt="" />
            </el-dialog>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm()">立即创建</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
        <!-- </el-card> -->
      </el-tab-pane>
      <el-tab-pane label="设置分类" name="third">
        <el-button type="primary" @click="addClassify">添加分类</el-button>
        <el-table :data="goodsClassifyList" style="width: 100%">
          <el-table-column prop="id" label="编号" width="180">
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="180">
          </el-table-column>
          <el-table-column prop="storeName" label="店铺名"> </el-table-column>
          <el-table-column fixed="right" label="操作" width="120">
            <template slot-scope="scope">
              <el-button
               
                type="text"
                size="small"
              >
                移除
              </el-button>
              <el-button
              
                type="text"
                size="small"
              >
                修改
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>

      <el-tab-pane label="菜单上架" name="fore">菜单上架</el-tab-pane>
      <!-- <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane> -->
    </el-tabs>

    <!-- 添加分类弹窗 -->
    <el-dialog title="添加" :visible.sync="addClassifyVisible">
      <el-form :model="classifyGoods" label-width="200px">
        <!-- <el-form-item label="账号"> <el-input v-model="form.name" ></el-input></el-form-item> -->
        <el-form-item label="分类名">
          <el-input v-model="classifyGoods.name"></el-input>
        </el-form-item>
        <el-form-item label="选择店铺">
          <el-select
            v-model="classifyGoods.storeId"
            filterable
            placeholder="请选择"
          >
            <el-option
              v-for="item in myStores"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="enterAdd()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // rules:"",
      myStores: [],
      classifyGoods: [],
      addClassifyVisible: false,
      goodsClassifyList: [],
      srcList: [],
      dialogImageUrl: [],
      tableData: [],
      fileList: [],
      max: 100,
      activeName: "first",
      ruleForm: {
        cover: "",
        dishesClassifyId: 0,
        inventory: 0,
        name: "",
        price: 0,
        storeId: 0,
        discount: 1.0, //折扣
        introduce: "", //配料
        merchantId:localStorage.getItem("merchantId")
      },
    };
  },
  created: function () {
    this.listGoods();
  },
  methods: {
    enterAdd() {
      var that = this;
      this.axios({
        method: "post",
        url: "/goodsClassify/add",
        data: that.classifyGoods,
        headers: { token: localStorage.getItem("merchantToken") },
      }).then(function (response) {
        console.log(response.data.data);
        that.classifyGoods = {};
        that.addClassifyVisible = false;
        that.listGoods();
      });
    },
    addClassify() {
      this.addClassifyVisible = true;
    },
    listGoods() {
      var that = this;
      this.axios({
        method: "get",
        url: "/goods/allGoods",
        // data: {token},
        headers: { token: localStorage.getItem("merchantToken") },
      }).then(function (response) {
        console.log(response.data);
        that.tableData = response.data.data;
      });
      this.axios({
        method: "get",
        url: "/goodsClassify/allClassifyByToken?storeId=1",
        // data: {storeId:""}},
        headers: { token: localStorage.getItem("merchantToken") },
      }).then(function (response) {
        console.log(response.data.data);
        that.goodsClassifyList = response.data.data;
      });
      this.axios({
        method: "get",
        url: "/store/findAllByMerchantId",
        // data: {storeId:""}},
        headers: { token: localStorage.getItem("merchantToken") },
      })
        .then(function (response) {
          console.log(response.data);
          that.myStores = response.data.data;
          // that.totalCount = response.data.data.total;
          // that.tableData = response.data.data.records;
          // that.totalCount = response.data.data.total;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    handleExceed() {
      alert("上传文件超出数量");
    },
    input(val) {
      var temp = this.max;
      if (val >= this.max) {
        this.max += 1;
      } else if (val <= temp) {
        this.max = 100;
      }
    },
    handleChange(currentValue){
       console.log(currentValue)
      var temp = this.max;
      if (currentValue >= this.max) {
         this.max += currentValue+1;
      } else if (currentValue <= temp) {
        // this.max = 100;
      }

    },
    //添加商品
    submitForm(response, file, fileList) {
      this.$refs.upload.submit();
      this.ruleForm.cover = response.data;
      this.fileList = [];
      var that = this;
      this.axios({
        method: "post",
        url: "/goods/add",
        data: that.ruleForm,
        // headers: { token: token },
      }).then(function (response) {
        console.log(response.data);
        that.ruleForm = {};
        // alert(response.data.data);
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
       this.fileList = [];
    },
  },
};
</script>

<style>
/* .a{
  height: ;
} */
</style>