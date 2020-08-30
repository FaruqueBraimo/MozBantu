
<template>
<q-page v-if="mostrar" >

<div class="q-pa-sm">
    

          <div class="row q-pa-lg  text-body1">

               <div class="col-10 q-pa-sm  justify-end">
                 Modo escuro
               </div> 

            <div class="col-2">                
              <q-toggle
            class=""
            color="green-4"
            false-value= "Desativado"
            true-value="Ativado"
            v-model="pinkModel"
            keep-color

    />

               </div> 

          </div>

            <div class="  q-py-md">
       
        <q-stepper
      v-model="step"
      ref="stepper"
      color="green-5"
      animated
    >
      <q-step
        :name="1"
        title="Dados" icon="person"
        :done="step > 1"
      >
       <p class="text-center"> Escolhe o avatar:</p>

            <div class="row q-pa-sm justify-center items-center">
  <q-radio v-model="saveObject.avatar" val="statics/boy-avatar.png"  />
              <div class="col-4 q-pa-sm text-center ">
               

                <q-btn round flat @click="avatar('male')">
        <q-avatar size="56px">
 <img src="statics/boy-avatar.png" />        
 </q-avatar>
      </q-btn>
              </div>
              <div class="col-4 q-pa-sm text-center ">

                <q-btn round flat @click="avatar('female')">
                        <q-avatar size="56px">
                <img src="statics/avatar.png" />        
                </q-avatar>
      </q-btn>
              </div>

  <q-radio v-model="saveObject.avatar"   val="statics/avatar.png"  />
            </div>

            <q-input
              v-model="saveObject.name"
              filled
              type="text"
              label="Nome"
              square
              dense
              rounded
            />

        
      </q-step>

      <q-step
        :name="2"

        title="Lingua" icon="settings" 
        
        :done="step > 2"
      >
             <p class="text-center"> Escolhe a lingua:</p>

      <div class="row q-pa-sm justify-center items-center">
              <div class="col q-pa-sm text-center ">

                <q-radio v-model="saveObject.language" val="Xangana" label="Xangana" />
              </div>

              <div class="col q-pa-sm text-center ">
                <q-radio v-model="saveObject.language" val="Macua" label="Macua" />
              </div>
            </div>  
      </q-step>

      
      <template v-slot:navigation>
        <q-stepper-navigation>

               <q-btn  @click="finaliar()" color="green-5"
                unelevated
                no-caps
                label="Finalizar" 
                  v-if="step === 2"
                />


          <q-btn @click="$refs.stepper.next()"  color="green-5"
                unelevated
                no-caps
                label="Seguinte"
                  v-if="step === 1"
                 />


                
          <q-btn v-if="step > 1"  unelevated
                no-caps flat color="primary" @click="$refs.stepper.previous()" label="Voltar" class="q-ml-sm" />
        </q-stepper-navigation>
      </template>
    </q-stepper>
  </div>




   

</div>

</q-page>
<processamento-def v-else/>

</template>

<script>
import { watch } from 'fs'
import ProcessamentoDef from "../components/global/ProcessamentoDef";
    import { mapActions, mapGetters , mapState} from 'vuex'


export default {
   

   components: {
    ProcessamentoDef
    },
data () {
    return {
   blueModel: true,
      pinkModel: 'Desativado',
      greenModel: 42,
      redModel: true,
      mostrar : false,
       step: 1,
       saveObject : {
          avatar : '',
          language : ''
      }

    }
  },

  computed:{

  
    
         ...mapGetters ('config',['darkLabel']),
   
   
  }
,

updated(){
 
}
,
  mounted () {
          setTimeout (() => {
              this.mostrar = true
          }, 500)

            let settings = this.$q.localStorage.getItem('settings');
            this.saveObject.avatar = settings.avatar
            this.saveObject.language = settings.language
              this.saveObject.name = settings.name

        
      },

      

    methods:{


...mapActions('config', [
               'addDark', 'updateDark'
           ]),


            finaliar() {
           this.$q.localStorage.set('settings', this.saveObject)
             this.$router.go()
          },

    }

,
  watch: {
        pinkModel (newValue, oldValue) {
            if ( newValue === 'Ativado') {
                this.addDark()
            }

             if ( newValue === 'Desativado') {
                return    this.updateDark()

            }
            
        }




  }
  


 
}

</script>