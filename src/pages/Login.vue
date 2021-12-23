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
        <q-input filled class="q-ma-sm" v-model="email" type="email" label="email" />
        <q-input filled class="q-ma-sm" v-model="password" type="password" label="password" />

        <div class="q-ma-sm">
          <q-btn class="q-pa-sm" label="Login" type="submit" color="primary" @click="mutate()" />
        </div>
        
      </q-form>

    </q-page>

  </ApolloMutation>
</template>

<script>
import { defineComponent } from 'vue';
import { useQuery, writeQuery } from '@vue/apollo-composable'
import { QUERY_TOKEN, tokenVar } from './../apollo'

export default defineComponent({
  name: 'PageLogin',

  methods: {
    tokenVar,
    loggedIn(d) {
      tokenVar(d.data.login.token)
      localStorage.setItem('token', d.data.login.token)
    }
  },


  created() {
    const { result } = useQuery(QUERY_TOKEN)
    console.log(result.value.token)
  },

  data () {
    return {
      email: '',
      password: ''
    }
  }
})
</script>
