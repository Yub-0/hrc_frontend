<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex flex-center">
        <div class="row">
          <q-card class="my-card shadow-2" style="width:600px" flat bordered>

            <q-card-section class="text-center" style="border-right:1px solid #ddd">
              <!-- <q-img src="~assets/logo.png" width="60px" class="" /> -->
              <p class="text-h6 font-bold q-mb-none">Register Employee</p>
              <p class="font-semibold q-mb-md" style="font-size:12px">
              </p>

              <q-input class="login-input q-mb-md" rounded outlined color="deep-orange" dense label="First Name">
                <template v-slot:prepend>
                  <q-icon name="house" />
                </template>
              </q-input>

              <q-input class="login-input q-mb-md" rounded outlined color="deep-orange" dense label="Last Name">
                <template v-slot:prepend>
                  <q-icon name="house" />
                </template>
              </q-input>

              <q-input class="login-input q-mb-md" rounded outlined color="deep-orange" dense v-model="email"
                label="Email">
                <template v-slot:prepend>
                  <q-icon name="mail" />
                </template>
              </q-input>

              <q-input class="login-input q-mb-md" rounded outlined color="deep-orange" dense v-model="contact"
                label="Contact No.">
                <template v-slot:prepend>
                  <q-icon name="call" />
                </template>
              </q-input>
              <q-input class="login-input q-mb-md" rounded outlined color="deep-orange" dense v-model="contact"
                label="Role">
                <template v-slot:prepend>
                  <q-icon name="location_on" />
                </template>
              </q-input>

              <q-input class="login-input q-mb-md" rounded outlined color="deep-orange" dense v-model="contact"
                label="Contact No.">
                <template v-slot:prepend>
                  <q-icon name="call" />
                </template>
              </q-input>
              <q-input class="login-input q-mb-md" rounded outlined color="deep-orange" dense v-model="contact"
                label="Resturant">
                <template v-slot:prepend>
                  <q-icon name="location_on" />
                </template>
              </q-input>


              <q-input v-model="password" label="Password" class="login-input relative-position q-mt-sm" rounded
                outlined dense color="deep-orange" :type="isPwd ? 'password' : 'text'">
                <template v-slot:prepend>
                  <q-icon name="vpn_key" />
                </template>
                <template v-slot:append>
                  <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                    @click="isPwd = !isPwd" />
                </template>
              </q-input>

              <q-input v-model="password" label="Confirm Password" class="login-input relative-position q-mt-sm" rounded
                outlined dense color="deep-orange" :type="isPwd ? 'password' : 'text'">
                <template v-slot:prepend>
                  <q-icon name="vpn_key" />
                </template>
                <template v-slot:append>
                  <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                    @click="isPwd = !isPwd" />
                </template>
              </q-input>
              <div class="text-center q-mt-md">
                <q-btn size="16px" padding="xs xl" class="gradient-btn" dense push text-color="orange" label="Register"
                  @click="register" />
              </div>
            </q-card-section>
          </q-card>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<script>
import Auth from '../../../services/Auth'

import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode
} from 'vee-validate'
import { required, email, min } from 'vee-validate/dist/rules'

setInteractionMode('eager')
extend('required', {
  ...required,
  message: '{_field_} is required'
})
extend('email', {
  ...email,
  message: '{_field_} must be a valid email'
})
extend('min', {
  ...min,
  message: '{_field_} may not be greater than {length} characters'
})

export default {
  components: {
    ValidationProvider,
    ValidationObserver
  },

  data() {
    return {
      slide: 1,
      autoplay: true,
      loading: false,
      credentials: {
        email: '',
        password: ''
      },
      saveEmail: false,
      isPwd: true
    }
  },
  methods: {
    isRequired(value) {
      return value ? true : 'This field is required'
    },
    login() {
      this.$refs.loginForm.validate().then(success => {
        if (!success) {
          return
        }
        Auth.attempt(this.credentials)
          .then(data => {
            if (!data) {
              return
            }
            this.$router.push({ name: 'Dashboard' })
          })
          .catch(() => {
            this.$q.loading.hide()
            this.$q.notify({
              color: 'red-5',
              textColor: 'white',
              icon: 'warning',
              message: 'Email or Password Wrong'
            })
          })
      })
    }
  }
}
</script>
