<template >

<q-page>
   <transition
  appear
  enter-active-class="animated pulse"
  leave-active-class="animated zoomOut"
>
<q-list class=""    >aa
            
              <template  v-for="(i,id,index) in searchPalavras(palavras)" >
                  <q-item class="" clickable v-ripple :key="id" > 
                      <q-item-section @click="details(id)" >
                          <q-item-label class="text-body1">
                            
                            
                            {{i.traducao}}</q-item-label>
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
                  
                  <q-separator :key="i.traducao"
                  
                     v-if="index < Object.keys(palavras).length -1"
                      spaced
                      inset
                  
                  />    

                 
              </template>
               <q-skeleton type="text"  />

          </q-list> 
          </transition>

  
</q-page>
</template>



<script>
    import { mapActions, mapGetters , mapState} from 'vuex'
  import { date } from 'quasar'

export default {
  computed: {
           ...mapState ('palavra', [
               'palavras'
           ]),
                   ...mapGetters ('palavra',['searchPalavras'])

           
           
           },
  data () {
    return {
      lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
,
        text: 'oi',
      voiceSelect: 'pt-BR',
      saveObject: {
        his : true,
        dataAcesso : new Date

        } 
    
    }
    
  }

  ,
     methods:{
...mapActions('palavra', [
               'addPalavra', 'updatePalavra'
           ]),

            handleSwipe ({ evt, ...info }) {
      this.info = info

      // native Javascript event
      // console.log(evt)
    },

      audio(val) {
          this.$speechTalk(this.voiceSelect, val) 
          
          },

      details(id){
        this.$router.push('palavra/' + id)
                 this.updatePalavra ({
                        id: id,
                        updates: this.saveObject
                    })
            }
 
  }
  ,
   filters: {
     
            filterDate (val) {
                let timeStamp = val.seconds * 1000;
                let data  =  new Date(timeStamp);
                let formattedString = date.formatDate(data, 'DD - MM - YYYY')
                return formattedString  ? 'Acessado aos: ' + formattedString :  'Nunca Acessado'
            }
}}

</script>