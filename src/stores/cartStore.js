import { create } from "zustand"

export const useBearStore = create((set) => ({
	cart: {},
	totalItems: 0,
	totalPrice: 0,

	addItemToCart: (newItem) =>
		set((state) => {
			if (state.cart[newItem.name]) {
				state.cart[newItem.name].quantity++
			} else {
				state.cart[newItem.name] = {
					...newItem,
					quantity: 1,
				}
			}

			state.totalItems++
			state.totalPrice += +newItem.price

			return { cart: state.cart }
		}),
}))
