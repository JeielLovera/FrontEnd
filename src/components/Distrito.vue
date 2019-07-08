<template>
    <v-layout>
        <div class = "distritos">
            <h1 class="subheading grey--text">Distritos</h1>
            <v-spacer> </v-spacer>
            
            <v-text-field  class="text-xs-center"
             v-model="nombre"
             append-icon="search" 
             label="Ingrese Distrito a buscar" box
             @keyup.enter="buscarpornombre()">
            </v-text-field>

            <v-dialog v-model="dialog" max-width="500px">
                <v-btn slot="activator" color = "primary"  dark class="mb-2"> Agregar Distrito</v-btn>
                <v-card>
                    <v-card-text>
                        <v-container grid-list-md>
                            <v-layout wrap>
                                <v-flex xs12 sm12 md12>
                                    <v-text-field v-model="nombre" label="Nombre del Distrito" > </v-text-field>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer> 
                        <v-btn @click="dialog = false" dark color="warning" flat>Cancelar</v-btn>
                        <v-btn @click="guardar()" dark color="warning">Guardar</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>

            <v-layout row wrap>
                <v-data-table
            :headers="headers"
            :items="distritos"
            class="elevation-1"
            >
                <template slot="items" slot-scope="props">
                    <td>{{ props.item.id }}</td>
                    <td>{{ props.item.nombre }}</td>
                </template>
            </v-data-table>
            </v-layout>
        </div>
    </v-layout>
</template>


<script>
import axios from 'axios'
export default {
    data(){
        return{
            dialog:false,
            headers: [
                {
                    text: 'Id',
                    value: 'id'
                },
                {
                    text: 'Nombre',
                    value: 'nombre',
                    sortable: true
                },
            ],
        id: "",
        nombre: "",
        distritos: [],
        marker: true,
        }
    },
    watch: {
    dialog(val){
      val || this.close()
    }
  },
  created() {
        this.listar();
    },
  methods: {
    close() {
      this.dialog = false;
    },
    listar() { 
      let me = this;
      axios
        .get("api/distrito")
        .then(function(response) {
          //console.log(response);
          me.distritos = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    buscarpornombre(){
            let me = this;
                axios.get('api/distrito/Nombre/' + me.nombre).then(function (response) {
                    console.log(response);
                    me.distritos = response.data;
                }).catch(function (error) {
                    console.log(error);
                });
    },
    guardar() {
            let me = this;
            axios 
                .post("api/distrito", {
                    nombre: me.nombre
                })
                .then(function (response) {
                    me.close();
                    me.listar();
                })
                .catch(function (error) {
                    console.log(error); 
                });
        },
  }
}
</script>
