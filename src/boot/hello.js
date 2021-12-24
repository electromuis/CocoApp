import { boot } from 'quasar/wrappers'
import hello from 'hellojs'
import { tokenVar } from '../apollo/index'


hello.init({
  google: '651463278960-9nlk2n370vopiknmss7nq604a21k3gv2.apps.googleusercontent.com'
})

export default boot(({ app }) => {
  app.config.globalProperties.$hello = hello

  app.config.globalProperties.$auth = {
    login(token) {
      localStorage.setItem('token', token)
      tokenVar(token)
    },

    logout() {
      localStorage.setItem('token', null)
      tokenVar(null)
    }
  }
})