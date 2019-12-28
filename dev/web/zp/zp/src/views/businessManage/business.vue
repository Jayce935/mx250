/*
 * @Author: liuyr 
 * 商家列表页面
 * @Date: 2019-12-23 17:11:53 
 * @Last Modified by: 0tt0
 * @Last Modified time: 2019-12-27 11:34:28
 */
<template>
  <div id="businessList">
    <div>
      <template>
      <el-select @change="provinceChange" v-model="province" clearable placeholder="省份" size="mini">
        <el-option
          v-for="item in provinceData"
          :key="item.id"
          :label="item.name"
          :value="item.name">
        </el-option>
      </el-select>
      </template><template>
        <el-select @change="cityChange" v-model="city" clearable placeholder="城市" size="mini">
          <el-option
            v-for="item in cityData"
            :key="item.id"
            :label="item.name"
            :value="item.name">
          </el-option>
        </el-select>
      </template><template>
        <!-- 因为item遍历出来的都是name所以没必要,value值中返回值传给v-model -->
        <el-select @change="industryChange" v-model="industry" clearable placeholder="行业" size="mini">
          <el-option
            v-for="item in industryData"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      </template><template>
        <el-select @change="scaleChange" v-model="scale" clearable placeholder="规模" size="mini">
          <el-option
            v-for="item in scaleData"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      </template>
    </div>
    <div id="tableDIv">
      <template>
        <el-table
          ref="multipleTable"
          :data="business"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="SelectionChange">
          <el-table-column
            align="center"
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            align="center"
            prop="name"
            label="企业名称">
            <!-- <template slot-scope="scope">{{ scope.row.date }}</template> -->
          </el-table-column>
          <el-table-column
            align="center"
            prop="contactName"
            label="联系人">
          </el-table-column>
          <el-table-column
            align="center"
            prop="industry"
            label="行业">
          </el-table-column>
          <el-table-column
          align="center"
          label="所在地">
          <template slot-scope="scope">{{scope.row.province}}-{{scope.row.city}}</template>
          </el-table-column>
          <el-table-column
          align="center"
          label="详情">
          <template slot-scope="scope">
            <el-button @click="toSee(scope.row)" type="text" size="small">查看</el-button>
          </template>
          </el-table-column>
           <el-table-column
           align="center"
           label="操作">
          <template slot-scope="scope">
            <el-button @click="toEdit(scope.row)" type="text" size="small">编辑</el-button>
            <el-button type="text" size="small" @click="toDelete(scope.row.id)">删除</el-button>
          </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
    <div class="footerDiv">
      <div class="btnDiv">
        <el-button type="danger" size="mini" plain>批量删除</el-button>
      </div>
      <div class="pageDiv">
        <el-pagination
          @current-change="currentChange"
          :current-page.sync="currentPage"
          :page-size="pageSize"
          background
          layout="prev, pager, next"
          :total="businessData.length">
        </el-pagination>
      </div>
    </div>

    <el-dialog
      title="currentBus.name"
      :visible.sync="seeVisible">
      <span>这是一段信息</span>
      {{currentBus}}
      <div class="seeDiv">
        <span>行业类型：</span>
        {{currentBus.industry}}
      </div>
      <div class="seeDiv">
        <span>成立时间：</span>
        {{currentBus.establishedTime}}
      </div>
      <div class="seeDiv">
        <span>注册资本：</span>
        {{currentBus.registeredCapital}}
      </div>
      <div class="seeDiv">
        <span>公司规模：</span>
        {{currentBus.scale}}
      </div>
      <div class="descDiv">&nbsp;&nbsp;
        {{currentBus.description}}
      </div>
      <div class="imgDiv">
        <!-- 一个新打开、未命名的窗口中载入目标文档 -->
        <a href="currentBus.businessLicense" target="_blank">
          <img src="currentBus.businessLicense" alt="" width="200px" height="150px">
        </a>
      </div>
    </el-dialog>

    <el-dialog title="修改商家信息" :visible.sync="editVisible" width="60%" :before-close="beforeClose" >
      {{currentBus}}
      <el-form :model="currentBus" :rules="rules" ref="ruleForm">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item prop="name" label="公司名称" :label-width="formLabelWidth">
              <el-input v-model="currentBus.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="industry" label="所属行业" :label-width="formLabelWidth">
              <el-input v-model="currentBus.industry"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item prop="scale" label="公司规模" :label-width="formLabelWidth">
              <el-input v-model="currentBus.scale"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所在城市" :label-width="formLabelWidth" required>
              <el-row>
                <el-col :span="12">
                  <el-form-item prop="province">
                      <el-select v-model="currentBus.province" placeholder="省份" @change="dialogProChange">
                        <el-option
                          v-for="item in provinceData"
                          :key="item.id"
                          :label="item.name"
                          :value="item.id">
                        </el-option>
                      </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item prop="city">
                    <el-select v-model="currentBus.city" placeholder="城市">
                      <el-option
                        v-for="item in provinceCityData"
                        :key="item.id"
                        :label="item.name"
                        :value="item.name">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item prop="contactName" label="联系人" :label-width="formLabelWidth">
              <el-input v-model="currentBus.contactName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="contactPhone" label="联系电话" :label-width="formLabelWidth">
              <el-input v-model="currentBus.contactPhone"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item prop="location" label="详细地址" :label-width="formLabelWidth">
              <el-input type="textarea" :rows="4" v-model="currentBus.location"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="description" label="公司简介" :label-width="formLabelWidth">
              <el-input  type="textarea" :rows="4" v-model="currentBus.description"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        
        
        <!-- <el-form-item label="活动区域" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="toCancel('ruleForm')">取 消</el-button>
        <el-button type="primary" @click="toSave('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import {findAllProvince} from '@/api/province.js'
import {findAllCity,findCityByProvince} from '@/api/city.js'
import {findAllBusiness,findBusinessByProvince,findBusinessByCity,findBusinessByScale,findBusinessByIndustry,findEmploymentByTitle,saveOrUpdateBusiness} from '@/api/business.js'
import config from "@/utils/config.js";
export default {
  data() {
    return {
      // 当前查看或者修改的对象
      currentBus:{},
      // 默认隐藏
      seeVisible:false,
      province:'',
      city:'',
      industry:'',
      scale:'',
      provinceData:[],
      cityData:[],
      industryData:[],
      scaleData:[],
      // 商家数组
      businessData:[],
      // 商家列表,表格中显示的数据
      businessList:[],
      // 当前页数
      currentPage:1,
      // 每页条数
      pageSize:config.pageSize,
      //修改模态框显示
      editVisible:false,
      // 修改模态框标题名称所占宽度
      formLabelWidth:"80px",
      // 省份对应的城市信息
      provinceCityData:[],
      rules: {
          name: [
            { required: true, message: '请输入公司名称', trigger: 'blur' }
          ],
          industry: [
            { required: true, message: '请输入行业类型', trigger: 'blur' }
          ],
          scale:[
            { required: true, message: '请输入公司规模', trigger: 'blur' }
          ],
          contactName:[
            { required: true, message: '请输入联系人', trigger: 'blur' }
          ],
          contactPhone:[
            { required: true, message: '请输入联系电话', trigger: 'blur' }
          ],
          location:[
            { required: true, message: '请输入详细地址', trigger: 'blur' }
          ],
          description:[
            { required: true, message: '请输入公司简介', trigger: 'blur' }
          ],
          province: [
            { required: true, message: '请选择省份', trigger: 'change' }
          ],
          city: [
            { required: true, message: '请选择城市', trigger: 'change' }
          ],
        }
      
    };
  },
  computed: {
    
    business(){
      let temp = [...this.businessData];
      console.log(temp);
      let page = this.currentPage;
      let pageSize = config.pageSize;
      return temp.slice((page-1)*pageSize,pageSize*page);
    }
  },
  methods: {
    beforeClose(){
      this.$refs["ruleForm"].resetFields();
      this.editVisible = false;
    },
    // 取消
    toCancel(formName){
      // 重置表单验证
      this.$refs[formName].resetFields();
      this.editVisible = false;
    },
    // 保存
    toSave(formName){
      this.$refs[formName].validate(async (valid) => {
          if (valid) {
            // 通过验证
            let province = this.currentBus.province;
            // 如果省份发生更改
            if(+province){
              // 将省份id处理为省份名字,过滤省份数组
              let result = this.provinceData.filter((item)=>{
                return item.id === +province;
              })[0];
              this.currentBus.province = result.name;
            }
            try {
              let res = await saveOrUpdateBusiness(this.currentBus);
              if(res.status === 200){
                this.findAllBusiness();
                this.editVisible = false;
                config.successMsg(this,'修改成功！');
              }
            } catch (error) {
              config.errorMsg(this,'修改失败！');
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      
    },
    // 模态框省份发生改变
    async dialogProChange(val){
      // 重置城市下拉列表
      this.currentBus.city = "";
      // 通过省份id获取城市
      try {
        let res = await findCityByProvince({provinceId:val});
        this.provinceCityData = res.data;
      } catch (error) {
        config.errorMsg(this,'通过省份查找城市失败');
      }
    },
    currentChange(page){
      this.currentPage = page;
    },
    async scaleChange(val){
      this.currentPage = 1;
      this.province = "";
      this.city = "";
      this.industry = "";
       if(val){
        // val 是option的value值
        try {
          let res = await findBusinessByScale({scale:val});
          this.businessData = res.data;
        } catch (error) {
          console.errorMsg(this,'查找错误');
        }
       }else{
         this.findAllBusiness();
       }
      
    },
    async industryChange(val){
      this.currentPage = 1;
      this.province = "";
      this.city = "";
      this.scale = "";
       if(val){
        // val 是option的value值
        try {
          let res = await findBusinessByIndustry({industry:val});
          this.businessData = res.data;
        } catch (error) {
          console.errorMsg(this,'查找错误');
        }
       }else{
         this.findAllBusiness();
       }
      
    },
    async cityChange(val){
      this.currentPage = 1;
      this.province = "";
      this.industry = "";
      this.scale = "";
       if(val){
        // val 是option的value值
        try {
          let res = await findBusinessByCity({city:val});
          this.businessData = res.data;
        } catch (error) {
          console.errorMsg(this,'查找错误');
        }
       }else{
         this.findAllBusiness();
       }
      
    },
     async provinceChange(val){
       this.currentPage = 1;
       this.industry = "";
       this.city = "";
       this.scale = "";
       if(val){
        // val 是option的value值
        try {
          let res = await findBusinessByProvince({province:val});
          this.businessData = res.data;
        } catch (error) {
          console.errorMsg(this,'查找错误');
        }
       }else{
         this.findAllBusiness();
       }
    },
    toSee(row){
      // 如果不加...那就是引用传递，也就是值改row也改
      this.currentBus = {...row};
      this.seeVisible = true;
    },
    toEdit(row) {
      this.currentBus = {...row};
      this.editVisible = true;
    },
    toDelete(id){
      alert('删除');
    },
    // 查找所以的省份信息
    async findAllPro(){
      try {
        let res = await findAllProvince();
        this.provinceData = res.data;
      } catch (error) {
        console.errorMsg(this,'查找错误');
      }
    },
    // 查找所有城市信息
    async findAllCity(){
      try {
        let res = await findAllCity();
        this.cityData = res.data;
      } catch (error) {
        console.errorMsg(this,'查找错误');
      }
    },
    // 查找所以商家信息
    async findAllBusiness(){
      try {
        let res = await findAllBusiness();
        this.businessData = res.data;
        this.currentPage = 1;
        let industryArr = res.data.map((item)=>{
          // map映射
          return item.industry;
        });
        // 去重
        this.industryData = [...new Set (industryArr)];

        this.businessData = res.data;
        let scaleArr = res.data.map((item)=>{
          // map映射
          return item.scale;
        });
        this.scaleData = [...new Set (scaleArr)];
      } catch (error) {
        console.errorMsg(this,'查找错误')
      }
    },
    // 复选框选中
    SelectionChange(val){
      // val 就是选中的对象组成的数组
      console.log(val);
    },
  },
  created() {
    this.findAllPro();
    this.findAllCity();
    this.findAllBusiness();
  },
  mounted() {}
};
</script>
<style scoped>
</style>
<style lang="scss"  scoped>
  #tableDiv{
    margin-top: 10px;
  }
  .footerDiv{
    overflow: hidden;
    margin-top: 10px;
    .btnDiv{
      float: left;
    }
    .pageDiv{
      float: right;
    }
  }
  .seeDiv{
    font-weight: bold;
    border-bottom: 1px solid #ccc;
    line-height: 24px;
    span{
      color: #999;
    }
  }
  .descDiv{
    font-weight: bold;
    color: #777;
    font-size: 12px;
    line-height: 30px;
    padding: 10px 0;
  }
  .imgDiv{
    text-align: center；
  }
  .dialog-footer{
    text-align: center;
    margin-top: -20px;
  }
</style>
