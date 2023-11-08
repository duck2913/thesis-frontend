import React, { useEffect, useState } from "react"
import Navbar from "../../components/Navbar"
import orderImg from "../../assets/order.png"
import "./MyOrder.scss"
import { MdDeliveryDining } from "react-icons/md"

const IMG_SERVER = import.meta.env.VITE_APP_MENU_SERVICE
const VITE_APP_ORDER_SERVICE = import.meta.env.VITE_APP_ORDER_SERVICE
const defaultOrders = [
	{
		items: [
			{
				name: "bún bò",
				quantity: 1,
			},
			{
				name: "trà đá",
				quantity: 1,
			},
		],
		status: "new",
		totalPrice: 10000,
	},
	{
		items: [
			{
				name: "bún bò",
				quantity: 1,
			},
			{
				name: "trà đá",
				quantity: 1,
			},
		],
		status: "cooking",
		totalPrice: 10000,
	},
	{
		items: [
			{
				name: "bún bò",
				quantity: 1,
			},
			{
				name: "trà đá",
				quantity: 1,
			},
		],
		status: "delivery",
		totalPrice: 10000,
	},
	{
		items: [
			{
				name: "bún bò",
				quantity: 1,
			},
			{
				name: "trà đá",
				quantity: 1,
			},
			{
				name: "trà đá",
				quantity: 1,
			},
			{
				name: "trà đá",
				quantity: 1,
			},
		],
		status: "done",
		totalPrice: 10000,
	},
]

const MyOrder = () => {
	const [orders, setOrders] = useState(defaultOrders)

	useEffect(() => {
		getOrders()
	}, [])

	async function getOrders() {
		const userInfo = JSON.parse(localStorage.getItem("user_info"))
		const userId = userInfo.id
		if (!userId) return
		const res = await fetch(`${VITE_APP_ORDER_SERVICE}/orders/users/${userId}`)
		const data = await res.json()
		setOrders(data)
	}

	async function handleAcceptOrder(orderId) {
		const selectedOrder = orders.find((order) => order.id === orderId)
		selectedOrder.status = "DONE"
		await updateOrderStatus(orderId)
		setOrders((orders) => orders.filter((order) => order.id !== orderId))
	}

	async function updateOrderStatus(orderId) {
		const res = await fetch(`${VITE_APP_ORDER_SERVICE}/${orderId}`, {
			method: "PUT",
		})
	}

	return (
		<>
			<div className="page">
				<h2 className="text-center text-lg">Your orders</h2>
				<div className="mt-[3rem] flex flex-col gap-0">
					{orders.length === 0 && <div className="text-center text-gray-500">You don't have any orders</div>}
					{orders?.map((order) => (
						<div key={Math.random()} className="p-2 py-4 rounded-lg border-b">
							<div className="flex gap-8 ">
								<img src={`${IMG_SERVER}/${order.imageUrl}`} alt="" className="w-12 h-12 rounded-lg" />
								<div className="item-list">
									{order?.orderItems?.map((item) => (
										<div className="" key={Math.random()}>
											{item.dishName}{" "}
											<span className="text-sm text-gray-500">x{item.quantity}</span>
										</div>
									))}
								</div>
								<div className="w-[100px] text-center ml-auto">
									<p className="text-xs mb-1">Status</p>
									<p
										className={`order-status rounded-md inline-block px-2 ${order.status.toLowerCase()}`}>
										{order.status.toLowerCase()}
									</p>
								</div>
							</div>
							{order.useDelivery && (
								<div className="flex gap-2 text-sm mt-2 text-teal-400 items-center">
									<MdDeliveryDining />
									This order use delivery service
								</div>
							)}
							<div className="mt-2 text-sm text-right text-gray-500">
								Total price:{" "}
								<span className="font-[500] text-base ml-2 text-black">{order.totalPrice},000₫</span>
							</div>
							{order.useDelivery && (
								<button
									className="bg-green-100 text-green-500 rounded-full px-2 py-[2px] text-right block ml-auto mt-2"
									onClick={() => handleAcceptOrder(order.id)}>
									Receive
								</button>
							)}
						</div>
					))}
				</div>
			</div>
			<Navbar />
		</>
	)
}

export default MyOrder
