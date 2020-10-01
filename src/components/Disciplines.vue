<template>
  <v-form v-model="valid">
    <v-container>
      <v-row>
        <v-col>
          <v-select
            v-model="form.disciplines"
            :items="disciplines"
            chips
            label="Disciplines"
            multiple
            dense
            small-chips
          ></v-select>
        </v-col>
      </v-row>
      <v-btn
        color="primary"
        @click="save"
        :disabled="!valid"
      >
        Save
      </v-btn>
    </v-container>
  </v-form>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Disciplines',
  data: () => ({
    valid: false,
    form: {
      disciplines: []
    },
    disciplines: ['ST', 'PT', 'OT', 'LCSW']
  }),
  computed: {
    ...mapGetters({
      provider: 'provider'
    })
  },
  watch: {
    provider (value) {
      this.form.disciplines = value.disciplines
    }
  },
  methods: {
    async save () {
      const params = {
        ...this.provider,
        disciplines: this.form.disciplines
      }
      let response
      if (this.provider.id > 0) {
        response = await this.$store.dispatch('updateProvider', params)
      } else {
        response = await this.$store.dispatch('addProvider', params)
      }
      const { success, message, error } = response
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
      this.$emit('close')
    }
  }
}
</script>
