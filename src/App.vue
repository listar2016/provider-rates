<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <div class="d-flex align-center">
        <h2>Provider Rate</h2>
      </div>
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" app>
      <Sidebar />
    </v-navigation-drawer>
    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
    <v-snackbar
      v-model="snackData.value"
      right
      top
      :color="snackData.color"
    >
      {{ snackData.text }}
    </v-snackbar>
  </v-app>
</template>

<script>
import Sidebar from '@/components/layout/Sidebar'
import { mapGetters } from 'vuex'
export default {
  name: 'App',
  components: {
    Sidebar
  },
  data: () => ({
    drawer: null
  }),
  computed: {
    ...mapGetters({
      snackData: 'snackData'
    })
  }
}
</script>
