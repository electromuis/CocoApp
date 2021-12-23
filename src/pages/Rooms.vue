<template>
  <ApolloQuery
    :query="require('./../apollo/queries/rooms.gql')"
    >

    <template v-slot="{ result: { loading, data } }">

      <div class="q-pa-md" style="max-width: 350px">
            <q-item to="/rooms/add" clickable>
              <q-item-section>
                <q-item-label>Add</q-item-label>
              </q-item-section>
            </q-item>


        <q-list bordered separator v-if="!loading">
          
          <q-item clickable v-ripple v-for="r in data.rooms" v-bind:key="r.id">
            <q-item-section>{{ r.name }}</q-item-section>
          </q-item>

      </q-list>
    </div>
  </template>

  </ApolloQuery>
</template>

<script>
import { defineComponent } from 'vue';
import { useQuery } from '@vue/apollo-composable'
import { QUERY_TOKEN, tokenVar } from '../apollo'

export default defineComponent({
  name: 'Rooms'

})
</script>
