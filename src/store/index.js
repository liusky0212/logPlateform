import { createStore } from 'vuex'
import { user } from './modules/user'
import { log } from './modules/log'
import { alert } from './modules/alert'
import { system } from './modules/system'

export default createStore({
  modules: {
    user,
    log,
    alert,
    system
  }
}) 