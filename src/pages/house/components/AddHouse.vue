<template>
  <div>
    <div class="row q-pt-md">
      <form ref="custForm">
        <ValidationObserver ref="customerForm">
          <div class="row q-col-gutter-md">
            <div class="col-4">
              <q-input filled standout="bg-orange-3" bg-color="orange-2" v-model="plateNo" label="Plate No."
                  dense />
              </div>
            <div class="col-4">
              <validation-provider name="Address" rules="required" v-slot="{ errors }">
                <q-input filled standout="bg-orange-3" bg-color="orange-2" v-model="address" label="Address"
                  dense />
                <span class="text-red-500">{{ errors[0] }}</span>
              </validation-provider>
            </div>
            <div class="col-4">
                <q-input filled standout="bg-orange-3" bg-color="orange-2" v-model="image" label="Image"
                  dense />
            </div>
            <div class="col-4">
              <validation-provider name="Floors" rules="required" v-slot="{ errors }">
              <q-input filled standout="bg-orange-3" bg-color="orange-2" v-model="floors" label="Floors"
                  dense />
                  
                <span class="text-red-500">{{ errors[0] }}</span>
              </validation-provider>
            </div>
          </div>
          
          <div class="row q-mt-md">
            <q-btn @click="add()">Register</q-btn>
          
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
import { postHouse } from "../api/calls";
export default {
  components: { ValidationProvider, ValidationObserver },
  created() {
  },
  data() {
    return {
      plateNo:null,
      address:'',
      image:null,
      floors:null
    };
  },
  methods: {
    async add() {
      if (!(await this.$refs.customerForm.validate())) {
        return;
      }
      var sendData = {
        plate_no:this.plateNo,
        address:this.address,
        image:this.image,
        floors:this.floors
      }
      try {
        await postHouse(sendData);
        this.$q.notify({
          message: "House Registered",
          color: "green-5",
          icon: "info",
        });
        this.customer = {
          title: "",
          name: "",
          gender: "",
          address: "",
          phone_no: null,
          age: null,
          pan_number: null,
        };
        if (this.addCust) {
          this.$emit("closeAdd")
        }
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