<template>
  <ApolloMutation
    :mutation="require('./../apollo/mutations/register.gql')"
    :variables="{name, email, password}"
    @done="loggedIn"
    v-slot="{mutate, error}"
  >

    <q-page>
      <h5 class="q-pa-sm">Register</h5>
      <h5 class="q-pa-sm text-red" v-if="error">{{error}}</h5>
      
      <q-form>
        <q-input filled class="q-ma-sm" v-model="name" type="text" label="Name" />
        <q-input filled class="q-ma-sm" v-model="email" type="email" label="Email" />
        <q-input filled class="q-ma-sm" v-model="password" type="password" label="Password" />

        <div class="q-ma-sm">
          <q-btn class="q-pa-sm" label="Register" type="submit" color="primary" @click="mutate()" />
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
  name: 'PageRegister',

  methods: {
    tokenVar,
    loggedIn(d) {
      this.$auth.login(d.data.login.token)
      this.$router.replace('/alerts')
    }
  },

  data () {
    return {
      name: '',
      email: '',
      password: ''
    }
  }
})
</script>
