import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Manufacturer from '@/components/pages/manufacturer/Manufacturer'
import DeviceType from '@/components/pages/device_type/DeviceType'
import DeviceKind from '@/components/pages/device_kind/DeviceKind'


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
    }
  ]
})
