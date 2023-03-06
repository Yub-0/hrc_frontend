<template>
  <div>
    <div class="row q-pt-md">
      <div class="col-6">
        
        <q-card class="my-card q-mt-xm">
            <div class="row q-col-gutter-x-md">
                <div class="col-lg-12 col-md-12">
                    <q-tabs v-model="tab" dense class="text-grey" active-color="primary" indicator-color="primary"
                        align="justify" narrow-indicator>
                        <q-tab v-for="house in houses" :key="house.id" :name='house.plate_no' :label='house.plate_no' />
                    </q-tabs>
                </div>
                <div class="col-12">
                    <q-tab-panels v-model="tab" animated keep-alive>
                        <!-- <div  v-for="house in houses" :key="house.id"> -->
                          <q-tab-panel v-for="house in houses" :key="house.id" style="padding: 4px !important" :name='house.plate_no'>
                            {{ house.plate_no }}
                          </q-tab-panel>
                        <!-- </div> -->
                    </q-tab-panels>
                </div>
            </div>
        </q-card>
      </div>
    </div>
  
  </div>
</template>

<script>
import { getHouse } from "../api/calls"
export default {
  components: {  },
  created() {
    this.fetchHouse()
  },
  data: () => ({
    tab:'',
    customers: [],
    sender: {},
    search: "",
    last_page: "",
    current_page: "",
    next_page: "",
    previous_page: "",
    options: {
      page: 1,
      itemsPerPage: 5
    },
    status: false,
    add: false,
    houses:[]
  }),
  
  methods: {
    async fetchHouse(){
      await getHouse().then(res => {
        this.houses = res.data;
        if(this.houses){
          this.tab = this.houses[0].plate_no
        }
      });
    }  
  }
};
</script>