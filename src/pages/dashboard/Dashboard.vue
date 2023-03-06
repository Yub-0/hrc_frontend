<template>
  <q-page class="q-pa-lg">
    <div class="row ">
      <div class="col-md-12">
        <q-card class="my-card q-pa-sm title-card">
          <div class="row">
            <div class="col-9 q-mt-xs">
              <span class="font-bold text-md"> Dashboard</span>
            </div>
            <div class="col-3">
              <q-input v-model="date" filled standout="bg-orange-3" bg-color="orange-2" dense stack-label
                label="Select Date" type="date">
              </q-input>
            </div>
          </div>
        </q-card>
      </div>
    </div>

    <div class="row q-col-gutter-md q-mt-xs ">
      <div class="col-md-3">
        <q-card class="q-pa-md card-border-radius  card-bg shadow-5">
          <p>
            <iconify-icon class="light-orange" icon="icon-park-solid:transaction-order" width="70"></iconify-icon>
          </p>
          <p class="text-sm q-mb-xs">Total Order</p>
          <p class="text-lg font-bold q-mb-none light-orange">
              lol
          </p>
        </q-card>
      </div>
      <div class="col-md-3">
        <q-card class="q-pa-md card-border-radius  card-bg shadow-5">
          <p>
            <iconify-icon class="light-orange" icon="game-icons:money-stack" width="70"></iconify-icon>
          </p>
          <p class="text-sm q-mb-xs">Total Revenue</p>
          <p class="text-lg font-bold q-mb-none light-orange">
            lol
          </p>
        </q-card>
      </div>
      <div class="col-md-3">
        <q-card class="q-pa-md card-border-radius  card-bg shadow-5">
          <p>
            <iconify-icon class="light-orange" icon="mdi:people-group" width="70"></iconify-icon>
          </p>
          <p class="text-sm  q-mb-xs">Total Customers</p>
          <p class="text-lg font-bold q-mb-none light-orange">
            LOL
          </p>
        </q-card>
      </div>
      <div class="col-md-3">
        <q-card class="q-pa-md card-border-radius card-bg shadow-5">
          <p>
            <iconify-icon class="light-orange" icon="mdi:file-document-box-check" width="70"></iconify-icon>
          </p>
          <p class="text-sm  q-mb-xs">Ongoing Order</p>
          <p class="text-lg font-bold q-mb-none light-orange">
            lol
          </p>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
export default {
  components: { apexchart: VueApexCharts},
  data() {
    return {
      // Chart 1
      chartOptions: {
            chart: {
              type: 'bar',
              height: 350
            },
            plotOptions: {
              bar: {
                horizontal: false,
                columnWidth: '50%',
                endingShape: 'rounded'
              },
            },
            dataLabels: {
              enabled: false
            },
            stroke: {
              show: true,
              width: 2,
              colors: ['transparent']
            },
            xaxis: {
              categories: [],
            },
            yaxis: {
              title: {
                text: 'Quantity'
              }
            },
            fill: {
              opacity: 1
            },
            tooltip: {
              y: {
                formatter: function (val) {
                  return val 
                }
              }
            }
          },
      series: [{
            name: 'Quantity',
            // name: 'Net Total',
            data: []
          }
        ],
      // Chart 1
      // Chart 2
      options: {
        chart: {
          id: 'vuechart-example'
        },
        xaxis: {
          categories: []
        }
      },
      series2: [{
        name: 'Sales',
        data: []
      }
      ],
      // Chart 2
      
      // scroll data
      contentStyle: {
        backgroundColor: 'rgba(0,0,0,0.02)',
        color: '#555'
      },
      contentStyle: {
        backgroundColor: 'rgba(0,0,0,0.02)',
        color: '#555'
      },
      contentActiveStyle: {
        backgroundColor: '#eee',
        color: 'black'
      },
      thumbStyle: {
        right: '2px',
        borderRadius: '5px',
        backgroundColor: '#027be3',
        width: '5px',
        opacity: 0.75
      },
      // Scroll data
      
      currentOrder:[],
      foodItems:[],
      total_val: null,
      paymentStore: [],
      date: "",
      propSinglePayment:[],
      propSingleId:null,
      showInvoice:false, 
      propMergePayment:[],
      propMergeId:null,
      showMergeInvoice:false,
      chart:false,
      chart2:false
    };
  },
  created() {
    this.fetchDashboard();
    this.fetchPayment()
    this.fetchTopSellingItem()
    this.fetchCurrentOrder()
  },
  methods: {
    async fetchCurrentOrder(){
      await getOrder({
        dashboard:true,
        ongoing: 1,
        merge: 1,
      }).then((res) => {
        this.currentOrder = res.data;
      });
    },
    async fetchTopSellingItem(){
      await getSummaryReport({ item: 0, dashboard:true }).then(({ data }) => {
            this.foodItems = data
            this.foodItems.forEach(i =>{
              this.chartOptions.xaxis.categories.push(i.name)
              this.series[0].data.push(i.quantity)
            })
            this.chart = true
            this.$q.loading.hide()
          }).catch((error) => {
            this.$q.loading.hide()
            this.$q.notify({
              color: 'red-5',
              textColor: 'white',
              icon: 'warning',
              message: error.response
            })
      })
    },
    async fetchDashboard() {
      const res = await getDashboard()
      this.total_val = res.data;
    },
    async fetchPayment() {
      const response = await getPayment({ dashboard: true })
      this.paymentStore = response.data;
      this.paymentStore.forEach(p =>{
        this.options.xaxis.categories.push(p.id)
        this.series2[0].data.push(p.invoice.net_price)
        
        this.chart2 = true
      })
      console.log(this.series2)
    },
    detailBilling(Payment) {
      if(Payment.id.substring(0,1) != 'M'){      
          this.propSinglePayment = Payment;
          this.propSingleId = Payment.id
          this.showInvoice = true;
        }else{
            this.propMergePayment = Payment;
            this.propMergeId = Payment.id
            this.showMergeInvoice = true;
          }

        },
    payment() {
      this.$router.push({
        name: "Order",
        query: {
          type: "payed"
        }
      })
    },
    ongoing() {
      this.$router.push({
        name: "Order",
        query: {
          type: "ongoing"
        }
      })
    }
  },
  watch: {
    date() {
      this.fetchDashboard()
    }
  }
};
</script>
