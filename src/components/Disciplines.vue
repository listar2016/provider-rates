<template>
  <v-form v-model="valid">
    <v-container>
      <v-row>
        <v-col>
          <v-select
            v-model="form.certification"
            :items="certifications"
            chips
            label="Certification"
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
      certification: []
    },
    certifications: ['ST', 'PT', 'OT', 'LCSW']
  }),
  computed: {
    ...mapGetters({
      provider: 'provider'
    })
  },
  watch: {
    provider (value) {
      this.form.certification = value.certification
    }
  },
  methods: {
    async save () {
      const params = {
        ...this.provider,
        certification: this.form.certification
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
      this.$emit('close')
    }
  }
}
</script>
