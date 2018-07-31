<template> 
  <el-container>
    <el-main>
      <el-row :gutter="12">
  <el-col :span="8" v-for="(item, index) in total" :key="index">
    <el-card :body-style="{ padding: '20px' }" shadow="hover">
     <span class="total-count">{{item.count}}</span>
      <div style="padding-top: 15px;">
        <span>{{item.name}}</span>
      </div>
    </el-card>
  </el-col>
</el-row>
    </el-main>
  </el-container>
</template>
<style scoped lang="scss">
.total-count{
  color: red;
  font-size: 24px;

}
.el-container {
  margin: 20px;
}
.time {
  font-size: 13px;
  color: #999;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
</style>

<script>
export default {
  data() {
    return {
      total: [
        { count: "8889", name: "总用户量" },
        { count: "8889", name: "转出交易笔数" },
        { count: "66666", name: "昨日新增用户" }
      ]
    };
  },
  components: {}
};
</script>