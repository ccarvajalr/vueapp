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
        <v-layout justify-end>
          <v-btn color="secondary" @click="Ingresar()" :depressed="$v.formulario.$invalid" :disabled="$v.formulario.$invalid">Ingresar</v-btn>
        </v-layout>
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
    Ingresar(){
      if(this.$v.formulario.$invalid){
          this.$v.formulario.$touch()
          return
        }
      alert('consultando')
    }
  },
  computed: {
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