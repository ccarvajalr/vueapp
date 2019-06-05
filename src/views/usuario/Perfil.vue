<template>
  <v-layout aling-start justify-center text-xs-center>
      <v-card class="elevation-6">
          <v-card-text>
              <div class="ma-2">
                  Nombre y Apellidos
              </div>
              <img class="ma-2 fotoPerfil" :src="require('@/assets/sin-foto.jpg')" alt="" srcset="">
              <div class="ma-2">
                  Descripción
              </div>
              <a href="" class="ma-2 link">Biografía</a>
          </v-card-text>
      </v-card>
  </v-layout>
</template>
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
