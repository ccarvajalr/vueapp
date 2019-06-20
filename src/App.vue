<template>
  <v-app>
    <v-navigation-drawer v-model="menu" app temporary>
      <v-list>
       
        <v-list-tile :to="{path: '/'}">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="'Inicio'"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
         
         <v-list-tile v-if="usuario" :to="{name: 'perfil'}">
          <v-list-tile-action>
            <v-icon>account_circle</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="'Perfil'"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

         <!-- <v-list-tile @click="seleccionar('registro')">
          <v-list-tile-action>
            <v-icon>contact_mail</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="'Registro'"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile> -->  

        <v-list-tile v-if='!usuario' :to="{name: 'login'}">
          <v-list-tile-action>
            <v-icon>arrow_forward</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="'Ingresar'"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile v-if='usuario' @click="salir">
          <v-list-tile-action>
            <v-icon>arrow_back</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="'Salir'"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>


      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="primary" dark app>
      <v-toolbar-side-icon @click="menu = !menu"></v-toolbar-side-icon>
      <v-toolbar-title @click="$router.push({name:'home'})" class="headline logo">
        <span>{{titulo}}</span>
      </v-toolbar-title>
      <v-spacer> </v-spacer>
      <router-link class="nombre" :to="{name: 'perfil'}">
        <span v-if="usuario">{{ usuario.nombres}}</span>
      </router-link>
    </v-toolbar>

  <!-- CONTENIDO -->
    <v-content>
      <v-container fluid fill-height>
        <v-slide-y-transition mode="out-in">
          <router-view></router-view>
        </v-slide-y-transition>
      </v-container>
    </v-content>


    <v-snackbar v-model="notificacion.visible" :color="notificacion.color" multi-line top :timeout="6000" dark>
      {{notificacion.mensaje}}
      <v-btn color="white" flat @click="ocultarNotificacion">
        cerrar
      </v-btn>
    </v-snackbar>

    <v-dialog v-model = "ocupado.visible" max-width="400" persistent>
      <v-card>
        <v-toolbar color="primary" dark card>
          <v-toolbar-title>
            {{ocupado.titulo}}
          </v-toolbar-title>
        </v-toolbar>
        <v-card-text class="subheading">
          {{ocupado.mensaje}}
        </v-card-text>
        <v-card-tex>
          <v-progress-linear :indeterminate="true" color="primary">

          </v-progress-linear>
        </v-card-tex>
      </v-card>
    </v-dialog>

    <v-footer color="primary" dark>
      <v-layout justify-center>
        <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque molestias consequuntur eos ipsa totam quidem cum atque harum? Iusto, rerum? Atque mollitia quia ipsa necessitatibus nemo. Aspernatur dolores cupiditate dolorem!</span>
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>
import Home from "@/views/Home.vue";
import Registro from "@/views/usuario/Registro.vue";
import Login from "@/views/usuario/Login.vue";
import Perfil from "@/views/usuario/Perfil.vue";

import { mapState, mapMutations, mapActions} from 'vuex'

export default {
  name: "App",
  components: {
    Home,
    Registro,
    Login,
    Perfil
  },
  data() {
    return {
      titulo: "Súper Opera",
      menu:false
    };
  },
  computed : {
    ...mapState(['ocupado','notificacion']),
    //...mapState({ usuario: state => state.sesion.usuario })
    ...mapState('sesion',['usuario'])
  },
  methods: {
    ...mapMutations(['ocultarNotificacion']),
    //...mapActions(['cerrarSesion']),
    ...mapActions('sesion',['cerrarSesion']),
   
    /* ocultarNotificacion(){
      this.$store.commit('ocultarNotificacion')
    }, */
    salir(){
      this.cerrarSesion();
      //this.$store.dispatch('salir')
      this.menu = false
      this.$router.push({name:'login'})
    }
  },
  /*computed: {
    usuario(){
      return this.$store.state.usuario
    },
    notificacion(){
      return this.$store.state.notificacion
    },
    ocupado(){
      return this.$store.state.ocupado
    }
  },*/
  
};
</script>
<style>
  @import url("https://fonts.googleapis.com/css?family=Great+Vibes&display=swap");

  .logo
  {
     font-family: 'Great Vibes', cursive !important;
     cursor: pointer;
  }

  .nombre{
    color:white;
    text-decoration: none;
    font-size: 1.2rem;
  }
</style>
