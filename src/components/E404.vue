<template>
	<div>
		<h1>{{ title }}</h1>
		<hr>
		Start from <router-link :to="{name: 'catalog'}">main page</router-link>
	</div>
</template>

<script>
	export default {
		props: {
			title: {
				type: String,
				default: "Page not found"
			}
		}
	}
</script>