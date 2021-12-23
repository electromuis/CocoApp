<template>
  <q-page class="flex flex-center">
    <img
      alt="Quasar logo"
      src="~assets/quasar-logo-vertical.svg"
      style="width: 200px; height: 200px"
    >
    Welcome there
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'


export default defineComponent({
  watch: {
  },
  name: 'PageIndex',
  setup() {
    
  }
})
</script>
