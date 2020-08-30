<template>
  <q-page>
    <transition
      appear
      enter-active-class="animated pulse"
      leave-active-class="animated zoomOut"
    >
      <q-list class="rounded-borders"  v-if=" Object.keys(getWords).length> 0">
        <template>
          <q-item class="q-mb-sm" clickable v-ripple  v-for="(i,index, id) in getWords" :key="i">
            <q-item-section @click="details(id)">
              <q-item-label class="text-body1"> {{ i.nome || i.traducao }}</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-btn
                outline
                no-caps
                flat
                icon="record_voice_over"
                rounded
                size="sm"
                color="light-green-6"
                @click="audio(i.palavra)"
              />
            </q-item-section>
          </q-item>

          <q-separator
            :key="i.nome"
            v-if="index < Object.keys(getWords).length - 1"
            spaced
            inset
          />
        </template>
      </q-list>
    </transition>
    <div class="row q-pa-sm " v-for="i in 20" :key="i"  v-if=" Object.keys(getWords)== 0" >
      <div class="col-10 q-pt-sm "            >
        <q-skeleton animation="wave" />
      </div> 
      <div class="col-2  q-pl-md" >
        <q-skeleton type="QCheckbox" />
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import { date } from "quasar";

export default {
  computed: {
    ...mapState("palavra", ["palavras",'api']),
    ...mapGetters("palavra", ["searchPalavras"]),

    getWords() {
        let words = {};
        this.settings = this.$q.localStorage.getItem('settings');
        if( this.settings.language == 'Xangana') {
          words =  this.palavras
        }
        else {

          this.api.forEach(element => {
             words =  element
          });
         
        }
        return words
    }



  },
  data() {
    return {
      lorem:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      text: "oi",
      voiceSelect: "pt-BR",
      settings: '',
      saveObject: {
        his: true,
        dataAcesso: new Date()
      }
    };
  },

  methods: {
    ...mapActions("palavra", ["addPalavra", "updatePalavra"]),

    handleSwipe({ evt, ...info }) {
      this.info = info;

      // native Javascript event
      // console.log(evt)
    },

    audio(val) {
      this.$speechTalk(this.voiceSelect, val);
    },

    details(id) {
      this.$router.push("palavra/" + id);
      this.updatePalavra({
        id: id,
        updates: this.saveObject
      });
    }
  },
  filters: {
    filterDate(val) {
      let timeStamp = val.seconds * 1000;
      let data = new Date(timeStamp);
      let formattedString = date.formatDate(data, "DD - MM - YYYY");
      return formattedString
        ? "Acessado aos: " + formattedString
        : "Nunca Acessado";
    }
  }
};
</script>
