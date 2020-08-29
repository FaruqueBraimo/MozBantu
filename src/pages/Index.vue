<template>
  <q-page class="q-py-md">
   

    <dicionario-component
  :texto="texto"
  
  />
  </q-page>
</template>

<script>
import DicionarioComponent from "../components/DicionarioComponent";
import Pesquisa from "../components/global/Pesquisa";
import Processamento from "../components/global/Processamento";

export default {
  components: {
    Pesquisa,
    DicionarioComponent,
    Processamento
  },

  data() {
    return {
      mostrar: false,
      texto: "",
      step: 1,
      stepper: 1,
      name: ""
    };
  },
  computed: {
    internetStatus() {
      if (navigator.onLine) {
        alert("online");
      } else {
        alert("offline");
      }
    }
  },

  mounted() {
    setTimeout(() => {
      this.mostrar = true;
    }, 500);
  },
  methods: {
    handleSwipe({ evt, ...info }) {
      this.info = info;

      // native Javascript event
      // console.log(evt)
    }
  }
};
</script>
