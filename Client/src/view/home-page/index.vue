<template>
  <div style="height: 100%;">
    <Card style="height: 100%;">
      <h1 slot="title">供应链金融</h1>
      <h2 style="margin-bottom: 100px;">这是一个供应链金融供应链解决方法</h2>
      <div v-if="unRegister">
        <p>您的公司/机构尚未登记</p>
        <br>
        <Row style="text-align: center;">
          <Col>
            <Button type="primary" style="width: 150px;" @click="openEnterpriseModal">
              注册成为公司
            </Button>
            <Button type="primary" style="width: 150px; margin-left: 20px;" @click="openThirdPartyModal">
              注册成为第三方机构
            </Button>
          </Col>
        </Row>
      </div>
      <div v-else>
        <h1>欢迎使用，{{ userData.name }}！</h1>
      </div>
    </Card>

    <!--reigister enterprise emodal-->
    <Modal v-model="isEnterprise" @on-cancel="cancelModal" title="注册成为公司" width="800">
      <Form :model="registerForm" ref="registerForm1" :label-width="110">
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
      <Form :model="registerForm" ref="registerForm2" :label-width="110">
        <Card>
          <Row>
            <Col span="11">
              <FormItem label="机构名称：" prop="name">
                <Input placeholder="请输入公司名称" clearable v-model="registerForm.name"></Input>
              </FormItem>
            </Col>
            <Col span="11">
              <FormItem label="机构类型：" prop="type">
                <Select v-model="registerForm.type">
                  <Option value=0 key=0>物流公司</Option>
                  <Option value=1 key=1>银行</Option>
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
    import {getUserDetail, registerThirdParty, registerEnterprise} from '../../api/user.js'

    export default {
        name: 'index',
        components: {},
        data() {
            return {
                isEnterprise: false,
                isThirdParty: false,

                registerForm: {},
                userData: {},
                unRegister: true
            }
        },
        created() {
            this.getUserData()
        },
        methods: {
            async getUserData() {
                let res = await getUserDetail()
                this.userData = res.data.data.output
                if (this.userData['0']) {
                    this.unRegister = false
                }
            },
            async doEnterpriseRegister() {
                let res = await registerEnterprise(this.registerForm)
                this.getUserData()
            },

            async doThridPartyRegister() {
                let res = await registerThirdParty(this.registerForm)
                this.getUserData()
            },
            openEnterpriseModal() {
                this.isEnterprise = true
            },

            openThirdPartyModal() {
                this.isThirdParty = true
            },

            cancelModal() {
                this.isEnterprise = false
                this.isThirdParty = false
                this.$refs.registerForm1.resetFields()
                this.$refs.registerForm2.resetFields()
            },
        }
    }
</script>

<style scoped>
  h1, h2, p {
    text-align: center;
    color: black;
  }
</style>
