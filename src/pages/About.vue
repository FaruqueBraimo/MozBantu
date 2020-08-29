<template>
<q-page  v-if="mostrar"> 
 
        
    <q-card  flat class="my-card text-justify text-weight text-body1 "
    square
    >
   
       <q-card-section >
                Este aplicativo contém  uma série de palavras em  <b class="text-italic">koty</b>, lingua materna de Angoche, traduzidas em português.

              As mesmas palavras não foram confirmadas por um especialista em Linguas <b class="text-italic">Bantu</b> ,elas foram coletadas pelo próprio desenvolvedor do aplicativo. Por tanto as palavras podem estar sujeitas a erros de grafia, de fonética e por aí vai. 
      </q-card-section>

      <q-card-section > 
          Se você encontrar algo que parece não fazer sentido ou  se estiver interressado em colaborar com mais palavras, por favor, <b class="text-italic">feel free</b> em me contactar:
      </q-card-section>
    </q-card>
    

   
   <div class=" text-weight-light touch q-pl-xl q-pb-md  text-grey-9 fixed-bottom" >
    
     

        <div>
        <q-chip square> 
        <q-avatar icon="person" color="light-green-6" text-color="white" />
        Faruque Braimo
      </q-chip>
        </div>
       
          <div>
  <q-chip square>
        <q-avatar icon="email" color="light-green-6" text-color="white" />
        faruquebraimo@gmail.com
      </q-chip>

          </div>
     
       <q-chip square>
        <q-avatar icon="phone" color="light-green-6" text-color="white" />
        846771216
      </q-chip>
 
   </div>

</q-page>   
<processamento v-else/> 



</template>

<script>
    import Processamento from "../components/global/Processamento";


export default {
     data () {
    return {
      mostrar : false
    }
     },

    components: {Processamento},
      mounted () {

          setTimeout (() => {
              this.mostrar = true
          }, 500)

      }
}
</script>