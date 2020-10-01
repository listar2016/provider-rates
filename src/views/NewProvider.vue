<template>
  <v-row>
    <v-col
      cols="12"
      md="9"
      lg="6"
      class="mx-auto"
    >
      <v-stepper v-model="el">
        <v-stepper-header>
          <v-stepper-step
            :complete="el > 1"
            step="1"
          >
            Provider Information
          </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step
            step="2"
          >
            Disciplines
          </v-stepper-step>
        </v-stepper-header>
        <v-stepper-items>
          <v-stepper-content step="1">
            <ProviderInformation @next="next" @close="close" />
          </v-stepper-content>
          <v-stepper-content step="2">
            <Disciplines @close="close" />
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-col>
  </v-row>
</template>
<script>
import ProviderInformation from '@/components/ProviderInformation'
import Disciplines from '@/components/Disciplines'
export default {
  name: 'NewProvider',
  components: {
    ProviderInformation,
    Disciplines
  },
  data: () => ({
    el: 1
  }),
  methods: {
    next () {
      this.el++
    },
    close () {
      this.$router.push({
        name: 'providers'
      })
    }
  }
}
</script>
