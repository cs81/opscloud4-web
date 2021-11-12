const DsInstanceAssetType = Object.freeze({
  LDAP: {
    USER: 'USER',
    GROUP: 'GROUP'
  },
  GITLAB: {
    GITLAB_USER: 'GITLAB_USER',
    GITLAB_SSHKEY: 'GITLAB_SSHKEY',
    GITLAB_PROJECT: 'GITLAB_PROJECT',
    GITLAB_GROUP: 'GITLAB_GROUP'
  },
  ALIYUN: {
    ECS: 'ECS',
    VPC: 'VPC',
    V_SWITCH: 'V_SWITCH',
    ECS_IMAGE: 'ECS_IMAGE',
    ECS_SG: 'ECS_SG',
    RAM_USER: 'RAM_USER',
    RAM_POLICY: 'RAM_POLICY',
    RAM_ACCESS_KEY: 'RAM_ACCESS_KEY',
    RDS_MYSQL_INSTANCE: 'RDS_MYSQL_INSTANCE',
    RDS_MYSQL_DATABASE: 'RDS_MYSQL_DATABASE',
    ONS_ROCKETMQ_INSTANCE: 'ONS_ROCKETMQ_INSTANCE',
    ONS_ROCKETMQ_TOPIC: 'ONS_ROCKETMQ_TOPIC',
    ONS_ROCKETMQ_GROUP: 'ONS_ROCKETMQ_GROUP'
  },
  KUBERNETES: {
    KUBERNETES_NAMESPACE: 'KUBERNETES_NAMESPACE',
    KUBERNETES_DEPLOYMENT: 'KUBERNETES_DEPLOYMENT',
    KUBERNETES_POD: 'KUBERNETES_POD'
  },
  ANSIBLE: {
    ANSIBLE_VERSION: 'ANSIBLE_VERSION',
    ANSIBLE_HOSTS: 'ANSIBLE_HOSTS'
  },
  ZABBIX: {
    ZABBIX_USER: 'ZABBIX_USER',
    ZABBIX_USER_GROUP: 'ZABBIX_USER_GROUP',
    ZABBIX_HOST: 'ZABBIX_HOST',
    ZABBIX_HOST_GROUP: 'ZABBIX_HOST_GROUP',
    ZABBIX_TEMPLATE: 'ZABBIX_TEMPLATE',
    ZABBIX_TRIGGER: 'ZABBIX_TRIGGER'
  },
  JENKINS: {
    JENKINS_COMPUTER: 'JENKINS_COMPUTER'
  },
  GUACAMOLE: {
    GUACAMOLE: 'GUACAMOLE'
  },
  TENCENT_EXMAIL: {
    TENCENT_EXMAIL_USER: 'TENCENT_EXMAIL_USER'
  },
  NEXUS: {
    NEXUS_ASSET: 'NEXUS_ASSET'
  },
  SONAR: {
    SONAR_PROJECT: 'SONAR_PROJECT'
  },
  NACOS: {
    NACOS_CLUSTER_NODE: 'NACOS_CLUSTER_NODE',
    NACOS_PERMISSION: 'NACOS_PERMISSION',
    NACOS_ROLE: 'NACOS_ROLE',
  },
})

export default DsInstanceAssetType
