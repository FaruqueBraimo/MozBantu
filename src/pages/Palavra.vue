<template>
  <div class="q-pa-md ex">
    <div class="q-gutter-md row items-start">
      <q-card flat bordered   style="width: 500px">
        <q-card-section  >
      {{getFavorites}}
<div class="row"> 
  
       <div class="col-6 text-h6 q-pt-xs">
         <q-card-actions align="left" class="ex"
         >

           {{palavra.name}}
         
         </q-card-actions>   </div>
      
        <div class="col-6 q-pl-md">
         <q-card-actions align="right">
         <q-btn flat round color="light-green-6" icon="record_voice_over"  @click="audio(palavra.name)"/>
        <q-btn flat round :color="fav==true ? 'red' : 'black' " icon="favorite" @click="favorito()"/>
          </q-card-actions>
              </div>  
              </div>
         
        </q-card-section>
         
        <q-separator />

          <q-card-section>              
              <div
                      class="text-caption text-italic	text-weight-bold "> Tradução 
              <p class="text-h6 text-capitalize		"> {{palavra.word.name}} </p>
              </div>

              <div
                      class="text-caption text-italic text-weight-bold	"> Pronúncia 
              <p class="text-body1 text-weight-regular" >  {{palavra.pronuncia || 'Escute o audio'}} </p>
              </div>

        </q-card-section>  


          <q-separator />

          <q-card-section>              
              <div
                      class="text-caption text-italic	 text-weight-bold"> Exemplo  
              <p class="text-body1">" {{palavra.example}} " </p>
              </div>

              <div
                      class="text-caption text-italic	text-weight-bold">Tradução do exemplo
              <p class="text-body1">" {{palavra.Exemplo_koty}} " </p>
              </div>

        </q-card-section>     
      </q-card>
    </div>
  </div>
</template>




<style>



</style>





<script>
import { mapActions, mapState } from 'vuex'
import { log } from 'util'
import Vue from 'vue'
import { EventBus } from '../functions/bus.js';

export default {

mounted(){
 EventBus.$emit('i-got-clicked', false);
}
,

  computed: {
           ...mapState ('palavra', [
               'palavras' , 'api'
           ]),

           
            ...mapState ('favorite', [
               'favorites'
           ]),
           
           
           palavraId(){
          return this.$route.params.id;

        },

        



        palavra()

        {
          let data = [];
          
              this.palavras.forEach(element => {
               element.forEach(e => {
                 if(e.id == this.palavraId) {
                    data = e;
                 }
                
                 
               });
          });

            this.api.forEach(element => {
               element.forEach(e => {
                 if(e.id == this.palavraId) {
                    data = e;
                 }
                
                 
               });
          });

        


          return data;

        },

         
           getFavorites () {
                let historico = ''

            this.favorites.forEach((key,index) => {
              
                 key.forEach(element => {
			if (element.payload.id== this.palavraId) {
          
         this.fav = true
          }
            else{
               this.fav = false

            }
		});
                    
                    
                 
            })
             
   
            
            return historico
}

           
           
           },

  data () {
    return {
      text: 'oi',
      voiceSelect: 'pt-BR',
      skeletonAnimations: [
        'wave'
        
      ],
      fav: false,
      saveObject: {
        favorito : false
        } 
    
  }
  
  },
  mounted(){
  this.loadItems();
  const array = Object.entries(this.palavra);
  console.log(array)
  this.addhistory(this.palavra); 


  },

    methods:{
        ...mapActions ('palavra', [
               'updatePalavra', 'loadItems'
           ]),
        ...mapActions("histo", ["addhistory"]),
        ...mapActions("favorite", ["addfavorite", 'removeChecked', 'getfavorite']),



  audio(val) {
          this.$speechTalk(this.voiceSelect, val) 
          
          },
      favorito(){

    
            if (this.palavraId){
              if(this.fav ) {
                  this.removeChecked(this.palavraId);
                                  this.fav = false
                                  this.getfavorite


              }
              else {
                            this.addfavorite(this.palavra)


              }
              
            }
          
      }
    }



}
</script>