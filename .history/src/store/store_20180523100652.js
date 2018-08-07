import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 定义初始值
let state = {
    count: 10
}

const mutations = {
    add(context) {
        context.count++
    },
    decrease(context) {
        context.count--
    }
};

// 事件触发后的逻辑操作
// 参数为事件函数
const actions = {
    add(add) {
        add.commit('add')
    },
    decrease(decrease) {
        decrease.commit('decrease')
    },
    oddAdd({commit, state}) {
        if (state.count % 2 == 0) {
            
        }
    }
}