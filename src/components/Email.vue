<template>
  <div class="seccion">
    <div class="atributo">
      <input type="text" @keyup.enter="actualizarEmail" name id>
      <input type="text" v-model="email" name id>
    </div>
    <div class="atributo">
      <span>{{email}}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: ""
    };
  },
  watch: {
      email(newValue, oldValue){
          //console.log( newValue, oldValue);
          
          if(newValue === 'email')
          {
              alert('Email');
          }

      }
  },
  methods: {
    actualizarEmail(event) {
      this.email = event.target.value;
    }
  }
};
</script>