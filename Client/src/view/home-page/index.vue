<template>
    <div>
      <Card>
        <h1 slot="title">供应链金融</h1>
        <p>这是一个供应链金融供应链解决方法</p>
      </Card>
    </div>
</template>

<script>
    import { getUserInfo } from '../../api/user.js'
    import axios from '@/libs/api.request'
    export default {
        name: "index",
        components:{

        },
        data:{

        },
        created() {
          this.getData();
        },
        methods:{
          getData(){
              axios.request({
                url: 'api/enterprise/list',
                method: 'get'
              }).then({
                
              })
          }
        }
    }
</script>

<style scoped>
  h1, p{
    text-align: center;
    color: black;
  }
</style>
