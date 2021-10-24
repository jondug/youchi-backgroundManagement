<template>
  <div style="width: 80%">
    <el-tabs type="border-card" style="width: 100%">
      <el-tab-pane label="我的店铺">
        <div v-for="(myStore, index) in myStores" :key="index">
          <template>
            <el-button type="warning" @click="modify(myStore)">修改</el-button>
          </template>
          <div style="display:flex">      
          <el-image
              style="margin: 20px 0;margin-right:10px;width:200px"
              :src="'http://localhost:8888/'+myStore.photo"
              :preview-src-list="myStore.photo"
            >
            </el-image>
          <el-descriptions

            title=""
            style="margin: 20px 0;width:80%"
            direction="vertical"
            :column="4"
            border
          >
            <el-descriptions-item label="店铺名">
              {{ myStore.name }}
            </el-descriptions-item>
            <el-descriptions-item label="公告">
              {{ myStore.intro }}
            </el-descriptions-item>
            <el-descriptions-item label="类型">
              {{ myStore.store_classify_name }}
            </el-descriptions-item>
            <el-descriptions-item label="固定号码">{{
              myStore.fixedTel
            }}</el-descriptions-item>
            <el-descriptions-item label="地址" :span="2">{{
              myStore.address
            }}</el-descriptions-item>
            <el-descriptions-item label="备注">
              <el-tag size="small">学校</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="注册时间">{{
              myStore.registration_time | dateFormat
            }}</el-descriptions-item>
          </el-descriptions>
          </div>
        </div>
        <!-- <div>
          <el-table :data="myStores" stripe style="width: 100%">
            <el-table-column prop="id" label="id" width="180">
            </el-table-column>
            <el-table-column prop="photo"  label="图片" width="180">
              <template slot-scope="scope">
              <img style="width:150px;hight:auto" :src="'http://localhost:8888/'+ scope.row.photo" alt="">
              </template>             
            </el-table-column>

            <el-table-column prop="name" label="店铺名" width="180">
            </el-table-column>

            <el-table-column prop="address" label="地址" width="180">
            </el-table-column>

            <el-table-column prop="intro" label="简介" width="180">
            </el-table-column>

            <el-table-column prop="store_classify_name" label="类型" width="180">
            </el-table-column>

            <el-table-column
              prop="registration_time"
              label="注册时间"
              width="180"
            >
            </el-table-column>

            <el-table-column label="修改" width="150">
              <template slot-scope="scope">
                <el-button type="warning" @click="modify(scope.row)"
                  >修改</el-button
                >
              </template>
            </el-table-column>

            <el-table-column width="350" label="删除">
              <template slot-scope="scope">
                <el-button
                  type="danger"
                  slot="reference"
                  @click="del(scope.row)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </div> -->

        <!-- 分页 -->
        <!-- <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="pageSizes"
            :page-size="PageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalCount"
          >
          </el-pagination>
        </div> -->
      </el-tab-pane>
      <!-- 添加店铺 -->
      <el-tab-pane label="添加店铺">
        <el-form
          :label-position="labelPosition"
          label-width="80px"
          :model="formLabelAlign"
        >
          <el-form-item label="店铺名">
            <el-input v-model="formLabelAlign.name"></el-input>
          </el-form-item>
          <el-form-item label="简介">
            <el-input v-model="formLabelAlign.intro"></el-input>
          </el-form-item>
          <el-form-item label="地址">
            <el-input v-model="formLabelAlign.address"></el-input>
          </el-form-item>
          <el-form-item label="店铺图片">
            <el-upload
              class="upload-demo"
              ref="upload"
              action="http://localhost:8888/store/upload"
              :on-success="addStore"
              :file-list="fileList"
              :limit="1"
              :auto-upload="false"
              :on-exceed="handleExceed"
              list-type="picture"
            >
              <el-button slot="trigger" size="small" type="primary"
                >选取文件</el-button
              >
              <div slot="tip" class="el-upload__tip">
                只能上传jpg/png文件，且不超过500kb
              </div>
            </el-upload>
          </el-form-item>
          <el-form-item label="分类">
            <el-select
              v-model="formLabelAlign.storeClassifyId"
              filterable
              placeholder="请选择"
            >
              <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="addStore()">添加</el-button>
      </el-tab-pane>
      <el-tab-pane label="修改店铺">修改店铺</el-tab-pane>
      <el-tab-pane label="删除店铺">删除店铺</el-tab-pane>
    </el-tabs>

    <!-- 修改店铺弹窗 -->
    <el-dialog title="修改" :visible.sync="modfiyStoreVisible">
      <el-form :model="form" label-width="200px">
        <!-- <el-form-item label="账号"> <el-input v-model="form.name" ></el-input></el-form-item> -->
        <el-form-item label="店名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="简介">
          <el-input v-model="form.intro"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
        <el-form-item label="分类">
          <el-select
            v-model="form.storeClassifyId"
            filterable
            placeholder="请选择"
          >
            <el-option
              v-for="item in options"
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
        <el-button type="primary" @click="enterModify()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fileList: [],
      form: {},
      modfiyStoreVisible: false,
      myStores: [],
      labelPosition: "right",
      formLabelAlign: {
        name: "",
        intro: "",
        address: "",
        photo: "",
        merchantId: localStorage.getItem("merchantId"),
        storeClassifyId: "",
      },
      options: [],
      // 总数据
      tableData: [],
      // 默认显示第几页
      currentPage: 1,
      // 总条数，根据接口获取数据长度(注意：这里不能为空)
      totalCount: 1,
      // 个数选择器（可修改）
      pageSizes: [1, 2, 3, 4],
      // 默认每页显示的条数（可修改）
      PageSize: 4,
    };
  },
  created: function () {
    this.listStore(this.PageSize, this.currentPage);
    this.listClassify();
  },
  filters: {
    dateFormat(val) {
      return val;
    },
  },
  methods: {
    handleExceed() {
      alert("上传文件超出数量");
    },
    // handleSuccess(response, file, fileL) {
    //   console.log(response);
    //   this.$refs.upload.clearFiles();
    //   return response.data
    // },
    // submitUpload() {
    //   this.$refs.upload.submit();
    //   // this.fileList = []
    // },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    modify(data) {
      console.log(data);
      this.form = data;
      this.modfiyStoreVisible = true;
      this.listClassify();
    },
    enterModify() {
      // this.form.
      var that = this;
      this.axios({
        method: "post",
        url: "/store/modifyStore",
        data: that.form,
      }).then(function (response) {
        console.log(response.data);
        that.modfiyStoreVisible = false;
        that.listStore(that.PageSize, that.currentPage);
      });
    },
    // 分页
    // 每页显示的条数
    handleSizeChange(val) {
      // 改变每页显示的条数
      this.PageSize = val;
      console.log(this.PageSize);
      // 点击每页显示的条数时，显示第一页
      this.listStore(val, 1);
      // 注意：在改变每页显示的条数时，要将页码显示到第一页
      this.currentPage = 1;
    },
    // 显示第几页
    handleCurrentChange(val) {
      // 改变默认的页数
      this.currentPage = val;
      // 切换页码时，要获取每页显示的条数
      this.listStore(this.PageSize, val);
    },
    listStore(s, n) {
      var that = this;
      this.axios
        .get("/store/allStore/" + s + "/" + n, {
          headers: { token: localStorage.getItem("merchantToken") },
        })
        .then(function (response) {
          console.log(response.data);
          that.myStores = response.data.data.records;
          that.totalCount = response.data.data.total;
          // that.tableData = response.data.data.records;
          // that.totalCount = response.data.data.total;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    listClassify() {
      var that = this;
      this.axios
        .get(
          "/storeClassify/allClassify/" + -1 + "/" + -1
          //   { headers: { token: that.common.token } }
        )
        .then(function (response) {
          that.options = response.data.data.records;
          console.log(that.options);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    del(data) {
      console.log(data);
    },
    addStore(response, file, fileL) {
      console.log(localStorage.getItem("merchantId"));
      var token = localStorage.getItem("merchantToken");
      this.$refs.upload.submit();
      this.formLabelAlign.photo = response.data;
      var that = this;
      this.fileList = [];
      this.axios({
        method: "post",
        url: "/store/addStore",
        data: that.formLabelAlign,
        headers: { token: token },
      }).then(function (response) {
        console.log(response.data);
        that.formLabelAlign = {};
        alert(response.data.data);
      });
    },
  },
};
</script>

<style>
.a{
  /* display: flex; */
}
</style>