import { makeRequest } from '@/api/server';

export default {
	namespaced: true,
	state: {
		products: [],
		token: null
	},
	getters: {
		length: state => state.products.length,
		has: state => id => state.products.some(pr => pr.id === id),
		productsDetailed(state, getters, rootState, rootGetters){
			return state.products.map(pr => {
				let info = rootGetters['products/item'](pr.id);
				return { ...pr, ...info };
			});
		},
		total: (state, getters) => getters.productsDetailed.reduce((t, pr) => t + pr.price * pr.cnt, 0)
	},
	mutations: {
		add(state, id){
			state.products.push({ id, cnt: 1 });
		},
		remove(state, id){
			state.products = state.products.filter(pr => pr.id !== id);
		},
		setCnt(state, { id, cnt }){
			let i = state.products.findIndex(pr => pr.id === id);
			state.products[i].cnt = Math.max(1, cnt);
		},
		setCart(state, { token, cart }){
			state.token = token;
			state.products = cart;
		}
	},
	actions: {
		async add({ state, getters, commit }, id){
			if(!getters.has(id)){
				let url = `http://faceprog.ru/reactcourseapi/cart/add.php?token=${state.token}&id=${id}`;
				let res = await makeRequest(url);

				if(res){
					commit('add', id);
				}
			}
		},
		async remove({ state, getters, commit }, id){
			if(getters.has(id)){
				let url = `http://faceprog.ru/reactcourseapi/cart/remove.php?token=${state.token}&id=${id}`;
				let res = await makeRequest(url);

				if(res){
					commit('remove', id);
				}
			}
		},
		setCnt(store, payload){
			if(store.getters.has(payload.id)){
				store.commit('setCnt', payload);
			}
		},
		async load(store){
			let oldToken = localStorage.getItem('CART_TOKEN');
			let url = `http://faceprog.ru/reactcourseapi/cart/load.php?token=${oldToken}`;
			let { needUpdate, cart, token } = await makeRequest(url);
			
			if(needUpdate){
				localStorage.setItem('CART_TOKEN', token);
			}

			store.commit('setCart', { cart, token });
		}
	}
}