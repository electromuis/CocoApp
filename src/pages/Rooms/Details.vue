<template>
  <ApolloQuery
    :query="require('./../../apollo/queries/room.gql')"
    :variables="{ id: $route.params.roomId }"
    @error="$router.replace('/rooms')"
    >
      <template v-slot="{ result: { loading, data } }">
        <h5 v-if="loading">Loading</h5>
        <template v-else>
          
          <q-list separator class="q-ma-xl">
            <q-item>
              <q-item-section>
                <q-item-label q-item-label caption>Name</q-item-label>
                <q-item-label>{{ data.room.name }}</q-item-label>
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section>
                <q-item-label q-item-label caption>Alerts</q-item-label>

                <AlertsList 
                    :alerts="data.room.alerts"
                />
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section>
                <q-item-label q-item-label caption>Users</q-item-label>

                <UsersList 
                    :users="data.room.users"
                />
              </q-item-section>
            </q-item>
          </q-list>

        </template>

        <!-- <h5 class="q-pa-sm" v-if="loading">Loading ...</h5>
        <template v-else>

          <q-list bordered separator>
            <q-item v-ripple>
              <q-item-section>
                <q-item-label q-item-label caption>Name</q-item-label>
                <q-item-label>{{ data.room.name }}</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple>
              
              <AlertsList 
                  :alerts="data.room.alerts"
              />

            </q-item>
          </q-list>

        </template> -->
      
    </template>
  </ApolloQuery>
</template>

<script>
import { defineComponent } from 'vue';
import AlertsList from '../../components/AlertsList.vue'
import UsersList from '../../components/UsersList.vue'

export default defineComponent({
  name: 'RoomsDetails',
  components: {
      AlertsList,
      UsersList
  },
  methods: {
    myfunc(d) {
      console.log(d)
    }
  }
})
</script>
