<template>
  <v-card>
    <v-card-title class="headline">
      Add new rate
    </v-card-title>
    <v-card-text>
      <v-form v-model="valid">
        <v-row>
          <v-col>
            <v-menu
                v-model="isEffectiveDate"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="250px"
              >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="form.effective_date"
                  label="Effective date"
                  prepend-icon="far fa-calendar-alt"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  dense
                  :error-messages="effectiveDateErrors"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="form.effective_date"
                @input="changeDate"
              ></v-date-picker>
            </v-menu>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-select
              :items="taxStatuses"
              label="Tax Status"
              v-model="form.tax_status"
              dense
              :error-messages="taxStatusErrors"
              @change="$v.form.tax_status.$touch()"
              @blur="$v.form.tax_status.$touch()"
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-select
              :items="disciplines"
              label="Discipline"
              v-model="form.discipline"
              dense
              :error-messages="disciplineErrors"
              @change="$v.form.discipline.$touch()"
              @blur="$v.form.discipline.$touch()"
            ></v-select>
          </v-col>
          <v-col>
            <v-select
              :items="services"
              label="Service"
              v-model="form.service"
              dense
              :error-messages="serviceErrors"
              @change="$v.form.service.$touch()"
              @blur="$v.form.service.$touch()"
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-select
              :items="programs"
              label="Program"
              v-model="form.program"
              dense
              :error-messages="programErrors"
              @change="$v.form.program.$touch()"
              @blur="$v.form.program.$touch()"
            ></v-select>
          </v-col>
          <v-col>
            <v-select
              :items="locations"
              label="Location"
              v-model="form.location"
              dense
              :error-messages="locationErrors"
              @change="$v.form.location.$touch()"
              @blur="$v.form.location.$touch()"
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-select
              :items="unitTypes"
              label="Unit Type"
              v-model="form.unit_type"
              dense
              :error-messages="unitTypeErrors"
              @change="$v.form.unit_type.$touch()"
              @blur="$v.form.unit_type.$touch()"
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-checkbox
              v-model="form.is_group"
              label="Group"
              dense
              hide-details="auto"
              class="mt-0"
            ></v-checkbox>
          </v-col>
          <v-col>
            <v-select
              v-if="form.is_group"
              :items="groupSizes"
              label="Group Size"
              v-model="form.group"
              dense
              :error-messages="groupErrors"
              @change="$v.form.group.$touch()"
              @blur="$v.form.group.$touch()"
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-checkbox
              v-model="form.is_bilingual"
              label="Bilingual"
              dense
              hide-details="auto"
              class="mt-0"
            ></v-checkbox>
          </v-col>
          <v-col>
            <v-select
              v-if="form.is_bilingual"
              :items="languages"
              label="Bilingual"
              v-model="form.bilingual"
              dense
              :error-messages="bilingualErrors"
              @change="$v.form.bilingual.$touch()"
              @blur="$v.form.bilingual.$touch()"
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              v-model="form.rate_amount"
              label="Rate amount"
              dense
              prefix="$"
              type="number"
              min="0"
              step="0.01"
              :error-messages="rateAmountErrors"
              @input="$v.form.rate_amount.$touch()"
              @blur="$v.form.rate_amount.$touch()"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        color="primary"
        text
        @click="$emit('close')"
      >
        Cancel
      </v-btn>
      <v-btn
        color="primary"
        @click="saveRates()"
        :disabled="!valid"
      >
        Save
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import { mapGetters } from 'vuex'
import { validationMixin } from 'vuelidate'
import { required, minValue, requiredIf } from 'vuelidate/lib/validators'
export default {
  name: 'NewRatesModal',
  mixins: [validationMixin],
  props: ['providerId'],
  data: () => ({
    valid: false,
    isEffectiveDate: false,
    form: {
      effective_date: null,
      tax_status: '',
      discipline: null,
      service: null,
      program: null,
      location: null,
      unit_type: null,
      group: null,
      is_group: false,
      is_bilingual: false,
      bilingual: null,
      rate_amount: null
    },
    groupSizes: [2, 3, 4, 5]
  }),
  computed: {
    ...mapGetters({
      taxStatuses: 'taxStatuses',
      disciplines: 'disciplines',
      services: 'services',
      programs: 'programs',
      unitTypes: 'unitTypes',
      languages: 'languages',
      locations: 'locations'
    }),
    effectiveDateErrors () {
      const errors = []
      if (!this.$v.form.effective_date.$dirty) return errors
      !this.$v.form.effective_date.required && errors.push('Effective date is required')
      return errors
    },
    taxStatusErrors () {
      const errors = []
      if (!this.$v.form.tax_status.$dirty) return errors
      !this.$v.form.tax_status.required && errors.push('Tax status is required')
      return errors
    },
    disciplineErrors () {
      const errors = []
      if (!this.$v.form.discipline.$dirty) return errors
      !this.$v.form.discipline.required && errors.push('Discipline is required')
      return errors
    },
    serviceErrors () {
      const errors = []
      if (!this.$v.form.service.$dirty) return errors
      !this.$v.form.service.required && errors.push('Service is required')
      return errors
    },
    rateAmountErrors () {
      const errors = []
      if (!this.$v.form.rate_amount.$dirty) return errors
      !this.$v.form.rate_amount.required && errors.push('Rate amount is required')
      !this.$v.form.rate_amount.minValue && errors.push('Rate amount is invalid')
      return errors
    },
    programErrors () {
      const errors = []
      if (!this.$v.form.program.$dirty) return errors
      !this.$v.form.program.required && errors.push('Program is required')
      return errors
    },
    locationErrors () {
      const errors = []
      if (!this.$v.form.location.$dirty) return errors
      !this.$v.form.location.required && errors.push('Locations is required')
      return errors
    },
    unitTypeErrors () {
      const errors = []
      if (!this.$v.form.unit_type.$dirty) return errors
      !this.$v.form.unit_type.required && errors.push('Unit type is required')
      return errors
    },
    groupErrors () {
      const errors = []
      if (!this.$v.form.group.$dirty) return errors
      !this.$v.form.group.required && errors.push('Group size is required')
      return errors
    },
    bilingualErrors () {
      const errors = []
      if (!this.$v.form.bilingual.$dirty) return errors
      !this.$v.form.bilingual.required && errors.push('Bilingual is required')
      return errors
    }
  },
  validations: {
    form: {
      effective_date: { required },
      tax_status: { required },
      discipline: { required },
      service: { required },
      program: { required },
      location: { required },
      unit_type: { required },
      rate_amount: {
        required,
        minValue: minValue(0)
      },
      group: {
        required: requiredIf((form) => {
          return form.is_group
        })
      },
      bilingual: {
        required: requiredIf((form) => {
          return form.is_bilingual
        })
      }
    }
  },
  methods: {
    changeDate () {
      this.$v.form.effective_date.$touch()
      this.isEffectiveDate = false
    },
    async saveRates () {
      this.$v.form.$touch()
      if (this.$v.form.$invalid) {
        return
      }
      const params = {
        provider_id: this.providerId,
        ...this.form
      }
      const response = await this.$store.dispatch('addRate', params)
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
