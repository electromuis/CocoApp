<template>
  <div class="q-ma-xl">
    <ApolloQuery
      :query="require('./../apollo/queries/alerts.gql')"
      v-slot="{ result: { loading, data } }"
      >

      <AlertsList 
        v-if="!loading"
        :alerts="data.alerts"
      />

    </ApolloQuery>

    <Actions />

  </div>
</template>

<script>
import { defineComponent } from 'vue';
import AlertsList from '../components/AlertsList.vue'
import Actions from './../components/Actions.vue'

export default defineComponent({
  name: 'Alerts',
  
  components: {
    AlertsList,
    Actions
  },

  data() {
    return {
      
    }
  }
})
</script>
