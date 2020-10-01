<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="realRates"
      sort-by="effective_date"
      class="elevation-1 mx-auto"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Rates List</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            dark
            class="btn mb-2"
            @click="dialog = true"
          >
            New Rate
          </v-btn>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon
          x-small
          color="primary"
          @click="deleteItem(item)"
        >
          fas fa-trash
        </v-icon>
      </template>
    </v-data-table>
    <v-dialog
      v-model="dialog"
      persistent
      width="500"
    >
      <NewRatesModal
        v-if="dialog"
        :providerId="id"
        @close="dialog = false"
      />
    </v-dialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import NewRatesModal from '@/components/NewRatesModal'
export default {
  name: 'Rates',
  components: {
    NewRatesModal
  },
  props: ['id'],
  data: () => ({
    dialog: false,
    headers: [
      {
        text: 'Effective date',
        value: 'effective_date'
      },
      {
        text: 'Tax Status',
        value: 'tax_status',
        sortable: false
      },
      {
        text: 'Discipline',
        value: 'discipline',
        sortable: false
      },
      {
        text: 'Service',
        value: 'service',
        sortable: false
      },
      {
        text: 'Program',
        value: 'program',
        sortable: false
      },
      {
        text: 'Location',
        value: 'location',
        sortable: false
      },
      {
        text: 'Unit Type',
        value: 'unit_type',
        sortable: false
      },
      {
        text: 'Group',
        value: 'group',
        sortable: false
      },
      {
        text: 'Bilingual',
        value: 'bilingual',
        sortable: false
      },
      {
        text: 'Rate amount',
        value: 'rate_amount',
        sortable: false
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
      rates: 'rates'
    }),
    realRates () {
      return this.rates.filter(item => item.provider_id === this.id)
    }
  },
  created () {
    console.log(this.rates)
    console.log(this.id)
  },
  methods: {
    async deleteItem (item) {
      const { success, message, error } = await this.$store.dispatch('deleteRate', { ...item })
      if (success) {
        const snackData = {
          value: true,
          color: 'primary',
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
    }
  }
}
</script>
