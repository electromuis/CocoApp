<template>
  <ApolloMutation
    :mutation="require('./../apollo/mutations/login.gql')"
    :variables="{email, password}"
    @done="loggedIn"
    v-slot="{mutate, error}"
  >

    <q-page>
      <h5 class="q-pa-sm">Login</h5>
      <h5 class="q-pa-sm text-red" v-if="error">{{error}}</h5>
      
      <q-form>
        <q-input filled class="q-ma-sm" v-model="email" type="email" label="Email" />
        <q-input filled class="q-ma-sm" v-model="password" type="password" label="Password" />

        <div class="q-ma-sm">
          <q-btn class="q-ma-sm" label="Login" type="submit" color="primary" @click="mutate()" />

          <q-btn class="q-ma-sm" label="Google Login" type="submit" color="primary" @click="auth('google')" />
        </div>
        
      </q-form>

    </q-page>

  </ApolloMutation>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PageLogin',

  methods: {
    async auth(network) {
      const helloResult = await this.$hello(network).login({
        scope: 'profile,email',
        redirect_uri: 'http://127.0.0.1:8080/'
      })

      console.log(helloResult)

      const tokenResult = await this.$apollo.mutate({
        mutation: require('./../apollo/mutations/loginwith.gql'),
        variables: {
          network,
          token: helloResult.authResponse.access_token
        }
      })

      this.$auth.login(tokenResult.data.loginWith.token)
      this.$router.replace('/alerts')
    },

    loggedIn(d) {
      this.$auth.login(d.data.login.token)
      $router.replace('/alerts')
    }
  },

  data () {
    return {
      email: '',
      password: ''
    }
  }
})
</script>
