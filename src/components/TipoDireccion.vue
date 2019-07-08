<template>
    <v-layout>
        <div class = "tipodirecciones">
            <h1 class="subheading grey--text">Tipo de Direcciones</h1>
            <v-spacer> </v-spacer>


            <v-dialog v-model="dialog" max-width="500px">
                <v-btn slot="activator" color = "primary"  dark class="mb-2"> Agregar Tipo de Direccion</v-btn>
                <v-card>
                    <v-card-text>
                        <v-container grid-list-md>
                            <v-layout wrap>
                                <v-flex xs12 sm12 md12>
                                    <v-text-field v-model="nombre" label="Nombre del Tipo de Dirección" > </v-text-field>
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

            <v-data-table
            :headers="headers"
            :items="tipodirecciones"
            class="elevation-1"
            >
                <template slot="items" slot-scope="props">
                    <td>{{ props.item.id }}</td>
                    <td>{{ props.item.nombre }}</td>
                </template>
            </v-data-table>
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
        tipodirecciones: [],
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
        .get("api/tipodireccion")
        .then(function(response) {
          //console.log(response);
          me.tipodirecciones = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    guardar() {
            let me = this;
            axios
                .post("api/tipodireccion", {
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
