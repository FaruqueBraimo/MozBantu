<template>

<q-page class="q-pa-md">
 
<div class="absolute-center" v-if="Object.keys(historicos).length == 0 "> 

        <div class="text-body1">
          Sem historico
        </div>
</div>


 
<transition
  appear
  enter-active-class="animated pulse"
  leave-active-class="animated bounceOut"
>
<q-list class="rounded-borders">
             <template   v-for="(i,id ) in historicos"  >
                  <q-item class="q-mb-sm" clickable v-ripple :key="id" > 
                    
                      <q-item-section @click="details(i.payload.id)" >
                          <q-item-label class="text-body1"   >{{i.payload.name}}</q-item-label>
                      </q-item-section>
              <q-item-section side>
                          <q-btn
                             
                              outline
                              no-caps
                              flat
                              icon="delete"
                              rounded
                              size="sm"
                              color="red-4"
                              @click="remove(i.payload.id)"
                          />
                      </q-item-section>
                  </q-item>
                  
                  <q-separator :key="i.index"/>    

                 
              </template>
          </q-list> 

       
   </transition>


</q-page>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import { filter } from 'minimatch'
  import { date } from 'quasar'
import VueGoodshareFacebook from 'vue-goodshare/src/providers/Facebook.vue'
import VueGoodshareTwitter from 'vue-goodshare/src/providers/Twitter.vue'
import VueGoodshare from 'vue-goodshare'

export default {

components:{
    VueGoodshareTwitter,
    VueGoodshareFacebook,
    VueGoodshare
  },
data () {
    return {

    hisMode:false,
      saveObject: {
          his : '',
         
        } ,
    }
 
  }
  ,

  computed: {
           ...mapState ('palavra', [
               'palavras'
           ]),

            ...mapState ('histo', [
               'historys'
           ]),
           
           hisText() {
                return 
           }
           ,
           historicos () {
             this.getHistory()
                let historico = {}

            this.historys.forEach((key,index) => {
              

                //  key.forEach(element => {
                   historico = key
                //  });
                    
                    
                 
            })
             
     if (  Object.keys(historico).length)    {
       
       this.hisMode = true
     }  
     
     else{
           
       this.hisMode = false
       this.hisText
     }
            
            return historico
}

           }
         
           ,
  
     methods:{
...mapActions('palavra', [
               'addPalavra', 'updatePalavra'
           ]),

                   ...mapActions("histo", ["getHistory",'removeChecked']),


      remove(id) {
                // this.saveObjet.hisFalse = true
        this.saveObject.his = false
      this.removeChecked(id)
            }
      
        ,
      details(id){
               this.$router.push('palavra/' + id)
        this.saveObject.his = true

                this.updatePalavra ({
                        id: id,
                        updates: this.saveObject
                    })
            }
 
     }
    ,
 filters: {
            filterDate (val) {
                let timeStamp = val.seconds * 100;
                let data  =  new Date(timeStamp);
                let formattedString = date.formatDate(data, 'DD - MM - YYYY')
                return formattedString  ? 'Acessado aos: ' + formattedString : 'Nunca Acessado'
            }

  }

}
</script>