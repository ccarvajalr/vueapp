import { mapState } from 'vuex';
<template>
  <v-layout aling-start justify-center text-xs-center>
      <v-card v-if="usuario" class="elevation-6">
          <v-card-text>
              <div class="ma-2">
                 {{ usuario.nombres + ' '+ usuario.apellidos}}
              </div>
        
              <v-img class="ma-2 fotoPerfil" :src="usuario.fotoPerfil" alt="" srcset=""></v-img>
              <div class="ma-2">
                  Descripción
              </div>
              <a href="" class="ma-2 link">Biografía</a>
          </v-card-text>
      </v-card>
  </v-layout>
</template>
<script>
import { mapState } from 'vuex'

export default {
    computed: {
          ...mapState('sesion',['usuario'])
        //usuario(){
          
            //return this.$store.state.sesion.usuario
        //}
    },
}
</script>
<style>
    .fotoPerfil{
        width: 200px;
        height: 100%;
    }
    .link{
        text-decoration: none;
        font-size: 1em;
        color:#553f75
    }
</style>
