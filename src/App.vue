<template>
  <router-view />

  <ApolloQuery
      :query="require('./apollo/queries/token.gql')"
      v-slot="{ result: { data } }"
    >
      <template v-if="data.token">

        <ApolloSubscribeToMore
          :document="require('./apollo/subscriptions/alert.gql')"
          :updateQuery="onAlert"
        >
        </ApolloSubscribeToMore>

      </template>
  </ApolloQuery>
</template>
<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  methods: {
    onAlert(previousResult, { subscriptionData }) {
      console.log(previousResult, subscriptionData)
    }
  }
})
</script>
