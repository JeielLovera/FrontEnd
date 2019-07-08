<template>
    <v-container grid-list-xl text-md-center >
        <div v-if="mostrarProductos">
        <v-flex >
                <v-radio-group row>
                    <v-radio value="1" label="Mediana" color="orange" @click.native="listar(6)"></v-radio>
                    <v-radio value="2" label="Grande" color="orange" @click.native="listar(5)"></v-radio>
                    <v-radio value="3" label="Familiar" color="orange" @click.native="listar(4)"></v-radio>
                    <v-btn flat color="orange" class="btnOrdenar" @click.native="listarCarrito()"><h2>Ordenar</h2></v-btn>
                </v-radio-group>
                
        </v-flex>
        <v-layout row wrap>
            
            <v-flex xs4 md4 v-for="(item,index) in listapizzas" :key="index">
                <v-card>
                    <v-img :src=item.img aspec-ratio="2">
                    </v-img>
                    <v-card-title primary-title>
                        <div>
                            <h3 class="headline mb-0">{{item.nombre}}</h3>
                            <div> {{ item.descripcion }} </div>
                            <h1>${{item.precio}}.00</h1>
                        </div>
                    </v-card-title>
                    <v-card-actions>
                        <v-btn flat color="orange" @click.native="agregarCarrito(item)">Agregar</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
            
        </v-layout>
        </div>

        <div v-if="mostrarCarrito">
            <v-layout>
                <h1 class="h1">Carrito de Compras</h1>
            </v-layout>
            <v-layout row wrap>
                
                <v-flex xs3 v-for="(item,index) in listaaux" :key="index">
                    <v-card>
                        <v-img :src=item.img aspec-ratio="2">
                        </v-img>
                        <v-card-title primary-title>
                            <div>
                                <h3 class="headline mb-0">{{item.nombre}}</h3>
                                <h1>${{item.precio}}.00</h1>
                            </div>
                        </v-card-title>
                    </v-card>
                </v-flex>
            </v-layout>
            <v-layout>
                <h2 class="h2">Total ${{montocarrito}}.00</h2>
                <v-btn flat color="orange" class="btnComprar" @click.native="irComprar()">Comprar</v-btn>
            </v-layout>
        </div>

        <div v-if="mostrarVenta">
            <v-layout align-start>
                <v-flex>
                <!--<v-dialog v-model="dialog" max-width="500px">-->
                <v-card>
            <v-card-title>
              <span class="headline">Ingresa tus datos</span>
            </v-card-title>

            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs6 >
                    <v-text-field v-model="nombres" label="Nombres"></v-text-field>
                  </v-flex>
                   <v-flex xs6>
                    <v-text-field v-model="dni" label="DNI"></v-text-field>
                  </v-flex>
                  <v-flex xs6 >
                    <v-text-field v-model="telefono" label="Telefono"></v-text-field>
                  </v-flex>                 
                  <v-flex xs6 >
                    <v-text-field v-model="referencia" label="Referencia"></v-text-field>
                  </v-flex>
                  <v-flex xs6 >
                    <v-text-field v-model="correo" :rules="correoRules" label="Correo"></v-text-field>
                  </v-flex>
                  <v-flex xs6>
                      <v-select
                                :items="distritos"
                                v-model="distrito"
                                item-text="nombre"
                                label="Selecciona un distrito"
                                single-line
                                return-object
                                /> 
                      
                  </v-flex>
                  <v-flex xs6>
                      <v-select
                                :items="direcciones"
                                v-model="direccion"
                                item-text="nombre"
                                label="Selecciona una dirección"
                                single-line
                                return-object
                                />
                  </v-flex>
                   <v-flex xs6 >
                    <v-text-field v-model="numeroDireccion" label="Numero de Dirección"></v-text-field>
                    </v-flex>
                    
                </v-layout>
              </v-container>
            </v-card-text>

                <v-card-actions>
                <v-spacer></v-spacer>
             <!-- <v-btn color="blue darken-1" flat @click.native="close">Cancelar</v-btn>-->
                <v-btn color="blue darken-1" flat @click.native="comprar()">Finalizar Compra</v-btn>
                </v-card-actions>
                </v-card>
         <!-- </v-dialog>-->
                </v-flex>
            </v-layout>
        </div>

        <v-snackbar
                        v-model="snackbar"
                        :bottom="y === 'bottom'"
                        :left="x === 'left'"
                        :multi-line="mode === 'multi-line'"
                        :right="x === 'right'"
                        :timeout="timeout"
                        :top="y === 'top'"
                        :vertical="mode === 'vertical'"
                        >
                        Compra Realizada
                        <v-btn
                            color="orange"
                            flat
                            @click="snackbar = false"
                        >
                            Close
                        </v-btn>
        </v-snackbar>        

    </v-container>
</template>
   

<script>
import axios from 'axios'

export default {
    data(){
        return{
            listapizzas:[],
            listaaux:[],
            listacarrito:[],
            montocarrito:0,
            mostrarProductos:true,
            mostrarCarrito:false,
            mostrarVenta:false,

            snackbar:false,
            y: 'top',
            x: null,
            mode: '',
            timeout: 3000,

            nombres:"",
            dni:"",
            telefono:"",
            numeroDireccion:"",
            referencia:"",
            correo:"",

            correoRules: [
            v => !!v || 'Se requiere Correo',
            v => /.+@.+/.test(v) || 'Correo no válido'
            ],

            localId:1,
            clienteId:0,
            monto:0,
            igv:0,
            descuento:0,
            montoneto:0,
            mediopago:'',
            numerotarjeta:'',
            pagado:false,
            cliente:"",

            distrito:"",
            distritos:[],
            direccion: "",
            direcciones:[],

        }

    },

    created(){
        this.listar(6);
        this.listardistritos();
        this.listardirecciones();
    },

    methods:{
        listar(tipo){
            let me=this;
            axios.get('api/Producto/Tipoproducto/'+tipo).then(function(response){
                me.listapizzas=response.data;
            }).catch(function(error){
                console.log(error);
            });
        },

        agregarCarrito(item=[]){
            let me=this;
            me.listacarrito.push({
                productoId:item['id'],
                cantidad:1
            });
            me.listaaux.push(item);
            me.montocarrito=me.montocarrito+item.precio;           
            console.log(me.listacarrito);
        },

        listarCarrito(){
            let me=this;
            me.mostrarProductos=false;
            me.mostrarCarrito=true;
        },

        irComprar(){
            let me=this;
            me.mostrarCarrito=false;
            me.mostrarVenta=true;
        },

        listardistritos() { 
            let me = this;
            axios
                .get("api/Distrito")
                .then(function(response) {

                me.distritos = response.data;
                })
                .catch(function(error) {
                console.log(error);
                });
        },
        listardirecciones(){
            let me = this;
            axios
                .get("api/Direccion")
                .then(function(response) {
                me.direcciones = response.data;
                })
                .catch(function(error) {
                console.log(error);
            });
        },

        registrarCliente(){
            let me =this;
            axios.post("api/Cliente",{
                nombres:me.nombres,
                dni:me.dni,
                telefono:me.telefono,
                direccionId:me.direccion.id,
                numeroDireccion:me.numeroDireccion,
                referencia:me.referencia,
                correo:me.correo
            }).then(function(response){
                
            }).catch(function(error){
                console.log(error);
            });

        },


        comprar(){
            this.registrarCliente();
            this.registrarVenta();
            this.snackbar=true;
            this.mostrarVenta=false;
            this.mostrarProductos=true;
            this.listarCarrito=[];
        },

        registrarVenta(){
            let me=this;
            /*this.link="api/Cliente/Nombres/"+me.nombres;
            console.log(this.link);
            axios.get(this.link).then(function(response){
                me.cliente=response.data;
                console.log(me.cliente);
                me.clienteId=me.cliente.id;
            }).catch(function(error){console.log(error);});*/

            axios.post("api/Venta",{
                localId:me.localId,
                clienteId:1,   
                monto:me.montocarrito*0.82,
                igv:me.montocarrito*0.18,
                descuento:me.descuento,
                montoneto:me.montocarrito,
                mediopago:me.mediopago,
                numerotarjeta:me.numerotarjeta,
                pagado:true,
                ventaProducto:me.listacarrito
                
            }).then(function(response){
                console.log(me.clienteId);
            }).catch(function(error){console.log(error);});
    
        }


    }
}
</script>

<style>
.btnOrdenar{
  margin-left: 685px;
}

.h1{
margin-left: 1%
}

.h2{
    padding-top:0.5%;
    margin-left: 1%
}

.btnComprar{
    margin-left: 55%;
}
</style>
