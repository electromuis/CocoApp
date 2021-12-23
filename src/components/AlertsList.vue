

  <template>
      <q-list separator>
        
        <q-item clickable v-ripple v-for="a in alerts" v-bind:key="a.id">
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

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AlertsList',
  props: ['alerts']
})

</script>
