<template>
  <ApolloQuery
    :query="require('./../apollo/queries/alerts.gql')"
    >

    <template v-slot="{ result: { loading, data } }">
        <q-list bordered separator v-if="!loading" class="q-ma-xl">
          
          <q-item clickable v-ripple v-for="a in data.alerts" v-bind:key="a.id">
            <q-item-section>{{ date(a.createdAt) }} {{ a.room.name }}</q-item-section>

            <q-item-section side v-if="a.responded">{{ a.responded.response }}</q-item-section>
            <q-item-section side v-else>
              <ApolloMutation
                :mutation="require('./../apollo/mutations/respondalert.gql')"
                :refetchQueries="[require('./../apollo/queries/alerts.gql')]"
                v-slot="{loading, mutate}"
              >

                <q-btn class="q-ma-sm" :disable="loading" label="Host" type="submit" color="primary" @click="mutate({variables: { alert: a.id, response: 'HOST' }})" />
                <q-btn class="q-ma-sm" :disable="loading" label="Yes" type="submit" color="primary" @click="mutate({variables: { alert: a.id, response: 'YES' }})" />
                <q-btn class="q-ma-sm text-grey" :disable="loading" label="No" type="submit" color="secondairy" @click="mutate({variables: { alert: a.id, response: 'NO' }})" />

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
  name: 'Alerts'

})
</script>
