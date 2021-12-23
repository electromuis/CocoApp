<template>
  <ApolloMutation
    :mutation="require('./../../apollo/mutations/addroom.gql')"
    :variables="{name}"
    @done="$router.replace('/rooms')"
  >

  <template v-slot="{mutate, error}">
    
    <q-page>
      <h5 class="q-pa-sm">Add room</h5>
      <h5 class="q-pa-sm text-red" v-if="error">{{error}}</h5>
      
      <q-form>
        <q-input filled class="q-ma-sm" v-model="name" type="text" label="Name" />

        <div class="q-ma-sm">
          <q-btn class="q-pa-sm" label="Save" type="submit" color="primary" @click="mutate()" />
        </div>
        
      </q-form>

    </q-page>

  </template>

  </ApolloMutation>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'RoomsAdd',

  data () {
    return {
      name: ''
    }
  }
})
</script>
