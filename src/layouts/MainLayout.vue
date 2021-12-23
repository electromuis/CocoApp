<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item to="/" clickable>
          <q-item-section>
            <q-item-label>Home</q-item-label>
          </q-item-section>
        </q-item>
        

        <ApolloQuery
          :query="require('./../apollo/queries/token.gql')"
          v-slot="{ result: { data } }"
        >
          <template v-if="data.token">
            
            <q-item to="/rooms" clickable>
              <q-item-section>
                <q-item-label>Rooms</q-item-label>
              </q-item-section>
            </q-item>

            <ApolloQuery
              :query="require('./../apollo/queries/invites.gql')"
              v-slot="{ result: { loading, data } }"
              :variables="{accepted: 'EMPTY'}"
            >
              <q-item to="/invites" clickable>
                <q-item-section>
                  <q-item-label v-if="loading">Invites (...)</q-item-label>
                  <q-item-label v-else>Invites ({{ data.invites.length }})</q-item-label>
                </q-item-section>
              </q-item>
            </ApolloQuery>

            <ApolloQuery
              :query="require('./../apollo/queries/alerts.gql')"
              v-slot="{ result: { loading, data } }"
              :variables="{responded: false}"
            >
              <q-item to="/alerts" clickable>
                <q-item-section>
                  <q-item-label v-if="loading">Alerts (...)</q-item-label>
                  <q-item-label v-else>Alerts ({{ data.alerts.length }})</q-item-label>
                </q-item-section>
              </q-item>
            </ApolloQuery>

          </template>
          <template v-else>

            <q-item to="/login" clickable>
              <q-item-section>
                <q-item-label>Login</q-item-label>
              </q-item-section>
            </q-item>

          </template>

        </ApolloQuery>

        
        
        
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MainLayout',

  setup () {
    const leftDrawerOpen = ref(false)

    return {
      leftDrawerOpen
    }
  }
})
</script>
