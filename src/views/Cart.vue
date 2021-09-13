<template>
<div>
	<h1>Cart</h1>
	<hr>
	<table class="table table-bordered table-hover">
		<thead>
			<tr>
				<th>Title</th>
				<th>Price</th>
				<th>Cnt</th>
				<th>Total</th>
				<th>Actions</th>
			</tr>
		</thead>	
		<tbody>
			<tr v-for="product in products" :key="product.id">
				<td>{{ product.title }}</td>
				<td>{{ product.price }}</td>
				<td>{{ product.cnt }}</td>
				<td>{{ product.price * product.cnt }}</td>
				<td>
					<button 
						class="btn btn-warning" 
						@click="setCnt({ id: product.id, cnt: product.cnt - 1 })"
					>-</button>
					<button 
						class="btn btn-success" 
						@click="setCnt({ id: product.id, cnt: product.cnt + 1 })"
					>+</button>
					<button 
						class="btn btn-danger" 
						@click="remove(product.id)"
					>X</button>
				</td>
			</tr>
		</tbody>
	</table>
	<router-link :to="{ name: 'checkout' }" class="btn btn-success">Order now</router-link>
</div>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex';

	export default {
		computed: {
			...mapGetters('cart', { products: 'productsDetailed' })
		},
		methods: {
			...mapActions('cart', ['setCnt', 'remove'])
		}
	}
</script>