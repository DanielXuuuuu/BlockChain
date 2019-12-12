<template>
  <div>
    <!--按钮部分-->
    <Card>
      <p slot="title">融资记录</p>
      <Row>
        <Col span="5">
          <Button type="primary" style="width: 100px;" @click="openAddModal">
            申请融资
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
    <Modal v-model="isAdd" @on-cancel="cancelModal" title="申请融资" width="800">
      <Form :model="applyForm" ref="applyForm" :rules="rules"
            :label-width="110">
        <Card>
          <Row>
            <Col span="11">
              <FormItem label="应收账款单据：" prop="receiptId">
                <Input placeholder="请输入单据ID" clearable v-model="applyForm.receiptId"></Input>
              </FormItem>
            </Col>
            <Col span="11">
              <FormItem label="申请银行：" prop="seller">
                <!--                <Select clearable filterable v-model="suggestionAddForm.enterpriseId" placeholder="请输入投诉企业" remote-->
                <!--                        :remote-method="v=>{remoteMethod(v,'search')}" :loading="loading">-->
                <!--                  <Option v-for="(option, index) in enterpriseData" :value="option.id.toString()" :key="index">-->
                <!--                    {{option.name}}-->
                <!--                  </Option>-->
                <!--                </Select>-->
                <Input placeholder="请输入银行地址" clearable v-model="applyForm.bankAddr"></Input>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="11">
              <FormItem label="申请金额：" prop="amount">
                <Input placeholder="请输入申请金额" clearable v-model="applyForm.amount"></Input>
              </FormItem>
            </Col>
            <Col span="11">
              <FormItem label="申请时间：" prop="date">
                <DatePicker type="datetime" ref="timeAdd" placeholder="请选择申请时间"
                            style="width: 227px"></DatePicker>
              </FormItem>
            </Col>
          </Row>
        </Card>
      </Form>
      <!--自定义页脚-->
      <div slot="footer">
        <Button type="text" @click="cancelModal">取消</Button>
        <Button type="primary" @click="doFinancingApply">确认</Button>
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
                // 表头数据
                columnsList: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '银行账户地址',
                        align: 'center',
                        key: 'bank'
                    },
                    {
                        title: '融资时间',
                        align: 'center',
                        key: 'date'
                    },
                    {
                        title: '融资金额',
                        align: 'center',
                        key: 'amount'
                    },
                    {
                        title: '使用的应收账款单据',
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

                financingData: [],
                applyForm: {},
                transactionMethod: 0, // 记录发起新的交易方式，0表示创建新单据，1表示转让已有单据

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
            // this.findSuggestionData()
        },

        methods: {

            openAddModal() {
                this.isAdd = true
            },

            openReceiptModal() {
                this.isReceipt = true
            },

            doFinancingApply(){

            },

            cancelModal() {
                this.isAdd = false
                this.isReceipt = false

            }
        }
    }

</script>

<style scoped>

</style>
