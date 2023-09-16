import React from "react"
import { useCartStore } from "../../stores/cartStore"

const CartItem = ({ item }) => {
	const { cart, addItemToCart, removeItemFromCart } = useCartStore((store) => ({
		cart: store.cart,
		addItemToCart: store.addItemToCart,
		removeItemFromCart: store.removeItemFromCart,
	}))

	function handleDecrease(item) {
		if (item.quantity === 1) return
		removeItemFromCart(item)
	}

	function handleIncrease() {
		addItemToCart(item)
	}

	return (
		<div className="mb-8 flex gap-8 justify-between">
			<img src={item.imgUrl} alt="" className="w-[3rem] h-[3rem] rounded-lg" />
			<div>
				<p className="font-semibold">{item.name}</p>
				<p className="text-[0.8rem]">{item.price * item.quantity},000₫</p>
			</div>
			<div className="flex ml-auto gap-4 items-center w-[90px] justify-between">
				<button
					className="h-[1.5rem] w-[1.5rem] rounded-full bg-orange-100 text-orange-600"
					onClick={() => handleDecrease(item)}>
					-
				</button>
				<p className="">{item.quantity}</p>
				<button
					className="h-[1.5rem] w-[1.5rem] rounded-full bg-green-100 text-green-600"
					onClick={() => handleIncrease(item)}>
					+
				</button>
			</div>
		</div>
	)
}

export default CartItem
