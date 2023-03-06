<template>
    <q-page class="q-pa-lg">
        <div class="row">
            <div class="col-md-12">
                <q-card class="q-pa-sm title-card">
                    <div class="row">
                        <div class="col-12">
                            <span class="font-bold text-md q-mb-none">Room Settings</span>
                        </div>
                    </div>
                </q-card>
            </div>
        </div>

        <q-card class="my-card q-mt-lg">
            <div class="row q-col-gutter-x-md">
                <div class="col-lg-12 col-md-12">
                    <q-tabs v-model="tab" dense class="text-grey" active-color="primary" indicator-color="primary"
                        align="justify" narrow-indicator>
                        <q-tab name="add room" label="Add Room" />
                        <q-tab name="room detail" label="Rooms" />
                    </q-tabs>
                </div>
                <div class="col-12">
                    <q-tab-panels v-model="tab" animated keep-alive>
                        <q-tab-panel style="padding: 4px !important" name="add room">
                            <AddRoom />
                        </q-tab-panel>
                        <q-tab-panel style="padding: 4px !important" name="room detail">
                            <RoomList />
                        </q-tab-panel>
                    </q-tab-panels>
                </div>
            </div>
        </q-card>
    </q-page>
</template>
  
<script>
import AddRoom from './components/AddRoom.vue';
import RoomList from './components/RoomList.vue';
export default {
    components: { RoomList, AddRoom },
    data() {
        return {
            tab: "add room"
        };
    }
};
</script>

<style>
::-webkit-scrollbar {
    width: 20px;
    cursor: pointer;
}

::-webkit-scrollbar-track {
    background-color: transparent;
    max-height: 40em !important;
    cursor: pointer;
}

::-webkit-scrollbar-thumb {
    background-color: #d1d0d0 !important;
    border-radius: 20px;
    border: 6px solid transparent !important;
    background-clip: content-box;
    cursor: pointer;
}

::-webkit-scrollbar-thumb:hover {
    background-color: #ffcb8a !important;
    cursor: pointer;
}
</style>