export default [
  {
    path: '/datasource/config',
    name: 'datasource-config',
    component: () => import('@/pages/datasource/config'),
    meta: {
      auth: true,
      title: '数据源配置'
    }
  },
  {
    path: '/datasource/instance',
    name: 'datasource-instance',
    component: () => import('@/pages/datasource/instance'),
    meta: {
      auth: true,
      title: '数据源实例'
    }
  },
  {
    path: '/datasource/asset/subscription',
    name: 'datasource-asset-subscription',
    component: () => import('@/pages/datasource/asset/subscription'),
    meta: {
      auth: true,
      title: '资产订阅'
    }
  },
  {
    path: '/datasource/instance/ldap',
    name: 'datasource-instance-ldap',
    component: () => import('@/pages/datasource/instance/ldap'),
    meta: {
      auth: true,
      title: 'LDAP数据源实例'
    }
  },
  {
    path: '/datasource/instance/aliyun',
    name: 'datasource-instance-aliyun',
    component: () => import('@/pages/datasource/instance/aliyun'),
    meta: {
      auth: true,
      title: 'Aliyun数据源实例'
    }
  },
  {
    path: '/datasource/instance/gitlab',
    name: 'datasource-instance-gitlab',
    component: () => import('@/pages/datasource/instance/gitlab'),
    meta: {
      auth: true,
      title: 'Gitlab数据源实例'
    }
  },
  {
    path: '/datasource/instance/kubernetes',
    name: 'datasource-instance-kubernetes',
    component: () => import('@/pages/datasource/instance/kubernetes'),
    meta: {
      auth: true,
      title: 'Kubernetes数据源实例'
    }
  },
  {
    path: '/datasource/instance/zabbix',
    name: 'datasource-instance-zabbix',
    component: () => import('@/pages/datasource/instance/zabbix'),
    meta: {
      auth: true,
      title: 'Zabbix数据源实例'
    }
  },
  {
    path: '/datasource/instance/jenkins',
    name: 'datasource-instance-jenkins',
    component: () => import('@/pages/datasource/instance/jenkins'),
    meta: {
      auth: true,
      title: 'Jenkins数据源实例'
    }
  },
  {
    path: '/datasource/instance/ansible',
    name: 'datasource-instance-ansible',
    component: () => import('@/pages/datasource/instance/ansible'),
    meta: {
      auth: true,
      title: 'Ansible数据源实例'
    }
  },
  {
    path: '/datasource/instance/tencent_exmail',
    name: 'datasource-instance-tencent-exmail',
    component: () => import('@/pages/datasource/instance/tencent/exmail'),
    meta: {
      auth: true,
      title: '腾讯企业邮箱数据源实例'
    }
  },
  {
    path: '/datasource/instance/nexus',
    name: 'datasource-instance-nexus',
    component: () => import('@/pages/datasource/instance/nexus'),
    meta: {
      auth: true,
      title: 'Nexus数据源实例'
    }
  },
  {
    path: '/datasource/instance/sonar',
    name: 'datasource-instance-sonar',
    component: () => import('@/pages/datasource/instance/sonar'),
    meta: {
      auth: true,
      title: 'Sonar数据源实例'
    }
  }
]
