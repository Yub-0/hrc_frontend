<template>
  <q-layout view="lHh lpr lFf">
    <q-page-container class="bg-image">
      <q-page class="flex flex-center" id="overlay">
        <div class="row">
          <q-card class="my-card logincard-bg" style="width:400px" flat bordered>
            <q-card-section class="q-pa-xl ">
              <h5 class="text-center q-mb-lg text-white">Restaurant Management System</h5>
              <!-- <div class="col-md-12 text-center q-mb-lg q-mt-sm">
                <q-img src="~assets/starternepal.png" width="200px" height="40px" />
                  </div> -->
              <q-form v-on:keyup.enter="login">
                <ValidationObserver ref="loginForm">
                  <validation-provider name="Username or Email" rules="required" v-slot="{ errors }">
                    <q-input dense filled standout="white" v-model="credentials.email" label="Username or Email"
                      class="q-mb-sm input-background">
                      <template v-slot:prepend>
                        <q-icon name="mail" />
                      </template>
                    </q-input>
                    <p>
                      <span class="text-orange-3 q-pb-sm">{{
                          errors[0]
                      }}</span>
                    </p>
                  </validation-provider>
                  <validation-provider name="Password" rules="required|min:1" v-slot="{ errors }">
                    <q-input dense type="password" filled v-model="credentials.password" label="Password"
                      class="q-mb-sm input-background" :type="isPwd ? 'password' : 'text'">
                      <template v-slot:prepend>
                        <q-icon name="vpn_key" />
                      </template>
                      <template v-slot:append>
                        <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                          @click="isPwd = !isPwd" />
                      </template>
                    </q-input>
                    <p>
                      <span class="text-orange-3">{{ errors[0] }}</span>
                    </p>
                  </validation-provider>
                </ValidationObserver>
                <q-btn text-color="black" label="Login" @click="login()" type="button" color="orange-3" />
              </q-form>
            </q-card-section>
          </q-card>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<script>
import Auth from "../../../services/Auth";

import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode
} from "vee-validate";
import { required, email, min } from "vee-validate/dist/rules";
import { Store } from "../../../store/index.js";
setInteractionMode("eager");
extend("required", {
  ...required,
  message: "{_field_} is required"
});
extend("email", {
  ...email,
  message: "{_field_} must be a valid email"
});
extend("min", {
  ...min,
  message: "{_field_} may not be greater than {length} characters"
});

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
        email: "",
        password: ""
      },
      saveEmail: false,
      isPwd: true
    };
  },
  created() {
    this.checkLogin();
  },
  methods: {
    checkLogin() {
      const access_token = Store.state.user.auth.access;
      if (access_token) {
        this.$router.push({ name: "Dashboard" });
      }
    },
    isRequired(value) {
      return value ? true : "This field is required";
    },
    login() {
      this.$refs.loginForm.validate().then(success => {
        if (!success) {
          return;
        }
        Auth.attempt(this.credentials)
          .then(data => {
            if (!data) {
              return;
            }
            this.$router.push({ name: "Dashboard" });
          })
          .catch(() => {
            this.$q.loading.hide();
            this.$q.notify({
              color: "red-5",
              textColor: "white",
              icon: "warning",
              message: "Email or Password Wrong"
            });
          });
      });
    }
  }
};
</script>
