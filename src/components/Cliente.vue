<template>
    <v-layout>
        <div class="clientes">
            <h1 class="subheading grey--text">Clientes</h1>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="600px">
                <v-btn  slot="activator" color = "primary"  dark class="mb-2">Agregar Cliente</v-btn>
                <v-card>
                    <c-card-text>
                        <v-container  grid-list-md>
                            <v-layout wrap>
                                <v-flex xs7 sm7 md7>
                                    <v-text-field v-model="nombres" label="Ingrese Nombres y Apellidos" > </v-text-field>
                                </v-flex>
                                <v-flex xs5 sm5 md5>
                                    <v-text-field v-model="dni" label="Dni" > </v-text-field>
                                </v-flex>
                                <v-flex xs8 sm8 md8>
                                    <v-select  
                                    :items="direcciones"
                                    v-model="direccion"
                                    item-text="nombre"
                                    label="Selecciona la dirección"
                                    single-line
                                    return-object
                                    />
                                </v-flex>
                                <v-flex xs4 sm4 md4>
                                    <v-text-field v-model="numerodireccion" label="Número de la Dirección" > </v-text-field>
                                </v-flex>
                                <v-flex xs12 sm12 md12>
                                    <v-text-field v-model="referencia" label="Referencia" > </v-text-field>
                                </v-flex>
                                <v-flex xs12 sm12 md12>
                                    <v-text-field v-model="telefono" label="Teléfono" > </v-text-field>
                                </v-flex>
                                <v-flex xs12 sm12 md12>
                                    <v-text-field v-model="correo" label="Correo" > </v-text-field>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </c-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer> 
                        <v-btn @click="dialog = false" dark color="warning" flat>Cancelar</v-btn>
                        <v-btn @click="guardar()" dark color="warning">Guardar</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        <v-data-table
            :headers="headers"
            :items="clientes"
            class="elevation-1"
            >
                <template slot="items" slot-scope="props">
                    <td>{{ props.item.id }}</td>
                    <td>{{ props.item.nombres }}</td>
                    <td>{{ props.item.dni }}</td>
                    <td>{{ props.item.direccion.nombre }}</td>
                    <td>{{ props.item.numerodireccion }}</td>
                    <td>{{ props.item.referencia }}</td>
                    <td>{{ props.item.telefono }}</td>
                    <td>{{ props.item.correo }}</td>
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
                    text: 'Nombres',
                    value: 'nombres',
                    sortable: true
                },
                {
                    text: 'Dni',
                    value: 'dni',
                    sortable: true
                },
                {
                    text: 'Direccion',
                    value: 'direccion',
                    sortable: true
                },
                {
                    text: 'Numero de Direccion',
                    value: 'numerodireccion',
                    sortable: true
                },
                {
                    text: 'Referencia',
                    value: 'referencia',
                    sortable: false
                },
                {
                    text: 'Teléfono',
                    value: 'telefono',
                    sortable: false
                },
                {
                    text: 'Correo',
                    value: 'corre',
                    sortable: false
                },
            ],
        id: "",
        nombres: "",
        dni: "",
        direccion: "",
        direcciones: [],
        numerodireccion:"",
        referencia: "",
        telefono: "",
        correo: "",
        clientes: [],
        }
    },
    watch: {
    dialog(val){
      val || this.close()
    }
  },
  created() {
        this.listar();
        this.listardireccion();
    },
    methods: {
        close() {
      this.dialog = false;
    },
    listar() { 
      let me = this;
      axios
        .get("api/cliente")
        .then(function(response) {
          //console.log(response);
          me.clientes = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    listardireccion() { 
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
        guardar() {

            let me = this;

            axios
                .post("api/cliente", {
                    nombres: me.nombres,
                    dni: me.dni,
                    direccion: me.direccion,
                    direccionid: me.direccion.id,
                    numerodireccion: me.numerodireccion,
                    referencia: me.referencia,
                    telefono: me.telefono,
                    correo: me.correo
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
