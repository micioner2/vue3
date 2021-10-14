import { createStore } from 'vuex'

export default createStore({
  state: {
    productos:[],
    carrito:{}
  },
  mutations: {
    setProductos(state,payload){
      state.productos = payload
    },
    setCarrito(state,payload){
      state.carrito[payload.id] = payload
    },
    vaciarCarrito(state){
      state.carrito = {}
    },

    aumentar(state,payload){
      state.carrito[payload].cantidad += 1; 
    },
    disminuir(state,payload){
      const data = state.carrito[payload];
      data.cantidad != 1 ? data.cantidad -= 1 : delete state.carrito[payload]
    }
  },
  actions: {
    async fetchData({commit}){
      const response = await fetch('api.json');
      const data = await response.json();
      commit('setProductos',data);
    },

    agregarItemCarro({commit,state},producto){
      state.carrito.hasOwnProperty(producto.id) ? producto.cantidad = state.carrito[producto.id].cantidad +1 : producto.cantidad = 1
      commit('setCarrito',producto) 
    }
  },

  getters:{
    totalCantidad(state){
      return Object.values(state.carrito).reduce((acc, {cantidad})=> acc + cantidad, 0);
    },

    totalPrecio(state){
      return Object.values(state.carrito).reduce((acc, {cantidad,precio})=> acc + (cantidad * precio), 0);
    }

  },
  modules: {
  }
})
