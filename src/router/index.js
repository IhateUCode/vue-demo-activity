import Vue from 'vue'
import Router from 'vue-router'
import actIndex from '../views/ActIndex.vue'
import actList from '../components/ActList.vue'
import actListStop from '../components/ActListStop.vue'
import actDetail from '../views/ActDetail.vue'
import applicationList from '../views/ApplicationList.vue'
import actStopDetail from '../views/ActStopDetail.vue'
import actReward from '../views/ActReward.vue'

Vue.use(Router)

export default new Router({
  routes: [
      {
        path: '/',
        redirect: '/progress',
        name: 'actIndex',
        component: actIndex,
        children: [
          {
            path: 'progress',
            name: '进行中',
            component: actList
          },
          {
            path: 'cease',
            name: '已结束',
            component: actListStop
          }
        ]
      },
      {
          path: '/detail/:id',
          name: 'actDetail',
          component: actDetail
      },
      {
        path: '/application/:id',
        name: 'applicationList',
        component: applicationList
      },
      {
        path: '/StopDetail/:id',
        name: 'actStopDetail',
        component: actStopDetail
      },
      {
        path: '/reward/:id',
        name: 'actReward',
        component: actReward
      }
  ]
})
