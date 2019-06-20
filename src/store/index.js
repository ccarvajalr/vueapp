import Vue from 'vue'
import Vuex from 'vuex'
import { stat } from 'fs';
import sesion from './sesion'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    notificacion : {
      visible: false,
      color:'info',
      mensaje: ''
    },
    ocupado:{
      titulo:'',
      visible:false,
      mensaje: ''
    }
  },
  mutations: {
    mostrarInformacion(state,{mensaje,color}){
      state.notificacion.mensaje = mensaje
      state.notificacion.visible = true
      //alert(color)
      state.notificacion.color = color
    },
    ocultarNotificacion(state)
    {
      state.notificacion.visible = false
    },
    mostrarOcupado(state,ocupado)
    {
        state.ocupado.mensaje = ocupado.mensaje
        state.ocupado.titulo = ocupado.titulo
        state.ocupado.visible = true
    },
    ocultarOcupado(state)
    {
      state.ocupado.visible = false
    }

  },
  actions:{
    
  },
  getters:{
   
  },
  modules: {
    sesion
  }
})
