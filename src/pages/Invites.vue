<template>
  <ApolloQuery
    :query="require('./../apollo/queries/invites.gql')"
    :variables="{ accepted: 'ANY' }"
    >

    <template v-slot="{ result: { loading, data } }">

      <q-list bordered separator v-if="!loading" class="q-ma-xl">
        
        <q-item clickable v-ripple v-for="i in data.invites" v-bind:key="i.room.id">
          <q-item-section>{{ i.room.name }}</q-item-section>

          <q-item-section side v-if="i.accepted === true">Joined</q-item-section>
          <q-item-section side v-if="i.accepted === false">Refused</q-item-section>
          <q-item-section side v-if="i.accepted === null">
            <ApolloMutation
              :mutation="require('./../apollo/mutations/respondinvite.gql')"
              :refetchQueries="[require('./../apollo/queries/invites.gql'), require('./../apollo/queries/rooms.gql')]"
              v-slot="{loading, mutate}"
            >

              <q-btn class="q-ma-sm" :disable="loading" label="Accept" type="submit" color="primary" @click="mutate({variables: { room: i.room.id, accepted: true}})" />
              <q-btn class="q-ma-sm text-grey" :disable="loading" label="Refuse" type="submit" color="secondairy" @click="mutate({variables: {room: i.room.id, accepted: false}})" />

            </ApolloMutation>
          </q-item-section>
        </q-item>

    </q-list>

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
