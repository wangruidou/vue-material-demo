import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Manufacturer from '@/components/pages/manufacturer/Manufacturer'
import DeviceType from '@/components/pages/device_type/DeviceType'
import DeviceKind from '@/components/pages/device_kind/DeviceKind'
import DeviceManage from '@/components/pages/device_manage/DeviceManage'
import EditDistribution from '@/components/pages/device_manage/EditDistribution'
import DeviceDetail from '@/components/pages/device_manage/DeviceDetail'
import WarehouseManage from '@/components/pages/device_manage/WarehouseManage'
import TrainManage from '@/components/pages/device_manage/TrainManage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: 'Manufacturer'
    },
    {
      path: '/Manufacturer',
      name: 'Manufacturer',
      component: Manufacturer
    },
    {
      path: '/DeviceType',
      name: 'DeviceType',
      component: DeviceType
    },
    {
      path: '/DeviceKind',
      name: 'DeviceKind',
      component: DeviceKind
    },
    {
        path: '/DeviceManage',
        name: 'DeviceManage',
        component: DeviceManage,
        meta: {
          keepAlive: true // 需要被缓存
        }
    },
    {
        path: '/EditDistribution',
        name: 'EditDistribution',
        component: EditDistribution
    },
    {
        path: '/DeviceDetail',
        name: 'DeviceDetail',
        component: DeviceDetail
    },
    {
        path: '/WarehouseManage',
        name: 'WarehouseManage',
        component: WarehouseManage
    },
    {
        path: '/TrainManage',
        name: 'TrainManage',
        component: TrainManage
    }
  ]
})
