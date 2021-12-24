<template>
  <ApolloQuery
    :query="require('./../apollo/queries/rooms.gql')"
    >

    <template v-slot="{ result: { loading, data } }">

        <q-list separator v-if="!loading" class="q-ma-xl">
          
          <q-item clickable v-ripple v-for="r in data.rooms" v-bind:key="r.id" @click="$router.push({ path: `/rooms/${r.id}/details`})">
            <q-item-section>{{ r.name }}</q-item-section>
          </q-item>

      </q-list>

      <Actions />
  </template>

  </ApolloQuery>
</template>

<script>
import { defineComponent } from 'vue';
import { useQuery } from '@vue/apollo-composable'
import { QUERY_TOKEN, tokenVar } from '../apollo'
import Actions from './../components/Actions.vue'

export default defineComponent({
  name: 'Rooms',
  components: {
    Actions
  }

})
</script>
