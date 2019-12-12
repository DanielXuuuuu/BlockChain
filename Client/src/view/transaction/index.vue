<template>
  <div>
    <!--按钮部分-->
    <Card>
      <p slot="title">历史交易</p>
      <Row>
        <Col span="6">
          <Button type="primary" style="width: 100px;" @click="openAddModal">
            发起新交易
          </Button>
          <Button type="primary" style="width: 100px; margin-left: 20px;" @click="openSettleModal">
            结算
          </Button>
        </Col>
      </Row>
      <br>
      <!--表格部分-->
      <div>
        <Table :columns="columnsList" :data="transactionData" border @on-selection-change="batchSelect"
               disabled-hover></Table>
      </div>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page show-total show-elevator :total="page.total" :current="page.currentPage"></Page>
        </div>
      </div>
    </Card>

    <!--Addmodal-->
    <Modal v-model="isAdd" @on-cancel="cancelModal" title="发起新交易" width="800">
      <Form :model="newTransactionForm" ref="newTransactionForm" :rules="rules"
            :label-width="110">
        <Card>
          <Row>
            <Col span="11">
              <FormItem label="交易方式：">
                <Select v-model="transactionMethod">
                  <Option value="0" key="0">创建新的应收账款单据</Option>
                  <Option value="1" key="1">转让已有应收账款单据</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="11">
              <FormItem label="卖方企业：" prop="seller">
<!--                <Select clearable filterable v-model="suggestionAddForm.enterpriseId" placeholder="请输入投诉企业" remote-->
<!--                        :remote-method="v=>{remoteMethod(v,'search')}" :loading="loading">-->
<!--                  <Option v-for="(option, index) in enterpriseData" :value="option.id.toString()" :key="index">-->
<!--                    {{option.name}}-->
<!--                  </Option>-->
<!--                </Select>-->
                <Input placeholder="请输入卖方企业地址" clearable v-model="newTransactionForm.seller"></Input>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="11">
              <FormItem label="交易时间：" prop="transactionTime">
                <DatePicker type="datetime" ref="timeAdd" placeholder="请选择交易时间"
                            style="width: 227px"></DatePicker>
              </FormItem>
            </Col>
            <Col span="11">
              <FormItem label="交易内容：" prop="process">
                <Input placeholder="请输入交易信息" clearable v-model="newTransactionForm.info"></Input>
              </FormItem>
            </Col>
          </Row>
        </Card>
      </Form>
      <!--自定义页脚-->
      <div slot="footer">
        <Button type="text" @click="cancelModal">取消</Button>
        <Button type="primary" @click="doCreateNewTransaction">确认</Button>
      </div>
    </Modal>

    <!--Settlemodal-->
    <Modal v-model="isSettle" @on-cancel="cancelModal" title="结算" width="800">
      <Form :model="settleForm" ref="settleForm" :rules="rules"
            :label-width="110">
        <Card>
          <Row>
            <FormItem label="应收账款单据ID：" prop="receiptId">
              <!--                <Select clearable filterable v-model="suggestionAddForm.enterpriseId" placeholder="请输入投诉企业" remote-->
              <!--                        :remote-method="v=>{remoteMethod(v,'search')}" :loading="loading">-->
              <!--                  <Option v-for="(option, index) in enterpriseData" :value="option.id.toString()" :key="index">-->
              <!--                    {{option.name}}-->
              <!--                  </Option>-->
              <!--                </Select>-->
              <Input placeholder="请输入要结算的应收账款单据ID" clearable v-model="settleForm.receiptId"></Input>
            </FormItem>
          </Row>
        </Card>
      </Form>
      <!--自定义页脚-->
      <div slot="footer">
        <Button type="text" @click="cancelModal">取消</Button>
        <Button type="primary" @click="doSettleReceipt">确认</Button>
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
                isReceipt: false,
                isSettle: false,

                // 表头数据
                columnsList: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '卖方',
                        align: 'center',
                        key: 'seller'
                    },
                    {
                        title: '买方',
                        align: 'center',
                        key: 'buyer'
                    },
                    {
                        title: '交易详情',
                        align: 'center',
                        key: 'info'
                    },
                    {
                        title: '交易时间',
                        align: 'center',
                        key: 'transactionTime'
                    },
                    {
                        title: '是否结算',
                        align: 'center',
                        key: 'settled'
                    },
                    {
                        title: '应收账款单据信息',
                        align: 'center',
                        key: 'handle',
                        width: 200,
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary'
                                    },
                                    style: {
                                        marginRight: '5px',
                                        display: 'inline-block'
                                    },
                                    on: {
                                        click: () => {
                                            let data = Object.assign({}, params.row)
                                            this.openReceiptModal(data)
                                        }
                                    }
                                }, '查看'),
                            ])
                        }
                    }
                ],
                gettingEnterpriseData: false,

                transactionData: [],
                newTransactionForm: {},
                settleForm: {},
                transactionMethod: 0, // 记录发起新的交易方式，0表示创建新单据，1表示转让已有单据

                // searchOption: {}, // 查询用参数
                // loading: false, // 远程查询时使用
                // loading1: false, // 远程查询时使用
                // loading2: false, // 远程查询时使用

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
            // this.findTransactionData()
        },

        methods: {

            openAddModal() {
                this.isAdd = true
            },

            openReceiptModal() {
                this.isReceipt = true
            },

            openSettleModal(){
                this.isSettle = true
            },

            doCreateNewTransaction(){

            },

            doSettleReceipt(){

            },

            cancelModal() {
                this.isAdd = false
                this.isReceipt = false
                this.isSettle = false

            }
        }
    }

</script>

<style scoped>

</style>
