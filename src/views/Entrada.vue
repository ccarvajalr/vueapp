<template>
    <div>
       <!--  <anuncio /> 
        <boletos />
       <firma />-->
        <email />
    </div>
</template>

<script>
import Anuncio from '@/components/Anuncio.vue'
import Boletos from '@/components/Boletos.vue'
import Firma from '@/components/Firma.vue'
import Email from '@/components/Email.vue'


export default {
    components:{ Anuncio, Boletos, Firma, Email } 
}
</script>