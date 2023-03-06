<template>
  <div>
    <form ref="stockForm" class="q-pl-sm q-pr-sm">
      <ValidationObserver ref="addStockForm">
        <div class="row q-col-gutter-md q-mt-sm">
          <div class="row">
            <div class="col-md-7 ">
              <label>House</label>
              <validation-provider name="House" rules="required" v-slot="{ errors }">
                <q-select standout="bg-orange-3" bg-color="orange-2" dense v-model="selected_house" :options="houseOption"
                  label="Select House" emit-value map-options />
                <span class="text-red-500">{{ errors[0] }}</span>
              </validation-provider>
            </div>
            <div class="col-md-7" v-show="selected_house">
              <label>Floor</label>
              <validation-provider name="Floor" rules="required" v-slot="{ errors }">
                <q-select standout="bg-orange-3" bg-color="orange-2" dense v-model="selected_floor" :options="floorOption"
                  label="Select Floor" emit-value map-options />
                <span class="text-red-500">{{ errors[0] }}</span>
                <span class="text-red-500">{{ errors[0] }}</span>
              </validation-provider>
            </div>
            <div class="col-12 q-ml-xs q-mt-md" style="border-top: 1px solid rgba(0, 0, 0, 0.12)"></div>
          </div>
          <div v-show="selected_house && selected_floor" class="col-md-12">
            <label>Room Details</label>
            <div class="row q-col-gutter-md">
              <div class="col-md-2 q-mt-md">
                <validation-provider name="Room Tag" rules="required" v-slot="{ errors }">
                  <q-input ref="batch" standout="bg-indigo" outlined class="q-mb-sm" dense stack-label v-model="room.room"
                    label="Room Tag" />
                  <span class="text-red-500">{{ errors[0] }}</span>
                </validation-provider>
              </div>
              <div class="col-md-2 q-mt-md">
                <q-input ref="batch" standout="bg-indigo" outlined class="q-mb-sm" dense stack-label
                  v-model="room.location" label="Location" />
              </div>
              <div class="col-md-2 q-mt-md">
                <validation-provider name="Rent" rules="required|numeric" v-slot="{ errors }">
                  <q-input ref="quantity" v-model.number="room.room_rent" type="number" standout="bg-indigo" outlined
                    class="q-mb-sm" dense stack-label label="Rent" />
                  <span class="text-red-500">{{ errors[0] }}</span>
                </validation-provider>
              </div>
              <div class="col-md-12 q-mb-sm">
                <q-btn v-show="!edit" @click="addRoomlist" push class="secondary-btn float-right" label="Add" />
                <q-btn v-show="edit" @click="editRoom" push class="secondary-btn float-right" label="Update" />
              </div>
            </div>
          </div>
        </div>
      </ValidationObserver>
    </form>
    <q-markup-table :separator="separator" class="q-pa-md" v-show="this.rooms.length != 0">
      <thead>
        <tr>
          <th class="text-left">Room Tag</th>
          <th class="text-left">Location</th>
          <th class="text-left">Room Rent</th>
          <th class="text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(r, index) in rooms" :key="index">
          <td class="text-left">{{ r.room }}</td>
          <td v-if="r.location">{{ r.location }}</td>
          <td v-else class="text-left">---</td>
          <td class="text-left">{{ r.room_rent }}</td>
          <td class="text-center table q-gutter-md">
            <span>
              <q-btn @click="editItems(index)" size="0.65rem" padding="sm sm" dense push class="edit-btn" color="red-5"
                icon="update">
                <q-tooltip>Edit</q-tooltip>
              </q-btn>
            </span>
            <span>
              <q-btn @click="deleteItems(index)" size="0.65rem" padding="sm sm" dense push class="edit-btn" color="red-5"
                icon="delete">
                <q-tooltip>Remove</q-tooltip>
              </q-btn>
            </span>
          </td>
        </tr>
      </tbody>
    </q-markup-table>
    <q-btn v-if="this.rooms.length != 0" @click="addStock" push class="secondary-btn float-right" label="Update Stock" />
  </div>
</template>
<script>
import { getHouse } from "../../house/api/calls"
import { getFloors } from "../api/calls"
import NepaliDate from "nepali-date-converter";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";
import { required, numeric, min, max } from "vee-validate/dist/rules";

setInteractionMode("eager");
extend("required", {
  ...required,
  message: "{_field_} is required",
});
extend("numeric", {
  ...numeric,
  message: "{_field_} must be numbers",
});
extend("min", {
  ...min,
  message: "{_field_} may not be less than {length} numbers",
});
extend("max", {
  ...max,
  message: "{_field_} may not be greater than {length} numbers",
});

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      edit: false,
      editIndex: null,
      floor: [],
      house: [],
      houseOption: [],
      floorOption: [],
      separator: "vertical",
      purchase_date_bs: "",
      manufacture_date_date_bs: "",
      expire_date_date_bs: "",
      selected_house: null,
      selected_floor: null,
      pdateType: "A.D",
      mdateType: "A.D",
      edateType: "A.D",
      room: {
        room: '',
        location: '',
        room_rent: null
      },
      rooms: [],
    };
  },
  created: async function () {
    await this.fetchHouse();
    // this.$nextTick(() => this.$refs.mname.focus());
  },
  watch: {
    purchase_date_bs: function async() {
      this.purchase_date = this.convertEnglishDate(this.purchase_date_bs);
    },
    expire_date_date_bs: function async() {
      this.stock.expire_date = this.convertEnglishDate(
        this.expire_date_date_bs
      );
    },
    manufacture_date_date_bs: function async() {
      this.stock.manufacture_date = this.convertEnglishDate(
        this.manufacture_date_date_bs
      );
    },
  },
  methods: {
    convertEnglishDate(nepaliDate) {
      let date;
      let month;
      if (new NepaliDate(nepaliDate).getAD().date < 10) {
        const zero = 0;
        date =
          zero.toString() + new NepaliDate(nepaliDate).getAD().date.toString();
      } else {
        date = new NepaliDate(nepaliDate).getAD().date.toString();
      }
      if (new NepaliDate(nepaliDate).getAD().month < 10) {
        const zero = 0;
        month =
          zero.toString() +
          (new NepaliDate(nepaliDate).getAD().month + 1).toString();
        console.log(month, "wow");
      } else {
        month = (new NepaliDate(nepaliDate).getAD().month + 1).toString();
      }
      if (month === "010") {
        month = "10";
      }
      return (
        new NepaliDate(nepaliDate).getAD().year.toString() +
        "-" +
        month +
        "-" +
        date
      );
    },
    async fetchHouse() {
      await getHouse().then(res => {
        this.house = res.data
        this.house.forEach(h => {
          const ho = {
            value: h.id,
            label: h.plate_no,
          };
          this.houseOption.push(ho);
        })
      })
        .catch((error) => {
          this.$q.notify({
            color: "red-5",
            textColor: "white",
            icon: "warning",
            message: error,
          });
        });
    },
    async fetchFloors() {
      await getFloors({ house: this.selected_house }).then(res => {
        this.floorOption = []
        this.floor = res.data
        this.floor.forEach(h => {
          const ho = {
            value: h.id,
            label: h.floor,
          };
          this.floorOption.push(ho);
        })
      })
        .catch((error) => {
          this.$q.notify({
            color: "red-5",
            textColor: "white",
            icon: "warning",
            message: error.response.data.error,
          });
        });
    },
    async addRoomlist() {
      this.$refs.addStockForm.validate().then((success) => {
        if (!success) {
          return;
        }
        const room_object = { ...this.room }
        this.rooms.push(room_object)
        this.room = {
          room: '',
          location: '',
          room_rent: null
        };
      });
    },
    addStock() {
      var passingStock = {
        house: this.selected_house,
        floor: this.selected_floor,
        rooms: this.rooms,
      };
      postStock(passingStock)
        .then(res => {
          this.$q.notify({
            color: "green-5",
            textColor: "white",
            icon: "warning",
            message: "Stock Added",
          });
          this.$refs.stockForm.reset();
          this.rooms = [];
        })
        .catch((error) => {
          this.$q.notify({
            color: "red-5",
            textColor: "white",
            icon: "warning",
            message: error.response.data.message || "Invalid Details Provided",
          });
          this.$refs.stockForm.reset();
        });
    },
    editRoom() {
      this.rooms[this.editIndex].room = this.room.room
      this.room.room = this.rooms[this.editIndex].room
      this.rooms[this.editIndex].location = this.room.location
      this.rooms[this.editIndex].room_rent = this.room.room_rent
      this.room = {
        room: '',
        location: '',
        room_rent: null
      };
      this.edit = false
      this.editIndex = null

    },
    editItems(index) {
      this.room.room = this.rooms[index].room
      this.room.location = this.rooms[index].location
      this.room.room_rent = this.rooms[index].room_rent
      this.edit = true
      this.editIndex = index
      console.log(this.room)
    },
    deleteItems(index) {
      if (index !== -1) {
        this.rooms.splice(index, 1);
      }
    },
  },
  watch: {
    selected_house() {
      this.selected_floor = null
      this.fetchFloors();
    },
  }
};
</script>
