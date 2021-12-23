

  <template>
      <q-list separator>
        
        <q-item clickable v-ripple v-for="u in users" v-bind:key="u.id">
          <q-item-section>{{ u.name }}</q-item-section>
        </q-item>

    </q-list>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'UsersList',
  props: ['users']
})

</script>
