import React, { useState } from "react"

import { BiArrowBack } from "react-icons/bi"
import { FaLocationDot } from "react-icons/fa6"
import { useNavigate } from "react-router-dom"
import { useCartStore } from "../../stores/cartStore"
import { shallow } from "zustand/shallow"
import { toast } from "react-toastify"

import cash from "../../assets/cash.png"
import momo from "../../assets/momo.png"

import CartItem from "../../components/Cart/CartItem"
import "./Cart.scss"
const VITE_APP_ORDER_SERVICE = import.meta.env.VITE_APP_ORDER_SERVICE

const Cart = () => {
	const navigate = useNavigate()
	const [useDelivery, setUseDelivery] = useState(false)
	const [paymentType, setPaymentType] = useState("CASH")

	const { cart, totalPrice, resetStore } = useCartStore(
		(state) => ({
			cart: state.cart,
			addItemToCart: state.addItemToCart,
			totalItems: state.totalItems,
			totalPrice: state.totalPrice,
			resetStore: state.resetStore,
		}),
		shallow,
	)

	async function handlePlaceOrder() {
		const data = transformDataForApiRequest()
		const res = await fetch(VITE_APP_ORDER_SERVICE, {
			method: "POST",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
			},
		})
		if (!res.ok) {
			toast("error when creating order")
			return
		}
		navigate("/student")
		resetStore()
	}

	function transformDataForApiRequest() {
		const orderItems = Object.values(cart).map((dish) => ({
			dishName: dish.name,
			quantity: dish.quantity,
		}))
		const userId = JSON.parse(localStorage.getItem("user_info")).id

		return {
			userId,
			orderItems,
			imageUrl: Object.values(cart)[0].imgUrl,
			totalPrice,
			useDelivery,
			paymentType,
		}
	}

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

				<div className="summary mt-6">
					<p className="font-semibold">Order summary</p>
					<div className="mt-2">
						{Object.values(cart).map((item) => (
							<CartItem item={item} key={item.name} />
						))}
					</div>
				</div>

				<div className="line w-full h-[1.5px] bg-gray-200 my-4">&nbsp;</div>
				<div className="px-2 text-[0.8rem]">
					<div className="flex justify-between items-center">
						<p>Subtotal:</p>
						<p>{totalPrice},000₫</p>
					</div>
					{useDelivery && (
						<div className="flex justify-between items-center mt-1">
							<p>Shipping fee:</p>
							<p>{10},000₫</p>
						</div>
					)}
				</div>

				<div className="payment mt-4">
					<p className="font-semibold">Payment method</p>
					<div
						className={`payment-type mt-4 ${
							paymentType === "CASH" ? "selected" : ""
						} flex items-center gap-4`}
						onClick={() => setPaymentType("CASH")}>
						<img src={cash} alt="" className="w-[2rem] -mt-2" />
						Pay by cash
					</div>
					<div
						className={`payment-type mt-4 ${
							paymentType === "MOMO" ? "selected" : ""
						} flex items-center gap-4`}
						onClick={() => setPaymentType("MOMO")}>
						<img src={momo} alt="" className="w-[1.5rem]" />
						Pay by Momo
					</div>
				</div>

				<div className="my-8">
					<div className="flex justify-between">
						<p className="text-[0.9rem]">Your order</p>
						<p className="font-bold">{totalPrice + (useDelivery ? 10 : 0)},000₫</p>
					</div>
					<button
						className="bg-orange-200 text-orange-600 font-bold w-full mt-4 p-4 rounded-xl"
						onClick={handlePlaceOrder}>
						Place order
					</button>
				</div>
			</div>
		</>
	)
}

export default Cart
