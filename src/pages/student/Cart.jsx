import React, { useState } from "react"
import { BiArrowBack } from "react-icons/bi"
import { FaLocationDot } from "react-icons/fa6"
import { useNavigate } from "react-router-dom"
import { useCartStore } from "../../stores/cartStore"
import { shallow } from "zustand/shallow"
import CartItem from "../../components/Cart/CartItem"

const Cart = () => {
	const navigate = useNavigate()
	const [useDelivery, setUseDelivery] = useState(false)

	const { cart, addItemToCart, totalItems, totalPrice } = useCartStore(
		(state) => ({
			cart: state.cart,
			addItemToCart: state.addItemToCart,
			totalItems: state.totalItems,
			totalPrice: state.totalPrice,
		}),
		shallow,
	)
	console.log("🚀 -> file: Cart.jsx:11 -> cart:", cart)

	return (
		<>
			<div className="page">
				<div className="cart--header flex items-center justify-between">
					<BiArrowBack className="text-[1.5rem]" onClick={() => navigate(-1)} />
					<p className="text-[1.2rem]">Your cart</p>
					<div className="w-[24px]">&nbsp;</div>
				</div>

				<div className="delivery mt-8">
					<p className="flex items-center text-gray-600">
						Do you want delivery service
						<input
							type="checkbox"
							className="ml-2"
							onClick={() => setUseDelivery((state) => !state)}
							value={useDelivery}
						/>
					</p>
					<div className="mt-2 flex FaLocationDot items-start gap-4">
						<FaLocationDot className="text-red-500 text-[1.2rem] mt-2" />
						<div>
							<p className="font-semibold">Room 504 - VGU Dormitory</p>
							<p className="text-gray-600">0372699635</p>
						</div>
					</div>
				</div>

				<div className="line w-full h-[1px] bg-gray-200 my-4">&nbsp;</div>

				<div className="summary">
					<p className="font-semibold">Order summary</p>
					<div className="mt-2">
						{Object.values(cart).map((item) => (
							<CartItem item={item} key={item.name} />
						))}
					</div>
				</div>

				<div className="line w-full h-[1.5px] bg-gray-200 my-4">&nbsp;</div>
				<div className="px-2">
					<div className="flex justify-between items-center">
						<p className="text-[0.8rem] font-semibold text-orange-600">Subtotal:</p>
						<p>{totalPrice},000₫</p>
					</div>
					{useDelivery && (
						<div className="flex justify-between items-center mt-1">
							<p className="text-[0.8rem] font-semibold text-orange-600">Shipping fee:</p>
							<p>{10},000₫</p>
						</div>
					)}
				</div>
			</div>
		</>
	)
}

export default Cart
