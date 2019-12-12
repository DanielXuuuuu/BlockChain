<template>
  <div>
    <!--按钮部分-->
    <Card>
      <p slot="title">认证历史</p>
      <Row>
        <Col span="5">
          <Button type="primary" style="width: 100px;" @click="openAddModal">
            添加新认证
          </Button>
        </Col>
      </Row>
      <br>
      <!--表格部分-->
      <div>
        <Table :columns="columnsList" :data="receiptData" border @on-selection-change="batchSelect"
               disabled-hover></Table>
      </div>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page show-total show-elevator :total="page.total" :current="page.currentPage"></Page>
        </div>
      </div>
    </Card>

    <!--Addmodal-->
    <Modal v-model="isAdd" @on-cancel="cancelModal" title="核心企业认证" width="800">
      <Form :model="addForm" ref="addForm" :rules="rules" :label-width="110">
        <Card>
          <Row>
            <FormItem label="应收账款单据id：" prop="receiptId">
              <!--                <Select clearable filterable v-model="suggestionAddForm.enterpriseId" placeholder="请输入投诉企业" remote-->
              <!--                        :remote-method="v=>{remoteMethod(v,'search')}" :loading="loading">-->
              <!--                  <Option v-for="(option, index) in enterpriseData" :value="option.id.toString()" :key="index">-->
              <!--                    {{option.name}}-->
              <!--                  </Option>-->
              <!--                </Select>-->
              <Input placeholder="请输入要认证的应收账款单据id" clearable v-model="addForm.receiptId"></Input>
            </FormItem>
          </Row>
        </Card>
      </Form>
      <!--自定义页脚-->
      <div slot="footer">
        <Button type="text" @click="cancelModal">取消</Button>
        <Button type="primary" @click="doConfirm">确认</Button>
      </div>
    </Modal>
  </div>
</template>

<script>

    export default {
        name: 'transaction',
        components: {},
        data: function () {
            return {
                // modal控制
                isAdd: false,

                rules: {// 用户表单校验对象
                },

                // 表头数据
                columnsList: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '企业名称',
                        align: 'center',
                        key: 'name'
                    },
                    {
                        title: '账户地址',
                        align: 'center',
                        key: 'address'
                    }
                ],
                gettingEnterpriseData: false,

                receiptData: [],
                addForm: {},

                searchOption: {}, // 查询用参数
                loading: false, // 远程查询时使用
                loading1: false, // 远程查询时使用
                loading2: false, // 远程查询时使用


                delId: {
                    ids: ''
                },
                page: {
                    total: 1,
                    currentPage: 1
                }
            }
        },

        created() {
            // this.findCoreEnterpriseData()
        },

        methods: {
            // findCoreEnterpriseData(){
            //
            // },

            openAddModal() {
                this.isAdd = true;
            },

            doConfirm() {

            },

            cancelModal() {
                this.isAdd = false
            }
        }
    }

</script>

<style scoped>

</style>
