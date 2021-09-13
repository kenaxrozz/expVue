<template>
	<div>
		<h1>Products</h1>
		<div class="row">
			<div class="col col-sm-4 mb-3 mt-3"
				v-for="product in products"
				:key="product.id"
			>
				<div class="card">
					<div class="card-body">
						<h3>{{ product.title }}</h3>
						<div>{{ product.price }}</div>
						<router-link :to="`/product/${product.id}`">Read more</router-link>
						<hr>
						<button v-if="inCart(product.id)" class="btn btn-danger" @click="removeFromCart(product.id)">
							Remove
						</button>
						<button v-else class="btn btn-success" @click="addToCart(product.id)">
							Add to cart
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex';
	// ['all'], { all: 'all' }, { allProducts: 'all' }

	export default {
		computed: {
			...mapGetters('products', { products: 'all' }),
			...mapGetters('cart', { inCart: 'has' })
		},
		methods: {
			...mapActions('cart', { addToCart: 'add', removeFromCart: 'remove' })
		}
	}
</script>

<style scoped>
	.row{
		padding-left: 15px;
	}
</style>