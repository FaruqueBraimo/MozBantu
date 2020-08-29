<template>
  <div id="q-app" class="text-grey-9">
    <router-view v-if="$q.platform.is.mobile">
     
    </router-view>

    <q-card class="my-card absolute-center q-pa-xl" v-else>
      <q-card-section class="text-center">
        <q-icon name="desktop_access_disabled" size="50px" />
      </q-card-section>

      <div class=" text-h5">
        Esta aplicação só funciona nos dispositivos mobiles
        <div class="text-caption text-center">
          faruquebraimo@gmail.com
        </div>
      </div>
    </q-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "App",

  data() {
    return {
      mostrar: false,
      texto: "",
      step: 1,
      stepper: 1,
      name: "",
      settings: false
    };
  },

  computed: {
    ...mapGetters("config", ["darkStatus"])
  },
  created() {
    this.darkStatus;
    this.listenPalavraRealTimeChanges();
    this.$q.addressbarColor.set("#AED581");
    this.settings = this.$q.localStorage.getItem('settings')


      if(!this.settings) {
        this.$router.push('/settings')
      }




  },

  methods: {
    ...mapActions("palavra", ["listenPalavraRealTimeChanges"])
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@1,600&display=swap");

#q-app {
  font-family: "Dosis", sans-serif;
}
</style>
