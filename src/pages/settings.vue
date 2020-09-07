<template>
  <div  class="text-grey-9 q-py-xl">
       <div class=" q-pa-md q-py-xl">
        <p class="text-center text-green-5 text-h6 text-bold"> Seja Bem vindo !</p>
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
    </div>


  </div>

    

</template>

<script>
import { mapActions,mapGetters } from 'vuex'
export default {
  name: 'App',
  
  data() {
    return {
      mostrar: false,
      texto: "",
      step: 1,
      stepper: 1,
      name: "",
      shape:'',
      male:false,
      female:false,
      saveObject : {
          avatar : ''
      }
    };
  },

   computed: {
  
                  

                  

           },
  

      methods: {
     ...mapActions('palavra', [
              'listenPalavraRealTimeChanges',
          ]),

          finaliar() {
           this.$q.localStorage.set('settings', this.saveObject)
                   this.$router.push('/')

         
          },

          avatar(val){
              if(val==='male') {
                  this.saveObject.avatar = 'statics/boy-avatar.png'
                  this.male = true
                  console.log(val)
              }
              else {
                this.saveObject.avatar = 'statics/avatar.png'
                  this.female = true
              }
          }



}}
</script>

<style>



</style>