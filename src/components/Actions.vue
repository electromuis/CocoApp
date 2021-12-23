<template>
    <q-dialog v-model="alertpopup">
      <q-card>
        <q-card-section>
          <div class="text-h6">Alert</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Add an alert
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="roompopup">
      <q-card>
        <q-card-section>
          <div class="text-h6">Room</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Add a room
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
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
              this.alertpopup = true
              this.roompopup = false
          }

          else if(popup == 'room') {
              this.roompopup = true
              this.alertpopup = false
          }
      }
  },

  data() {
      return {
          alertpopup: false,
          roompopup: false
      }
  }
})

</script>
