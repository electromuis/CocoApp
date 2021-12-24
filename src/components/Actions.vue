<template>
    <q-dialog v-model="alert.open">
      <q-card>
        <q-card-section>
          <div class="text-h6" v-if="!alert.room">Alert</div>
          <div class="text-h6" v-else>Alert: {{ alert.room.name }}</div>
        </q-card-section>

        

          <ApolloQuery
              :query="require('./../apollo/queries/rooms.gql')"
              v-if="!alert.room"
              v-slot="{ result: { loading, data } }"
              >

            <q-list dense bordered padding class="rounded-borders" v-if="!loading">
              <q-item clickable v-ripple v-for="r in data.rooms" v-bind:key="r.id" @click="alert.room = r">
                <q-item-section>{{ r.name }}</q-item-section>
              </q-item>
            </q-list>

          </ApolloQuery>

        
          <ApolloMutation
            v-if="alert.room"
            :mutation="require('./../apollo/mutations/addalert.gql')"
            :refetchQueries="[require('./../apollo/queries/alerts.gql')]"
            v-slot="{loading, mutate}"
            @done="alert.open = false"
          >

            <q-btn class="q-ma-sm" :disable="loading" label="Host" type="submit" color="primary" @click="mutate({variables: { room: alert.room.id, response: 'HOST' }})" />
            <q-btn class="q-ma-sm" :disable="loading" label="Yes" type="submit" color="primary" @click="mutate({variables: { room: alert.room.id, response: 'YES' }})" />
            <q-btn class="q-ma-sm text-grey" :disable="loading" label="No" type="submit" color="secondairy" @click="mutate({variables: { room: alert.room.id, response: 'NO' }})" />

          </ApolloMutation>
      </q-card>
    </q-dialog>

    <q-dialog v-model="room.open">
      <q-card>
        
        <ApolloMutation
          :mutation="require('./../apollo/mutations/addroom.gql')"
          :variables="{ name: room.name }"
          :refetchQueries="[require('./../apollo/queries/rooms.gql')]"
          @done="room.open = false"
          v-slot="{mutate, error}"
        >

        <q-card-section>
          <div class="text-h6">Room name</div>
        </q-card-section>

        <q-card-section v-if="error">
          <div class="text-h6">{{ error }}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input dense v-model="room.name" autofocus @keyup.enter="mutate()" />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Save" color="primary" @click="mutate()" />
        </q-card-actions>

        </ApolloMutation>

      </q-card>
    </q-dialog>

    <q-page-sticky vi position="bottom-right" :offset="[18, 18]">
      <q-fab
        color="purple"
        direction="up"
        icon="add"
      >
        <q-fab-action color="primary" @click="openpopup('alert')" hide-icon label="Alert" />
        <q-fab-action color="secondary" @click="openpopup('room')" hide-icon label="Room" />
      </q-fab>
    </q-page-sticky>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Actions',

  computed: {
      open() {
          return this.alertpopup || roompopup
      }
  },

  methods: {
      openpopup(popup) {


          if(popup == 'alert') {
              this.alert.open = true
              this.room.open = false
          }

          else if(popup == 'room') {
              this.room.open = true
              this.alert.open = false
          }
      }
  },

  data() {
      return {
        alert: {
          open: false,
          room: null
        },
        room: {
          open: false,
          name: ''
        }
      }
  }
})

</script>
