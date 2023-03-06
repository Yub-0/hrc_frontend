<template>
  <div>
    <div class="row q-pt-md">
      <form ref="custForm">
        <ValidationObserver ref="customerForm">
          <div class="row q-col-gutter-md">
            <div class="col-4">
              <q-input filled standout="bg-orange-3" bg-color="orange-2" v-model="category" label="Category"
                  dense />
              </div>
            <div class="col-4">
              <validation-provider name="Address" rules="required" v-slot="{ errors }">
                <q-input filled standout="bg-orange-3" bg-color="orange-2" v-model="per" label="Per"
                  dense />
                <span class="text-red-500">{{ errors[0] }}</span>
              </validation-provider>
            </div>
            <div class="col-4">
                <q-input filled standout="bg-orange-3" bg-color="orange-2" v-model="amount" label="Amount"
                  dense />
            </div>
            <div class="col-4">
              <validation-provider name="Floors" rules="required" v-slot="{ errors }">
              <q-input filled standout="bg-orange-3" bg-color="orange-2" v-model="unit" label="Unit"
                  dense />
                <span class="text-red-500">{{ errors[0] }}</span>
              </validation-provider>
            </div>
            <q-toggle v-model="mandetory" label="Mandetory"/>
          </div>
          
          <div class="row q-mt-md">
            <q-btn @click="add()">Add</q-btn>
          
          </div>
        </ValidationObserver>
      </form>
    </div>
  </div>
</template>

<script>
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";
import { required, numeric, digits } from "vee-validate/dist/rules";

setInteractionMode("eager");
extend("required", {
  ...required,
  message: "{_field_} is required",
});
extend("numeric", {
  ...numeric,
  message: "{_field_} must be numbers",
});
extend("digits", {
  ...digits,
  message: "{_field_} must contain exactly {length} numbers",
});
import { postRentCategory } from "../api/calls";
export default {
  components: { ValidationProvider, ValidationObserver },
  created() {
  },
  data() {
    return {
      unit:'',
      category:'',
      per:null,
      amount:null,
      mandetory:false
    };
  },
  methods: {
    async add() {
      if (!(await this.$refs.customerForm.validate())) {
        return;
      }
      var sendData = {
        category:this.category,
        unit:this.unit,
        per:this.per,
        amount:this.amount,
        mandetory:this.mandetory
      }
      try {
        await postRentCategory(sendData);
        this.$q.notify({
          message: "House Registered",
          color: "green-5",
          icon: "info",
        });
        this.category = ''
        this.unit = ''
        this.amount = null
        this.per = null
        this.mandetory = false
        // if (this.addCust) {
        //   this.$emit("closeAdd")
        // }
      } catch (error) {
        this.$q.notify({
          message: "Unable to Register House",
          color: "red-5",
          icon: "warning",
        });
      }
    }
  },
  computed: {

  },
  watch: {
  },
};
</script>