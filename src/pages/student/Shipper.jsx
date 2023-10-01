import React, { useState } from "react"
import Navbar from "../../components/Navbar"
import orderImg from "../../assets/order.png"
import { FaLocationDot } from "react-icons/fa6"
import { BsFillTelephoneFill } from "react-icons/bs"

const orders = [
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
		phone: "0372699635",
		address: "Room 304",
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
		phone: "0372699635",
		address: "Room 304",
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
		phone: "0372699635",
		address: "Room 304",
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
		phone: "0372699635",
		address: "Room 304",
	},
]

const Shipper = () => {
	const [type, setType] = useState("all")

	function handleSelectType(s) {
		setType(s)
	}

	function handleAcceptOrder(orderId) {}

	return (
		<>
			<div className="page">
				<div className="flex bg-gray-100 p-2 rounded-2xl text-gray-400">
					<div
						className={`selection flex-1 text-center ${type === "all" ? "active" : ""}`}
						onClick={() => handleSelectType("all")}>
						All orders
					</div>
					<div
						className={`selection flex-1 text-center ${type === "your" ? "active" : ""}`}
						onClick={() => handleSelectType("your")}>
						Your orders
					</div>
				</div>
				<div className="mt-[3rem] flex flex-col gap-0">
					{orders.map((order) => (
						<div key={Math.random()} className="p-2 py-4 rounded-lg border-b">
							<div className="flex gap-6">
								<div className="flex flex-col justify-center gap-4">
									<img src={orderImg} alt="" className="w-12 h-12" />
									<button
										className="bg-green-100 text-green-500 rounded-full px-2 py-[2px]"
										onClick={() => handleAcceptOrder(order.id)}>
										Accept
									</button>
								</div>
								<div className="item-list">
									{order.items.map((item) => (
										<div className="" key={Math.random()}>
											{item.name} <span className="text-sm text-gray-500">x{item.quantity}</span>
										</div>
									))}
								</div>
								<div className="ml-4 text-gray-600">
									<div className="flex items-center gap-2">
										<FaLocationDot className="text-red-300" />
										{order.address}
									</div>
									<div className="flex items-center gap-2 mt-4">
										<BsFillTelephoneFill className="text-blue-300" />
										{order.phone}
									</div>
								</div>
							</div>
							<div className="mt-2 text-sm text-right text-gray-500">
								Total price:{" "}
								<span className="font-[500] text-base ml-2 text-black">{order.totalPrice}₫</span>
							</div>
						</div>
					))}
				</div>
			</div>
			<Navbar />
		</>
	)
}

export default Shipper
