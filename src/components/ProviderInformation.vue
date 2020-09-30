<template>
  <v-row>
    <v-col
      cols="12"
      lg="9"
      xl="6"
      class="mx-auto"
    >
      <v-form v-model="valid">
        <!-- <v-row>
          <v-col>
            <v-text-field
              v-model="form.title"
              label="Title"
              dense
              :error-messages="titleErrors"
              @input="$v.form.title.$touch()"
              @blur="$v.form.title.$touch()"
            ></v-text-field>
          </v-col>
        </v-row> -->
        <v-row>
          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="form.firstName"
              label="First Name"
              dense
              :error-messages="firstNameErrors"
              @input="$v.form.firstName.$touch()"
              @blur="$v.form.firstName.$touch()"
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="form.lastName"
              label="Last Name"
              dense
              :error-messages="lastNameErrors"
              @input="$v.form.lastName.$touch()"
              @blur="$v.form.lastName.$touch()"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              v-model="form.address_1"
              label="Street address line 1"
              dense
              :error-messages="addressOneErrors"
              @input="$v.form.address_1.$touch()"
              @blur="$v.form.address_1.$touch()"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              v-model="form.address_2"
              label="Street address line 2"
              dense
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="form.city"
              label="City"
              dense
              :error-messages="cityErrors"
              @input="$v.form.city.$touch()"
              @blur="$v.form.city.$touch()"
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            md="3"
          >
            <v-select
              :items="usStates"
              label="State"
              v-model="form.state"
              dense
              :error-messages="stateErrors"
              @change="$v.form.state.$touch()"
              @blur="$v.form.state.$touch()"
            ></v-select>
          </v-col>
          <v-col
            cols="12"
            md="3"
          >
            <v-text-field
              v-model="form.zipCode"
              label="Zip code"
              dense
              :error-messages="zipCodeErrors"
              @input="$v.form.zipCode.$touch()"
              @blur="$v.form.zipCode.$touch()"
              v-mask="maskZipCode"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="form.phoneHome"
              label="Home phone"
              dense
              :error-messages="phoneHomeErrors"
              @input="$v.form.phoneHome.$touch()"
              @blur="$v.form.phoneHome.$touch()"
              v-mask="maskPhone"
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="form.phoneMobile"
              label="Mobile phone"
              dense
              :error-messages="phoneMobileErrors"
              @input="$v.form.phoneMobile.$touch()"
              @blur="$v.form.phoneMobile.$touch()"
              v-mask="maskPhone"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="form.email"
              label="Email address"
              dense
              :error-messages="emailErrors"
              @input="$v.form.email.$touch()"
              @blur="$v.form.email.$touch()"
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="form.legacySystemId"
              label="Legacy System Id"
              dense
              :error-messages="legacySystemIdErrors"
              @input="$v.form.legacySystemId.$touch()"
              @blur="$v.form.legacySystemId.$touch()"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-btn
          color="primary"
          @click="next"
          :disabled="!valid"
        >
          Next
        </v-btn>
      </v-form>
    </v-col>
  </v-row>
</template>
<script>
import { validationMixin } from 'vuelidate'
import { required, email } from 'vuelidate/lib/validators'
import { mask } from 'vue-the-mask'
import { mapGetters } from 'vuex'
export default {
  name: 'ProviderInformation',
  directives: { mask },
  mixins: [validationMixin],
  data: () => ({
    valid: false,
    form: {
      // title: null,
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
      legacySystemId: null
    },
    maskZipCode: '#####',
    maskPhone: '(###) ####-####'
  }),
  computed: {
    ...mapGetters({
      usStates: 'usStates',
      provider: 'provider'
    }),
    // titleErrors () {
    //   const errors = []
    //   if (!this.$v.form.title.$dirty) return errors
    //   !this.$v.form.title.required && errors.push('Title is required')
    //   return errors
    // },
    firstNameErrors () {
      const errors = []
      if (!this.$v.form.firstName.$dirty) return errors
      !this.$v.form.firstName.required && errors.push('First Name is required')
      return errors
    },
    lastNameErrors () {
      const errors = []
      if (!this.$v.form.lastName.$dirty) return errors
      !this.$v.form.lastName.required && errors.push('Last Name is required')
      return errors
    },
    addressOneErrors () {
      const errors = []
      if (!this.$v.form.address_1.$dirty) return errors
      !this.$v.form.address_1.required && errors.push('Street address line 1 is required')
      return errors
    },
    cityErrors () {
      const errors = []
      if (!this.$v.form.city.$dirty) return errors
      !this.$v.form.city.required && errors.push('City is required')
      return errors
    },
    stateErrors () {
      const errors = []
      if (!this.$v.form.state.$dirty) return errors
      !this.$v.form.state.required && errors.push('State is required')
      return errors
    },
    zipCodeErrors () {
      const errors = []
      if (!this.$v.form.zipCode.$dirty) return errors
      !this.$v.form.zipCode.required && errors.push('Zip code is required')
      return errors
    },
    phoneHomeErrors () {
      const errors = []
      if (!this.$v.form.phoneHome.$dirty) return errors
      !this.$v.form.phoneHome.required && errors.push('Home phone is required')
      return errors
    },
    phoneMobileErrors () {
      const errors = []
      if (!this.$v.form.phoneMobile.$dirty) return errors
      !this.$v.form.phoneMobile.required && errors.push('Mobile phone is required')
      return errors
    },
    emailErrors () {
      const errors = []
      if (!this.$v.form.email.$dirty) return errors
      !this.$v.form.email.required && errors.push('Email is required')
      !this.$v.form.email.email && errors.push('Must be valid e-mail')
      return errors
    },
    legacySystemIdErrors () {
      const errors = []
      if (!this.$v.form.legacySystemId.$dirty) return errors
      !this.$v.form.legacySystemId.required && errors.push('Legacy system id is required')
      return errors
    }
  },
  validations: {
    form: {
      // title: { required },
      firstName: { required },
      lastName: { required },
      address_1: { required },
      city: { required },
      state: { required },
      zipCode: { required },
      phoneHome: { required },
      phoneMobile: { required },
      email: { required, email },
      legacySystemId: { required }
    }
  },
  created () {
    this.form = {
      ...this.form,
      ...this.provider
    }
  },
  methods: {
    async next () {
      this.$v.form.$touch()
      if (this.$v.form.$invalid) {
        return
      }
      this.$store.dispatch('setProvider', { ...this.form })
      this.$emit('next')
    }
  }
}
</script>
