<template>
    <v-layout>
        <div class="direcciones">
            <h1 class="subheading grey--text">Direcciones</h1>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
                <v-btn slot="activator" color = "primary"  dark class="mb-2"> Agregar Direccion</v-btn>
                <v-card>
                    <v-card-text>
                        <v-container grid-list-md>
                            <v-layout wrap>
                                <v-flex xs12 sm12 md12>
                                    <v-text-field v-model="nombre" label="Nombre y Num de la Direccion" > </v-text-field>
                                </v-flex>
                                <v-select
                                :items="distritos"
                                v-model="distrito"
                                item-text="nombre"
                                label="Selecciona un distrito"
                                single-line
                                return-object
                                /> 
                                <v-select
                                :items="tipodirecciones"
                                v-model="tipodireccion"
                                item-text="nombre"
                                label="Selecciona el tipo de dirección"
                                single-line
                                return-object
                                />

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
            :items="direcciones"
            class="elevation-1"
            >
                <template slot="items" slot-scope="props">
                    <td>{{ props.item.id }}</td>
                    <td>{{ props.item.nombre }}</td>
                    <td>{{ props.item.distrito.nombre }}</td>
                    <td>{{ props.item.tipodireccion.nombre }}</td>
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
                {
                    text: 'Distrito',
                    value: 'distrito',
                    sortable: true
                },
                {
                    text: 'Tipo de Direccion',
                    value: 'tipodireccion',
                },
            ],
        id: "",
        nombre: "",
        distrito: "",
        tipodireccion:  "",
        direcciones: [],
        tipodireccion: "",
        tipodirecciones:[],
        distrito: "",
        distritos: [],
        }
    },
    watch: {
    dialog(val){
      val || this.close()
    }
  },
  created() {
        this.listar();
        this.listardistritos();
        this.listartdireccion();
    },
    methods: {
        close() {
      this.dialog = false;
    },
    listar() { 
      let me = this;
      axios
        .get("api/direccion")
        .then(function(response) {
          //console.log(response);
          me.direcciones = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    listardistritos() { 
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
    listartdireccion(){
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
                .post("api/direccion", {
                    nombre: me.nombre,
                    distrito: me.distrito,
                    distritoid: me.distrito.id,
                    tipodireccion: me.tipodireccion,
                    tipodireccionid: me.tipodireccion.id
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
