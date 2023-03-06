<template>
  <div class="q-pa-lg">
    <q-markup-table class="q-pa-md">
      <thead>
        <tr>
          <th class="text-left">Tenant Name</th>
          <th class="text-left">Room </th>
          <th class="text-left">Room Rent</th>
          <th class="text-left" v-for="cat in category" :key="cat.id">{{ cat.category }}({{ cat.per }} per {{ cat.unit }})
            <q-tooltip>{{ cat }}</q-tooltip>
          </th>
          <th class="text-left">Total</th>
          <th class="text-left">Total Paid</th>
          <th class="text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(stck, index) in rentRoom" :key="index">
          <td class="text-left">{{ stck.tenant.name }}</td>
          <td class="text-left">{{ stck.room.room }}</td>
          <td class="text-left">{{ stck.room.room_rent }}</td>
          <td class="text-left" v-for="(cat, key) in stck.category" :key="key">
            <q-input rounded outlined v-if="cat.amount && !cat.per" v-model="cat.amount" @input="onInput" :label="cat.category" disable/>
            <q-input rounded outlined v-else v-model="cat.amount" @input="onInput" :label="cat.category"/>
          </td>
          <td class="text-left">{{ getTotal(stck) }}</td>
          <td class="text-left">
            <q-input rounded outlined v-model="stck.total_paid" @input="onInput"/>
          </td>
          <td class="text-center table">
            <span>
              <q-btn @click="submitItems(stck, false)" size="0.65rem" padding="sm sm" dense push class="edit-btn"
                color="red-5" icon="save">
                <q-tooltip>submit</q-tooltip>
              </q-btn>
            </span>
            <span class="q-ml-md">
              <q-btn @click="submitItems(stck, true)" size="0.65rem" padding="sm sm" dense push class="edit-btn"
                color="red-5" icon="update">
                <q-tooltip>save</q-tooltip>
              </q-btn>
            </span>
          </td>
        </tr>
      </tbody>
      <tbody>
        <tr v-for="(stck, index) in paidRents" :key="index">
          <td class="text-left">{{ stck.room.tenant.name }}</td>
          <td class="text-left">{{ stck.room.room.room }}</td>
          <td class="text-left">{{ stck.room.room.room_rent }}</td>
          <td class="text-left" v-for="(cat, key) in stck.rent_category" :key="key">
            <q-input rounded outlined v-if="cat.amount && !cat.per" v-model="cat.amount" @input="onInput" :label="cat.category.category" disable/>
            <q-input rounded outlined v-else v-model="cat.category.amount" @input="onInput" :label="cat.category.category"/>
          </td>
          <td class="text-left">{{ stck.total_amount }}</td>
          <td class="text-left">
            <q-input rounded outlined v-if="stck.is_paid" v-model="stck.total_paid" @input="onInput" disable/>
            <q-input rounded outlined v-else v-model="stck.total_paid" @input="onInput"/>
          </td>
          <td class="text-center table" v-if="!stck.is_paid">
            <span>
              <q-btn @click="submitItems(stck, false)" size="0.65rem" padding="sm sm" dense push class="edit-btn"
                color="red-5" icon="save">
                <q-tooltip>submit</q-tooltip>
              </q-btn>
            </span>
          </td>
          
          <td class="text-center table" v-else>
            <span>
              <q-btn size="0.85rem" padding="sm sm" dense push class="edit-btn"
                color="green-5" label="
                Payment Done" disable/>
              
            </span>
          </td>
        </tr>
      </tbody>
    
    </q-markup-table>
  </div>
</template>
<script>
import NepaliDate from 'nepali-date-converter'

import { getRent, getRentCategory, getRentRoom, postRent } from '../api/calls'
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode
} from 'vee-validate'
import { required, numeric, min, max } from 'vee-validate/dist/rules'

setInteractionMode('eager')
extend('required', {
  ...required,
  message: '{_field_} is required'
})
extend('numeric', {
  ...numeric,
  message: '{_field_} must be numbers'
})
extend('min', {
  ...min,
  message: '{_field_} may not be less than {length} numbers'
})
extend('max', {
  ...max,
  message: '{_field_} may not be greater than {length} numbers'
})

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      show:false,
      category:[],
      rentRoom:[],
      paidRents:[]
    }
  },
  created: function () {
    this.fetchRentCategory()
    this.fetchRentRoom()
    this.fetchPaidRent()
  },
  watch: {
  },
  computed:{
  },
  methods: {
    fetchPaidRent(){
      getRent({ paid:true}).then(res =>{
        this.paidRents = res.data
      })
    },
    submitItems(stck, save){
      console.log(save)
      var cat_total = 0
      stck.category.forEach(c =>{
        if(c.amount){
          if(c.per){
            cat_total += (parseFloat(c.amount)*parseFloat(c.per))
          }else{
            cat_total += parseFloat(c.amount)
          }
        }
      })
      cat_total += parseFloat(stck.room.room_rent)
      let catArray = []
      stck.category.forEach(s =>{
        let d = {
          category:s.id,
          amount:s.amount
        }
        catArray.push(d)
      })
      const passingValue = {
        total_paid:stck.total_paid,
        save:!save,
        tenant:stck.tenant.id,
        room:stck.room.id,
        total_amount:cat_total,
        extra_charge:null,
        category:catArray
      }
      postRent(passingValue).then(res =>{

      })

    },
    getTotal(stck){
      var cat_total = 0
      stck.category.forEach(c =>{
        if(c.amount){
          if(c.per){
            cat_total += (parseFloat(c.amount)*parseFloat(c.per))
          }else{
            cat_total += parseFloat(c.amount)
          }
        }
      })
      return parseFloat(stck.room.room_rent)+cat_total
    },
    onInput(val, stck, key) {  
      this.model = val;
      if (val && val < 0) {
          this.model = 0;
      }
    },
    async fetchRentCategory(){
      await getRentCategory().then(res => {
        this.category = res.data;
      });
    },
    async fetchRentRoom(){
      await getRentRoom().then(res => {
        this.rentRoom = res.data;
        const cat = JSON.parse(JSON.stringify(this.category))
        this.rentRoom = this.rentRoom.map(r => ({
          ...r, total_paid:null, category:JSON.parse(JSON.stringify(this.category))
        })
        ) 
      });
      },
    }
}
</script>
