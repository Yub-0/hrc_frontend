<template>
  <div>
    <q-layout view="hHh Lpr lff">
      <q-header class="bg-white text-black shadow-2">
        <q-toolbar>
          <div class="q-mini-drawer-hide absolute-left" style="top: 8px;left:10px">
            <q-btn dense round color="white-1" @click="miniState = true" text-color="black">
              <q-icon><iconify-icon icon="ic:sharp-menu-open"></iconify-icon></q-icon>
            </q-btn>
          </div>
          <q-toolbar-title class="q-ml-xl">
            <h5>HR System</h5>
          </q-toolbar-title>
          <q-space />
          <div>
            <q-btn class="font-semibold" flat color="red-5" @click="logoutUser()" icon="logout"
              to="/"><q-tooltip>Logout</q-tooltip></q-btn>
          </div>
        </q-toolbar>
      </q-header>
      <q-drawer v-model="drawer" show-if-above :mini="!drawer || miniState" @click.capture="drawerClick" :width="250"
        :breakpoint="500" @mouseover="miniState = false" bordered>
        <q-scroll-area class="fit">
          <q-list padding>
            <q-item to="/dashboard" clickable v-ripple active-class="tab-active">
              <q-item-section avatar>
                <q-icon><iconify-icon icon="bxs:dashboard"></iconify-icon></q-icon>
              </q-item-section>
              <q-item-section>
                Dashboard
              </q-item-section>
            </q-item>
            
            <q-expansion-item icon="inventory" label="House" active-class="tab-active">
              <q-list class="q-pl-lg">
                <q-item to="/house" active-class="tab-active">
                  <q-item-section avatar>
                    <q-icon>
                      <iconify-icon icon="mdi:shop"></iconify-icon>
                    </q-icon>
                  </q-item-section>
                  <q-item-section>
                    Settings
                  </q-item-section>
                </q-item>  
                <q-item to="/room" active-class="tab-active">
                  <q-item-section avatar>
                    <q-icon>
                      <iconify-icon icon="mdi:shop"></iconify-icon>
                    </q-icon>
                  </q-item-section>
                  <q-item-section>
                    Room
                  </q-item-section>
                </q-item>
                <q-item to="/rentcategory" active-class="tab-active">
                  <q-item-section avatar>
                    <q-icon>
                      <iconify-icon icon="mdi:shop"></iconify-icon>
                    </q-icon>
                  </q-item-section>
                  <q-item-section>
                    Rent Category
                  </q-item-section>
                </q-item>
              </q-list>
            </q-expansion-item>   
            <q-separator />
            <q-item to="/rent" clickable v-ripple active-class="tab-active">
              <q-item-section avatar>
                <q-icon><iconify-icon icon="bxs:dashboard"></iconify-icon></q-icon>
              </q-item-section>
              <q-item-section>
                Rent
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>
      </q-drawer>
      <q-page-container>
        <router-view />
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
// import RestaurantSetting from "src/pages/restaurantsettings/RestaurantSetting.vue";
import Auth from "../services/Auth";
export default {
  data: () => ({
    drawer: false,
    miniState: false,
    restaurant: false
  }),
  methods: {
    logoutUser() {
      Auth.logout();
      this.$router.push({ name: "Login" });
    },
    closeForm() {
      this.restaurant = false
    }
  },
  // components: { RestaurantSetting }
};
</script>
