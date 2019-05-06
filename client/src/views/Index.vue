<template>
  <div>
    <router-view/>
    <TabBar :data='tabBarData'/>
  </div>
</template>

<script>
import TabBar from "../components/TabBar";

export default {
  name: "Index",
  components: {
    TabBar,
  },
  data(){
    return{
      tabBarData:[
        {title:'微信',icon:'comments',path:'/chat'},
        {title:'通讯录',icon:'address-book',path:'/contact'},
        {title:'发现',icon:'compass',path:'/discover'},
        {title:'我的',icon:'user',path:'/me'},
      ]
    }
  }
};
</script>
