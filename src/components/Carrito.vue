<template>
    <div class="my-5">
        <h4>Carrito de compras</h4>
        <table class="table">
            <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Item</th>
                <th scope="col">Cantidad</th>
                <th scope="col">Acción</th>
                <th scope="col">Total</th>
            </tr>
            </thead>
            <tbody id="items">
                <Item 
                    v-for="(item,index) in items" :key="index"
                    :item="item"
                />
            </tbody>
            <tfoot v-if="Object.keys(items).length == 0">
                <tr id="footer-carrito">
                    <th scope="row" colspan="5">Carrito vacío - comience a comprar!</th>
                </tr>
            </tfoot>
            <Footer v-else/>

        </table>
    </div>
</template>

<script>
import { computed } from '@vue/reactivity';
import {useStore} from 'vuex';
import Item from './Item.vue';
import Footer from './Footer.vue';
export default {
    components:{
        Item,
        Footer
    },
    setup(){
        const store = useStore();
        const items = computed(() => store.state.carrito);

        return {items}
    }
}
</script>

