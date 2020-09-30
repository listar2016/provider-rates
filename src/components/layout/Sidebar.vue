<template>
  <div>
    <v-list nav>
      <v-list-group
        prepend-icon="fas fa-users"
      >
        <template v-slot:activator>
          <v-list-item-title>Providers</v-list-item-title>
        </template>
        <v-list-item-group v-model="item">
          <v-list-item :to="{ name: 'newProvider' }">
            <v-list-item-content>
              <v-list-item-title>New Provider</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item :to="{ name: 'providers' }">
            <v-list-item-content>
              <v-list-item-title>Manage Providers</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list-group>
    </v-list>
  </div>
</template>
<script>
export default {
  name: 'Sidebar',
  data: () => ({
    item: 0
  })
}
</script>
