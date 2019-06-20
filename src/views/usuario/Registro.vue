<template>
  <v-layout justify-center align-center>
    <v-flex xs12 sm8 md6 lg5 xl4>
      <v-slide-y-transition mode="out-in">
        <!-- CREDENCIALES-->
        <v-card v-if="vista == 1" :key="1" class="elevation-6">
          <v-toolbar color="primary" dark card>
            <v-toolbar-title>Registrate</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-text-field
              @blur="$v.f1.email.$touch()"
              :error-messages="erroresEmail"
              v-model="f1.email"
              label="Email"
            ></v-text-field>
            <v-text-field
              @blur="$v.f1.password.$touch()"
              :error-messages="erroresPassword"
              v-model="f1.password"
              label="Password"
              type="password"
            ></v-text-field>
            <v-text-field
              @blur="$v.f1.repetirPassword.$touch()"
              @keyup.enter="siguiente(1)"
              :error-messages="erroresRepetirPassword"
              v-model="f1.repetirPassword"
              label="Repetir Password"
              type="password"
            ></v-text-field>
          </v-card-text>
          <v-card-text>
            <v-layout justify-end>
              <v-btn
                :depressed="$v.f1.invalid"
                :disabled="$v.f1.invalid"
                color="secondary"
                @click="siguiente(1)"
              >Siguiente</v-btn>
            </v-layout>
          </v-card-text>
          <v-card-actions>
            <v-btn :to="{name:'login'}" flat color="secondary">¿tienes cuenta?.</v-btn>
          </v-card-actions>
        </v-card>

        <!-- DATOS PERSONALES-->
        <v-card v-if="vista == 2" :key="2" class="elevation-6">
          <v-toolbar color="primary" dark card>
            <v-toolbar-title>Ingresa tus Nombres y Apellidos</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-text-field
              :error-messages="erroresNombres"
              @blur="$v.f2.nombres.$touch()"
              v-model="f2.nombres"
              label="Nombres"
            ></v-text-field>
            <v-text-field
              @keyup.enter="siguiente(2)"
              :error-messages="erroresApellidos"
              @blur="$v.f2.apellidos.$touch()"
              v-model="f2.apellidos"
              label="Apellidos"
            ></v-text-field>
          </v-card-text>
          <v-card-text>
            <v-layout>
              <v-flex xs6>
                <v-layout justify-start>
                  <v-btn @click="vista--">Atrás</v-btn>
                </v-layout>
              </v-flex>

              <v-flex xs6>
                <v-layout justify-end>
                  <v-btn
                    color="secondary"
                    :depressed="$v.f2.invalid"
                    :disabled="$v.f2.invalid"
                    @click="siguiente(2)"
                  >Siguiente</v-btn>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>

        <!-- FECHA DE NACIMIENTO-->
        <v-card v-if="vista == 3" :key="3" class="elevation-6">
          <v-toolbar color="primary" dark card>
            <v-toolbar-title>Selecciona tu Fecha de Nacimiento</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-layout justify-center>
              <v-date-picker v-model="fechaNacimiento" reactive locale="es-cl" class="elevation-3"></v-date-picker>
            </v-layout>
          </v-card-text>
          <v-card-text>
            <v-layout>
              <v-flex xs6>
                <v-layout justify-start>
                  <v-btn @click="vista--">Atrás</v-btn>
                </v-layout>
              </v-flex>
              <v-flex xs6>
                <v-layout justify-end>
                  <v-btn color="secondary" @click="vista++">Registrarse</v-btn>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-slide-y-transition>
    </v-flex>
  </v-layout>
</template>

<script>
import {
  required,
  email,
  minLength,
  maxLength,
  sameAs,
  alpha
} from "vuelidate/lib/validators";

import { nombreCompuesto } from "@/utilidades/validaciones";

export default {
  data() {
    return {
      vista: 1,
      f1: {
        email: "",
        password: "",
        repetirPassword: ""
      },
      f2: {
        nombres: "",
        apellidos: ""
      },
      fechaNacimiento: null
    };
  },
  validations: {
    f1: {
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(12)
      },
      repetirPassword: {
        required,
        sameAs: sameAs("password"),
        minLength: minLength(6),
        maxLength: maxLength(12)
      }
    },
    f2: {
      nombres: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(20),
        nombreCompuesto
      },
      apellidos: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(20),
        nombreCompuesto
      }
    }
  },
  methods: {
    siguiente(vista) {
      switch (vista) {
        case 1:
          if (this.$v.f1.$invalid) {
            this.$v.f1.$touch();
            return;
          } else {
            this.vista++;
          }
          break;
        case 2:
          if (this.$v.f2.$invalid) {
            this.$v.f2.$touch();
            return;
          } else {
            this.vista++;
          }
          break;
      }
    }
  },
  computed: {
    erroresEmail() {
      let errores = [];
      if (!this.$v.f1.email.$dirty) {
        return errores;
      }
      if (!this.$v.f1.email.email) {
        errores.push("Ingresa un email válido");
      }
      if (!this.$v.f1.email.required) {
        errores.push("Ingresa tu Email.");
      }

      return errores;
    },
    erroresPassword() {
      let errores = [];
      if (!this.$v.f1.password.$dirty) {
        return errores;
      }
      if (!this.$v.f1.password.minLength) {
        errores.push("Ingresa al menos 6 carácteres");
      }
      if (!this.$v.f1.password.required) {
        errores.push("Ingresa tu password.");
      }

      if (!this.$v.f1.password.maxLength) {
        errores.push("Ingresa máximo 20 carácteres");
      }

      return errores;
    },
    erroresRepetirPassword() {
      let errores = [];
      if (!this.$v.f1.repetirPassword.$dirty) {
        return errores;
      }
      if (!this.$v.f1.repetirPassword.sameAs) {
        errores.push("Las contraseñas no coinciden");
      }
      //test
      return errores;
    },
    erroresNombres() {
      let errores = [];
      if (!this.$v.f2.nombres.$dirty) {
        return errores;
      }
      if (!this.$v.f2.nombres.minLength) {
        errores.push("Ingresa al menos 3 carácteres");
      }
      if (!this.$v.f2.nombres.required) {
        errores.push("Ingresa tus nombres.");
      }
      if (!this.$v.f2.nombres.maxLength) {
        errores.push("Ingresa máximo 20 carácteres");
      }
      if (!this.$v.f2.nombres.nombreCompuesto) {
        errores.push("Ingrese un nombre válido");
      }

      return errores;
    },
    erroresApellidos() {
      let errores = [];
      if (!this.$v.f2.apellidos.$dirty) {
        return errores;
      }
      if (!this.$v.f2.apellidos.minLength) {
        errores.push("Ingresa al menos 3 carácteres");
      }
      if (!this.$v.f2.apellidos.required) {
        errores.push("Ingresa tus apellidos.");
      }
      if (!this.$v.f2.apellidos.maxLength) {
        errores.push("Ingresa máximo 20 carácteres");
      }
      if (!this.$v.f2.apellidos.nombreCompuesto) {
        errores.push("Ingrese un apellido válido");
      }

      return errores;
    }
  }
};
</script>