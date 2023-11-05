import React, { useEffect, useState } from "react"
import Navbar from "../../components/Navbar"
import orderImg from "../../assets/order.png"
import "./MyOrder.scss"

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
		const res = await fetch(`${VITE_APP_ORDER_SERVICE}/2`)
		const data = await res.json()
		setOrders(data)
	}

	return (
		<>
			<div className="page">
				<h2 className="text-center text-lg">Your orders</h2>
				<div className="mt-[3rem] flex flex-col gap-0">
					{orders.map((order) => (
						<div key={Math.random()} className="p-2 py-4 rounded-lg border-b">
							<div className="flex gap-8 ">
								<img src={`${IMG_SERVER}${order.imageUrl}`} alt="" className="w-12 h-12 rounded-lg" />
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
							<div className="mt-2 text-sm text-right text-gray-500">
								Total price:{" "}
								<span className="font-[500] text-base ml-2 text-black">{order.totalPrice},000₫</span>
							</div>
						</div>
					))}
				</div>
			</div>
			<Navbar />
		</>
	)
}

export default MyOrder
