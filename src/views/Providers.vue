<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="providers"
      sort-by="name"
      class="elevation-1 mx-auto"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Provider List</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            dark
            class="btn mb-2"
            @click="showNewProvider"
          >
            New Provider
          </v-btn>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon
          small
          class="mr-2"
          color="primary"
          @click="editItem(item)"
        >
          fas fa-edit
        </v-icon>
        <v-icon
          small
          class="mr-2"
          color="primary"
          @click="showRate(item)"
        >
          fas fa-info-circle
        </v-icon>
        <v-icon
          small
          color="red"
          @click="deleteItem(item)"
        >
          fas fa-trash
        </v-icon>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data: () => ({
    dialog: false,
    headers: [
      {
        text: 'Provider Id',
        value: 'id'
      },
      {
        text: 'First Name',
        value: 'firstName'
      },
      {
        text: 'Last Name',
        value: 'lastName'
      },
      {
        text: 'Legacy System Id',
        value: 'legacySystemId'
      },
      {
        text: 'Email Address',
        value: 'email'
      },
      {
        text: 'Actions',
        value: 'actions',
        sortable: false
      }
    ]
  }),
  computed: {
    ...mapGetters({
      providers: 'providers'
    })
  },
  created () {
    console.log(this.providers)
  },
  methods: {
    showNewProvider () {
      const params = {
        id: 0,
        title: null,
        firstName: null,
        lastName: null,
        address_1: null,
        address_2: null,
        city: null,
        state: null,
        zipCode: null,
        phoneHome: null,
        phoneMobile: null,
        email: null,
        legacySystemId: null,
        certification: null
      }
      this.$store.dispatch('setProvider', params)
      this.$router.push({
        name: 'newProvider'
      })
    },
    editItem (item) {
      this.$store.dispatch('setProvider', { ...item })
      this.$router.push({
        name: 'newProvider'
      })
    },
    async deleteItem (item) {
      const { success, message, error } = await this.$store.dispatch('deleteProvider', { ...item })
      if (success) {
        const snackData = {
          value: true,
          color: 'success',
          text: message
        }
        await this.$store.dispatch('setSnackData', snackData)
      } else {
        const snackData = {
          value: true,
          color: 'red',
          text: error
        }
        await this.$store.dispatch('setSnackData', snackData)
      }
    },
    showRate () {}
  }
}
</script>
