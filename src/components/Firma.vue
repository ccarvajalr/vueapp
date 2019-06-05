<template>
     <canvas @mousemove="dibujar" ref="canFirma" class="firma" width="380" height="200"></canvas>
</template>
<script>
export default {
    data(){
        return{
            ctx:null,
            x0:0,
            y0:0
        }
    },
    methods: {
        dibujar(event){

        }
    },
    mounted(){
        this.ctx = this.$refs.canFirma.getContext('2d');
        this.ctx.strokeStyle = '#303030';
        this.ctx.lineWidht = 5;
        this.ctx.lineCap = 'round'
    }

}
</script>
<style>
    .firma{
        cursor: pointer;
        background-color: white;
        border-radius: 5px;
        box-shadow: inset 0 0 10px #000;

    }
</style>
