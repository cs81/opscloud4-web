<!--suppress HtmlUnknownTag -->
<template>
  <div>
    <el-form :model="sqsData" label-width="120px" ref="sqsDataForm" :rules="rules">
      <el-form-item label="AWS实例" prop="instanceUuid">
        <el-select v-model="instanceUuid" size="mini" filterable value-key="instanceName"
                   style="width: 250px;" placeholder="选择数据源实例" reserve-keyword>
          <el-option v-for="item in dsInstanceOptions"
                     :key="item.uuid"
                     :label="item.instanceName"
                     :value="item.uuid">
            <select-item :name="item.instanceName" :comment="item.instanceType"/>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="环境">
        <el-select v-model="sqsData.envName" size="mini" filterable style="width: 250px;" placeholder="请选择环境"
                   :disabled="instanceUuid === ''">
          <el-option v-for="item in regionOptions"
                     :key="item.label"
                     :label="item.label"
                     :value="item.label">
            <select-item :name="item.label" :comment="item.desc"/>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="队列名称" prop="queueName">
        <el-input v-model="sqsData.queueName" size="mini"/>
        <span style="height: 18px;font-size: 10px;color: #909399">
         以 {{ queueNamePrefix }} 开头,以 {{ queueNameSuffix }} 结尾，包含小写英文、数字和下划线（_）,最多 80 个字符，FIFO 名称必须以“.fifo”结尾。
        </span>
      </el-form-item>
      <el-form-item label="队列类型" prop="queueType">
        <el-radio-group v-model="sqsData.queueType">
          <el-radio label="0">标准
            <el-alert type="info" :closable="false" description="至少传送一次，消息的传送顺序不固定"/>
          </el-radio>
          <el-radio label="1" disabled>FIFO(暂不支持)
            <el-alert type="info" :closable="false" description="先进先出传送消息，消息的传送顺序固定不变"/>
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-collapse>
        <el-collapse-item title="点击查看更多配置">
          <el-row>
            <el-col :span="12">
              <el-form-item label="可见性超时" prop="visibilityTimeout">
                <el-input v-model="sqsData.visibilityTimeout" size="mini">
                  <el-select v-model="unit.visibilityTimeoutUnit"  slot="append" style="width: 80px">
                    <el-option label="秒" :value="time.second"/>
                    <el-option label="分钟" :value="time.minute"/>
                    <el-option label="小时" :value="time.hour"/>
                  </el-select>
                </el-input>
                <span style="height: 18px;font-size: 10px;color: #909399">
                  应介于 0 秒至 12 小时之间。
                </span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="消息保留周期" prop="messageRetentionPeriod">
                <el-input v-model="sqsData.messageRetentionPeriod" size="mini">
                  <el-select v-model="unit.messageRetentionPeriodUnit" slot="append" style="width: 80px">
                    <el-option label="秒" :value="time.second"/>
                    <el-option label="分钟" :value="time.minute"/>
                    <el-option label="小时" :value="time.hour"/>
                    <el-option label="天" :value="time.day"/>
                  </el-select>
                </el-input>
                <span style="height: 18px;font-size: 10px;color: #909399">
                  应介于 1 分钟至 14 天之间。
                </span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="交付延迟" prop="delaySeconds">
                <el-input v-model="sqsData.delaySeconds" size="mini" class="input-with-select">
                  <el-select v-model="unit.delaySecondsUnit" slot="append" style="width: 80px">
                    <el-option label="秒" :value="time.second"></el-option>
                    <el-option label="分钟" :value="time.minute"></el-option>
                  </el-select>
                </el-input>
                <span style="height: 18px;font-size: 10px;color: #909399">
                  应介于 0 秒至 15 分钟之间。
                </span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="最大消息大小" prop="maximumMessageSize">
                <el-input v-model="sqsData.maximumMessageSize" size="mini">
                  <template slot="append">KB</template>
                </el-input>
                <span style="height: 18px;font-size: 10px;color: #909399">
                  应介于 1 KB 和 256 KB之间。
                </span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="接收消息等待" prop="receiveMessageWaitTimeSeconds">
                <el-input v-model="sqsData.receiveMessageWaitTimeSeconds" size="mini">
                  <template slot="append">秒</template>
                </el-input>
                <span style="height: 18px;font-size: 10px;color: #909399">
                  应介于 0 至 20 秒之间。
                </span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-collapse-item>
      </el-collapse>
      <br/>
      <el-form-item label="描述" prop="remark">
        <el-input v-model="sqsData.remark" placeholder="请输入备注，例如：用户 - 领券队列" size="mini"/>
      </el-form-item>
      <el-form-item>
        <el-button plain type="primary" @click="addTicketEntry" :loading="buttonAdding" size="mini">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

import { QUERY_DATASOURCE_INSTANCE } from '@/api/modules/datasource/datasource.instance.api'
import {
  ADD_WORK_ORDER_TICKET_ENTRY
} from '@/api/modules/workorder/workorder.ticket.api'
import SelectItem from '@/components/opscloud/common/SelectItem'
import CloudRegionType from '@/components/opscloud/common/enums/cloud.region.type'

const sqsData = {
  envName: 'dev',
  queueName: '_dev_queue',
  queueType: '0',
  instanceId: '',
  regionId: 'ap-northeast-2',
  delaySeconds: 0,
  maximumMessageSize: 256,
  messageRetentionPeriod: 4,
  receiveMessageWaitTimeSeconds: 0,
  visibilityTimeout: 30,
  remark: ''
}

const time = {
  second: 1,
  minute: 60,
  hour: 3600,
  day: 86400
}

export default {
  name: 'TicketSqsForm',
  props: {
    workOrderTicketId: {
      type: Number,
      required: true
    }
  },
  components: {
    SelectItem
  },
  data () {
    return {
      ticketData: {},
      instanceType: 'AWS',
      sqsData: {},
      instanceUuid: '',
      buttonAdding: false,
      dsInstanceOptions: '',
      regionOptions: CloudRegionType.AWS.regionType,
      unit: {
        visibilityTimeoutUnit: time.second,
        messageRetentionPeriodUnit: time.day,
        delaySecondsUnit: time.second,
        maximumMessageSizeUnit: 1024
      },
      queueNamePrefix: 'transsnet_',
      queueNameSuffix: '',
      time: time,
      rules: {
        queueName: [
          { required: true, message: '请输入队列名称', trigger: 'blur' },
          { max: 80, message: '长度限制在80个字符之内', trigger: 'blur' }
        ],
        queueType: [
          { required: true, message: '请选择队列类型', trigger: 'change' }
        ],
        visibilityTimeout: [
          { required: true, message: '请输入可见性超时', trigger: 'blur' }
        ],
        messageRetentionPeriod: [
          { required: true, message: '请输入消息保留周期', trigger: 'blur' }
        ],
        delaySeconds: [
          { required: true, message: '请输入交付延迟', trigger: 'blur' }
        ],
        maximumMessageSize: [
          { required: true, message: '请输入最大消息大小', trigger: 'blur' }
        ],
        receiveMessageWaitTimeSeconds: [
          { required: true, message: '请输入接收消息等待', trigger: 'blur' }
        ],
        remark: [
          { required: true, message: '请输入描述说明', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
  },
  watch: {
    'sqsData.envName': {
      handler (newName, oldName) {
        switch (newName) {
          case 'dev':
            this.sqsData.regionId = 'ap-northeast-2'
            this.queueNameSuffix = '_dev_queue'
            this.sqsData.queueName = '_dev_queue'
            break
          case 'daily':
            this.sqsData.regionId = 'ap-east-1'
            this.queueNameSuffix = '_test_queue'
            this.sqsData.queueName = '_test_queue'
            break
          case 'frankfurt-daily':
            this.sqsData.regionId = 'eu-central-1'
            this.queueNameSuffix = '_daily_queue'
            this.sqsData.queueName = '_daily_queue'
            break
          case 'gray':
            this.sqsData.regionId = 'eu-west-1'
            this.queueNameSuffix = '_canary_queue'
            this.sqsData.queueName = '_canary_queue'
            break
          case 'pre':
            this.sqsData.regionId = 'eu-west-1'
            this.queueNameSuffix = '_pre_queue'
            this.sqsData.queueName = '_pre_queue'
            break
          case 'prod':
            this.sqsData.regionId = 'eu-west-1'
            this.queueNameSuffix = '_prod_queue'
            this.sqsData.queueName = '_prod_queue'
            break
        }
      },
      immediate: true
    }
  },
  methods: {
    initDate () {
      this.getDsInstance()
      this.sqsData = Object.assign({}, sqsData)
    },
    addTicketEntry () {
      this.$refs.sqsDataForm.validate((valid) => {
        if (valid) {
          this.buttonAdding = true
          const attributes = {
            DelaySeconds: this.sqsData.delaySeconds * this.unit.delaySecondsUnit,
            MaximumMessageSize: this.sqsData.maximumMessageSize * this.unit.maximumMessageSizeUnit,
            MessageRetentionPeriod: this.sqsData.messageRetentionPeriod * this.unit.messageRetentionPeriodUnit,
            ReceiveMessageWaitTimeSeconds: this.sqsData.receiveMessageWaitTimeSeconds,
            VisibilityTimeout: this.sqsData.visibilityTimeout * this.unit.visibilityTimeoutUnit
          }
          const data = {
            envName: this.sqsData.envName,
            queueName: this.sqsData.queueName,
            regionId: this.sqsData.regionId,
            attributes: attributes
          }
          const requestBody = {
            workOrderTicketId: this.workOrderTicketId,
            name: this.sqsData.queueName,
            instanceUuid: this.instanceUuid,
            businessType: 5,
            businessId: 0,
            entryStatus: 0,
            entryKey: this.sqsData.regionId,
            comment: this.sqsData.remark,
            content: JSON.stringify(data),
            properties: attributes
          }
          ADD_WORK_ORDER_TICKET_ENTRY(requestBody).then(() => {
            this.$emit('handleNotify')
            this.$message.success('保存成功')
            this.buttonAdding = false
          }).catch(() => {
            this.buttonAdding = false
          })
        }
      })
    },
    getDsInstance () {
      const requestBody = {
        instanceType: this.instanceType,
        isActive: true,
        extend: false
      }
      QUERY_DATASOURCE_INSTANCE(requestBody)
        .then(({ body }) => {
          if (body !== null) {
            this.dsInstanceOptions = body
            // 默认选择第一个数据源实例
            if (this.dsInstanceOptions.length !== 0) {
              this.instanceUuid = this.dsInstanceOptions[0].uuid
            }
          }
        })
    }
  }
}
</script>

<style scoped lang="less">

</style>
