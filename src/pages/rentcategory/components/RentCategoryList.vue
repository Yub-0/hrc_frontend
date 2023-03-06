<template>
  <div>
    <div class="row q-pt-md">
      <div class="col-6">
        
        <q-card class="my-card q-mt-xm">
            <div class="row q-col-gutter-x-md">
                <div class="col-lg-12 col-md-12">
                  <q-markup-table class="q-pa-md">
                    <thead>
                      <tr>
                        <th class="text-left">Category</th>
                        <th class="text-left">Per</th>
                        <th class="text-left">Amount</th>
                        <th class="text-left">Unit</th>
                        <th class="text-left">Mandetory</th>
                        <th class="text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(cat, index) in category" :key="index">
                        <td class="text-left">{{ cat.category }}</td>
                        <td class="text-left" v-if="cat.per">{{ cat.per }}</td>
                        <td class="text-left" v-else>-</td>
                        <td class="text-left" v-if="cat.amount">{{ cat.amount }}</td>
                        <td class="text-left" v-else>-</td>
                        <td class="text-left">{{ cat.unit }}</td>
                        <td class="text-left">{{ cat.mandetory }}</td>
                        <td class="text-left">
                          <span>
                            <q-btn @click="updateCategory(cat)" size="0.65rem" padding="sm sm" dense push class="edit-btn"
                              color="red-5" icon="update">
                              <q-tooltip>update</q-tooltip>
                            </q-btn>
                          </span>
                          <span class="q-ml-md">
                            <q-btn @click="deleteCategory(cat)" size="0.65rem" padding="sm sm" dense push class="edit-btn"
                              color="red-5" icon="delete">
                              <q-tooltip>delete</q-tooltip>
                            </q-btn>
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </q-markup-table>
                </div>
                <!-- <div class="col-12">
                    <q-tab-panels v-model="tab" animated keep-alive>
                        <q-tab-panel style="padding: 4px !important" name="register">
                            <AddHouse />
                        </q-tab-panel>
                        
                    </q-tab-panels>
                </div> -->
            </div>
        </q-card>
      </div>
    </div>
  
  </div>
</template>

<script>
import { getRentCategory } from "../api/calls"
export default {
  components: {  },
  created() {
    this.fetchHouse()
  },
  data: () => ({
    tab:"register",
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
    category:[]
  }),
  
  methods: {
    async fetchHouse(){
      await getRentCategory().then(res => {
        this.category = res.data;
      });
    },
    updateCategory(cat){

    },
    deleteCategory(cat){

    }  
  }
};
</script>