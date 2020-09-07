<template>
    <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-light-green-6"  v-if="pesquisa === false" >
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          drawerOrNor
          @click="drawerOrNor"
          :icon="icon"
          aria-label="Menu"
        />
        
        <q-toolbar-title>
          {{titulo}} 
        </q-toolbar-title>
      <q-space ></q-space>
          <q-btn flat round dense icon="search" class="q-mr-xs" @click="pesquisa=true" v-if="this.$route.fullPath == '/'" />

      </q-toolbar>
    </q-header>


<transition
  appear
  enter-active-class="animated fadeInLeft"
  leave-active-class="animated fadeOutLeft"
>
 <q-header  elevated class="bg-white"  v-if="(pesquisa === true )" >
        <div class="row"   >
            <div class="col-2 q-pt-md q-pl-sm">
                 <q-btn color="light-green-6" flat round dense icon="arrow_back"  @click="pesquisa=false" />
            </div>
           <div class="col-10 q-pt-xs text-body1">
                   <q-input borderless color="dark" autofocus    v-model="searchText"  placeholder="Pesquisa" class="text-body1"
                   
                                
                   >
                   
          <template v-slot:append class="q-pr-md">
            <transition
  appear
  enter-active-class="animated rotateIn"
  leave-active-class="animated rotateOut"
>
          <q-icon v-if="hear === true" name="close" @click="searchText = ''; hear = false" class="cursor-pointer q-mr-lg" />
      
      </transition
 
>
        </template>





                   </q-input>
           </div>

        </div>
    </q-header>

</transition
 
>


<transition
  appear
  
>

     <q-drawer
        v-model="drawer"
        show-if-above
        :width="200"
        :breakpoint="600"
        
      >
        <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
          <q-list padding  class="text-grey-9"  >
     
            <q-item clickable v-ripple to="/" exact  >
              <q-item-section avatar>
                <q-icon name="menu_book" />
              </q-item-section>

              <q-item-section   >
               Dicionário
              </q-item-section>
            </q-item>



            <q-item clickable v-ripple to="diario"  active-color="light-green-6">
              <q-item-section avatar>
                <q-icon name="timer" />
              </q-item-section>

              <q-item-section>
               Pratique
              </q-item-section>
            </q-item>

            
            <q-item clickable v-ripple to="favoritos" >
              <q-item-section avatar>
                 <q-icon name="favorite" />
              </q-item-section>

              <q-item-section>
                Favoritos
              </q-item-section>
            </q-item>

            
            <q-item clickable v-ripple to="historico">
              <q-item-section avatar>
                <q-icon name="history" />
              </q-item-section>

              <q-item-section>
               Histórico
              </q-item-section>
            </q-item>




            <q-item clickable v-ripple to="definicoes">
              <q-item-section avatar>
                <q-icon name="settings" />
              </q-item-section>

              <q-item-section>
                Definições
              </q-item-section>             
            </q-item>
            <q-item clickable v-ripple to="share">
              <q-item-section avatar>
                <q-icon name="share" />
              </q-item-section>

               <q-item-section>
                Compartilhar
              </q-item-section>  
            </q-item>
          </q-list>
        </q-scroll-area>
        <q-img class="absolute-top bg-light-green-6"   style="height: 150px ">
           <div class="absolute-center bg-transparent">
            <q-avatar size="56px" class="q-mb-sm">
              <img :src="settings.avatar">
            </q-avatar>
            <div class="text-white text-center"> {{settings.name}}</div>
          </div>
        </q-img>
      </q-drawer>
</transition

>

<q-footer elevated class="" v-if="this.$route.fullPath == '/'"  >
        <div>
            <q-tabs
                indicator-color="transparent"
                active-color="light-green-6"
                no-caps
                class="bg-white text-grey-5 shadow-0 adjust-size "
            >

             <q-route-tab

                    to="/profile"
                    exact
                    icon="person_pin"
                  

                   
                />

                  <q-route-tab

                    to="/diario"
                    exact

                  
                >

           <q-spinner-grid
          color="light-green-6"
          size="1.7em"
        />

                  </q-route-tab>



              


                  <q-route-tab

                    to="/about"
                    exact
                    icon="info"
                   
                />   
            </q-tabs>
        </div>
    </q-footer>

  
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>



<style  lang="css">
    .q-tab-full {
        min-height: 0;
        padding: 5px 10px;
        margin-bottom: 5px;
    }




</style>

<script>
    import { mapActions, mapGetters , mapState} from 'vuex'
import { EventBus } from '../functions/bus.js';



export default {
  
  name: 'MyLayout',
  
   created (){
   EventBus.$on('i-got-clicked', clickCount => {
  console.log(`Oh, that's nice. It's gotten ${clickCount} clicks! :)`)
});
  }
  ,

  data () {
    return {
      leftDrawerOpen: false,
       drawer: false,
       pesquisa: false,
       hear: false,
       object:{
         type : 'palavra'
       }
    
    }

    
  }

  

,
computed:{

  settings () {
        let stgs =  this.$q.localStorage.getItem('settings')
        return stgs

  },

 ...mapState ('palavra', [
               'palavras'
           ]),


           listen(){
             let pesquisa = false
            
  EventBus.$on('i-got-clicked', data => {

    pesquisa = data
});

    return pesquisa
           },

titulo (){
  let caminho =  this.$route.fullPath

  if ( caminho == "/") return this.settings.language
  else if  ( caminho == "/") return this.settings.language
  else if  ( caminho == "/about") return "About"
  else if  ( caminho == "/palavradodia") return "Palavra do dia"
  else if  ( caminho == "/favoritos") return "Favoritos"

  else if  ( caminho == "/definicoes") return "Definiçoes"
  else if  ( caminho == "/historico") return "histórico"
    else if  ( caminho == "/diario") return "Pratique"

  else return "Definição"


},

icon (){
  let caminho =  this.$route.fullPath
  let icon = ''          
             if ( caminho.search("/palavra")) icon = "menu"
                
              else icon =  "arrow_back"

              return icon
}

,
 
                   
            searchText: {
                get() {
                    return this.object.type === 'palavra' ? this.palavraSearchKey :  ''
                },
                set(val) {
                   
                    this.object.type === 'palavra' ? this.setPalavraSearchKey (val) : ''
                     if(val){
                      this.hear = true 
                    }  
                }
            }


}


,

 methods:{
        drawerOrNor(){
            if (this.icon == 'arrow_back') {
              this.$router.go(-1)
            } 
            else {
              this.drawer = !this.drawer  
            }
        },

                    ...mapActions('palavra', ['setPalavraSearchKey']),


}

  ,

  beforeUpdate(){
  }
  ,
 updated(){

         console.log(this.searchText)

   this.searchText =   ''
   
     EventBus.$on('i-got-clicked', data => {

    this.pesquisa = data
     this.hear = false
    console.log( 'pesquisa' , this.pesquisa)



});



   
 }

  ,
  destroyed(){
    EventBus.$off('i-got-clicked');

  }


}
</script>
