<template>
  <v-layout justify-center align-center>
    <v-flex xs12 sm8 md6 lg5 xl4>
      <v-card class="elevation-6">
        <v-toolbar color="primary" dark card>
          <v-toolbar-title>Ingresa tus Credenciales</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-text-field
            label="Email"
            v-model="formulario.email"
            :error-messages="erroresEmail"
            @blur="$v.formulario.email.$touch()"
          ></v-text-field>
          <v-text-field
            label="Password"
            type="password"
            v-model="formulario.password"
            :error-messages="erroresPassword"
            @blur="$v.formulario.password.$touch()"
            @keyup.enter="Ingresar"
          ></v-text-field>
        </v-card-text>
        <v-card-text>
            <v-layout justify-end>
               <v-btn color="secondary" @click="Ingresar()" :depressed="$v.formulario.$invalid" :disabled="$v.formulario.$invalid">Ingresar</v-btn>
            </v-layout>
        </v-card-text>
        <v-card-actions>
          <v-btn :to="{name:'registro'}" flat color="secondary">
            ¿No tienes cuenta? Registrate.
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
import {
  required,
  email,
  minLength,
  maxLength
} from "vuelidate/lib/validators";

//actions y mutations van en metodos y state y getters va en campos calculados(computed)
import { mapMutations, mapGetters} from 'vuex'

export default {
  data() {
    return {
      formulario: {
        email: "",
        password: ""
      }
    };
  },

  validations: {
    formulario: {
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(12)
      }
    }
  },
  methods: {
    ...mapMutations(['mostrarOcupado','ocultarOcupado','mostrarInformacion']),
    ...mapMutations('sesion',['actualizarUsuario']),
    Ingresar(){
      if(this.$v.formulario.$invalid){
          this.$v.formulario.$touch()
          return
        }
     let usuario = {
       userName : 'newton',
       nombres:'claudio',
       apellidos:'carvajal',
       sexo:'M',
       descripcion:'Descripcion',
       biografia:'',
       fotoPerfil:'https://upload.wikimedia.org/wikipedia/commons/8/83/Sir_Isaac_Newton_%281643-1727%29.jpg'

     }
     let ocupado = {
       titulo:'Validando Credenciales',
       mensaje:'Estamos validando tu información...'
     }
      
      this.mostrarOcupado(ocupado)

      setTimeout(() => {
        //this.$store.state.usuario = usuario
        //let mensaje = this.$store.getters.saludo//`Bienvenido ${usuario.nombres} ${usuario.apellidos}`
        //this.$store.commit('mostrarInformacion',{ mensaje,color})
        
        this.ocultarOcupado()
        this.actualizarUsuario(usuario)
        let mensaje = this.saludo//`Bienvenido ${usuario.nombres} ${usuario.apellidos}`
        let color = 'success'
        this.mostrarInformacion({ mensaje,color});
        this.$router.push({name:'home'})

      }, 1000);

      
    }
  },
  computed: {
    ...mapGetters('sesion',['saludo']),
    erroresEmail() {
      let errores = [];
      if (!this.$v.formulario.email.$dirty) {
        return errores;
      }
      if (!this.$v.formulario.email.email) {
        errores.push("Ingresa un email válido");
      }
      if (!this.$v.formulario.email.required) {
        errores.push("Ingresa tu Email.");
      }

      return errores;
    },
    erroresPassword() {
      let errores = [];
      if (!this.$v.formulario.password.$dirty) {
        return errores;
      }
      if (!this.$v.formulario.password.minLength) {
        errores.push("Ingresa al menos 6 carácteres");
      }
      if (!this.$v.formulario.password.required) {
        errores.push("Ingresa tu password.");
      }

      if (!this.$v.formulario.password.maxLength) {
        errores.push("Ingresa máximo 20 carácteres");
      }

      return errores;
    }
  }
};
</script>