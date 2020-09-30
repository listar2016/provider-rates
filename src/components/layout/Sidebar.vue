<template>
  <div>
    <v-list nav>
      <v-list-item-group v-model="item" color="primary">
        <v-list-item :to="{ name: 'providers' }">
          <v-list-item-content>
            <v-list-item-title> Providers</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
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
