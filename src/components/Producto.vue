<template>
<v-container grid-list-md text-md-center>
<v-layout row wrap>
    <v-flex xs4 md4 v-for="(item,index) in listapizzas" :key="index">
        <v-card>
            <v-img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSF2tN7hLs908GQ0EygSrj5tCPNT0dZBuwZX0fs-fV8txWI_dW-LQ" aspec-ratio="2">
            </v-img>
            <v-card-title primary-title>
                <div>
                    <h3 class="headline mb-0">{{item.nombre}}</h3>
                    <div> {{ item.descripcion }} </div>
                </div>
            </v-card-title>
            <v-card-actions>
                <v-btn flat color="orange">Agregar</v-btn>
            </v-card-actions>
        </v-card>
    </v-flex>
    
</v-layout>
</v-container>

</template>
   

<script>
import axios from 'axios'

export default {
    data(){
        return{
            listapizzas:[]
        }

    },

    created(){
        this.listar(4);
    },

    methods:{
        listar(tipo){
            let me=this;
            axios.get('api/Producto/Tipoproducto/'+tipo).then(function(response){
                me.listapizzas=response.data;
            }).catch(function(error){
                console.log(error);
            });
        }
    }
}
</script>
