<template>
  <div>
    <Card>
      <h1 slot="title">供应链金融</h1>
      <p>这是一个供应链金融供应链解决方法</p>
      <div v-if="unRegister">
        <p>您的公司/机构尚未登记</p>
        <Row>
          <Col span="10">
            <Button type="primary" style="width: 150px;" @click="openEnterpriseModal">
              注册成为公司
            </Button>
            <Button type="primary" style="width: 150px; margin-left: 20px;" @click="openThirdPartyModal">
              注册称为第三方机构
            </Button>
          </Col>
        </Row>
      </div>
      <div v-else>
        <p>欢迎，{{ userData.name }}</p>
      </div>
    </Card>

    <!--reigister enterprise emodal-->
    <Modal v-model="isEnterprise" @on-cancel="cancelModal" title="注册成为公司" width="800">
      <Form :model="registerForm" ref="registerForm" :rules="rules"
            :label-width="110">
        <Card>
          <Row>
            <Col span="11">
              <FormItem label="公司名称：" prop="name">
                <Input placeholder="请输入公司名称" clearable v-model="registerForm.name"></Input>
              </FormItem>
            </Col>
            <Col span="11">
              <FormItem label="现有资产：" prop="property">
                <Input placeholder="请输入公司资产数额" clearable v-model="registerForm.property"></Input>
              </FormItem>
            </Col>
          </Row>
        </Card>
      </Form>
      <!--自定义页脚-->
      <div slot="footer">
        <Button type="text" @click="cancelModal">取消</Button>
        <Button type="primary" @click="doEnterpriseRegister">确认</Button>
      </div>
    </Modal>

    <!--reigister thirdParty emodal-->
    <Modal v-model="isThirdParty" @on-cancel="cancelModal" title="注册成为第三方机构" width="800">
      <Form :model="registerForm" ref="registerForm" :rules="rules"
            :label-width="110">
        <Card>
          <Row>
            <Col span="11">
              <FormItem label="机构名称：" prop="name">
                <Input placeholder="请输入公司名称" clearable v-model="registerForm.name"></Input>
              </FormItem>
            </Col>
            <Col span="11">
              <FormItem label="机构类型：" prop="tType">
                <Select v-model="registerForm.tType">
                  <Option value="0" key="0">物流公司</Option>
                  <Option value="1" key="1">银行</Option>
                </Select>
              </FormItem>
            </Col>
          </Row>
        </Card>
      </Form>
      <!--自定义页脚-->
      <div slot="footer">
        <Button type="text" @click="cancelModal">取消</Button>
        <Button type="primary" @click="doThridPartyRegister">确认</Button>
      </div>
    </Modal>

  </div>
</template>

<script>
  import { getUserDetail } from '../../api/user.js'
  import axios from '@/libs/api.request'

  export default {
    name: 'index',
    components: {},
    data () {
      return {
        isEnterprise: false,
        isThirdParty: false,

        registerForm:{},
        userData: {},
        unRegister: false
      }
    },
    created () {
      this.getData()
    },
    methods: {
      getData () {
        axios.request({
          url: 'api/enterprise/list',
          method: 'get'
        }).then(res => {
          if (res.output.type === 0) {
            this.unRegister = true
          } else {
            // set
          }
        })
      },


      openEnterpriseModal(){
        this.isEnterprise = true
      },

      openThirdPartyModal(){
        this.isThirdParty = true
      },

      cancelModal(){
        this.isEnterprise = false
        this.isThirdParty = false
      },

      doThridPartyRegister(){

      },
      doEnterpriseRegister(){

      }
    }
  }
</script>

<style scoped>
  h1, p {
    text-align: center;
    color: black;
  }
</style>
