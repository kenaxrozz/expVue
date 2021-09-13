import { makeRequest } from '@/api/server';

export default {
	namespaced: true,
	state: {
		items: []
	},
	getters: {
		all: state => state.items,
		itemsMap(state){
			let map = {};

			state.items.forEach((pr, i) => {
				map[pr.id.toString()] = i;
			});
			
			return map;
		},
		item: (state, getters) => id => state.items[getters.itemsMap[id]]
	},
	mutations: {
		setItems(state, items){
			state.items = items;
		}
	},
	actions: {
		async load(store){
			let items = await makeRequest('http://faceprog.ru/reactcourseapi/products/all.php');
			store.commit('setItems', items);
		}
	}
}