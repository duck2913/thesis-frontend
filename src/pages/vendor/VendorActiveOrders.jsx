import React, { useState, useEffect } from "react"
import { BiArrowBack } from "react-icons/bi"
import { FaTrashAlt } from "react-icons/fa"
import { MdDeliveryDining } from "react-icons/md"
import { useNavigate } from "react-router-dom"
import { getNextOrderStatus } from "../util"
import "./VendorOrders.scss"

const VITE_APP_MENU_SERVICE = import.meta.env.VITE_APP_MENU_SERVICE
const VITE_APP_ORDER_SERVICE = import.meta.env.VITE_APP_ORDER_SERVICE
const IMG_SERVER = VITE_APP_MENU_SERVICE

const VendorActiveOrders = () => {
	const navigate = useNavigate()
	const [type, setType] = useState("new")
	const [activeOrders, setActiveOrders] = useState([])
	const unprocessedOrders = activeOrders.filter((order) => order.status === "NEW")
	const processingOrders = activeOrders.filter((order) => order.status !== "NEW")

	useEffect(() => {
		fetch(`${VITE_APP_ORDER_SERVICE}/active`)
			.then((res) => res.json())
			.then((data) => {
				setActiveOrders(data)
			})
			.catch((error) => console.error(error))
	}, [])

	function handleSelectType(s) {
		setType(s)
	}

	async function handleProcessOrder(orderId) {
		const selectedOrder = activeOrders.find((order) => order.id === orderId)
		if (selectedOrder.status === "DONE") {
			setActiveOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId))
			return
		}
		selectedOrder.status = getNextOrderStatus(selectedOrder.status, selectedOrder.useDelivery)
		await updateOrderStatus(orderId)
		setActiveOrders([...activeOrders])
	}

	async function updateOrderStatus(orderId) {
		const res = await fetch(`${VITE_APP_ORDER_SERVICE}/${orderId}`, {
			method: "PUT",
		})
	}

	return (
		<div className="page">
			<div className={"flex gap-8"}>
				<BiArrowBack className="text-[1.5rem]" onClick={() => navigate(-1)} />
				<h2>Active orders</h2>
			</div>
			<div className={"mt-[2rem]"} />
			<div className="flex bg-gray-100 p-2 rounded-2xl text-gray-400">
				<div
					className={`selection flex-1 text-center ${type === "new" ? "active" : ""}`}
					onClick={() => handleSelectType("new")}>
					New
				</div>
				<div
					className={`selection flex-1 text-center ${type === "ongoing" ? "active" : ""}`}
					onClick={() => handleSelectType("ongoing")}>
					On going
				</div>
			</div>
			<div className="mt-[3rem] flex flex-col gap-8 mx-auto">
				{type === "new" &&
					unprocessedOrders.map((order) => (
						<div className="bg-[#fff4f0] p-4 rounded-lg">
							<div key={Math.random()} className="flex gap-8 justify-between ">
								<img src={`${IMG_SERVER}/${order.imageUrl}`} alt="" className="w-12 h-12 rounded-lg" />
								<div className="item-list">
									{order.orderItems?.map((item) => (
										<div className="" key={Math.random()}>
											{item.dishName}{" "}
											<span className="text-sm text-gray-500">x{item.quantity}</span>
										</div>
									))}
								</div>
								<div className="text-center">
									<p
										className={`order-status rounded-md inline-block px-2 ${order.status.toLowerCase()} active:scale-90 transition-all`}
										onClick={() => handleProcessOrder(order.id)}>
										process
									</p>
								</div>
							</div>
							{order.useDelivery && (
								<div className="flex gap-2 text-sm mt-2 text-orange-400 items-center">
									<MdDeliveryDining />
									This order use delivery service
								</div>
							)}
							<div className="mt-2 text-orange-500 text-right">
								ID: <span className="font-semibold">{order.id.slice(0, 6)}</span>
							</div>
						</div>
					))}
				{type === "ongoing" &&
					processingOrders?.map((order) => (
						<div className="p-4 rounded-lg bg-[#f7f7ff] w-full">
							<div key={Math.random()} className="flex gap-8 justify-between ">
								<img src={`${IMG_SERVER}/${order.imageUrl}`} alt="" className="w-12 h-12 rounded-lg" />
								<div className="item-list">
									{order.orderItems?.map((item) => (
										<div className="" key={Math.random()}>
											{item.dishName}{" "}
											<span className="text-sm text-gray-500">x{item.quantity}</span>
										</div>
									))}
								</div>
								<div className="flex gap-2 items-center">
									<div className="text-center flex flex-col gap-4 w-[80px]">
										<p
											className={`order-status rounded-md inline-block px-2 ${order.status.toLowerCase()}`}>
											{order.status.toLowerCase()}
										</p>
										{order.status !== "DONE" ? (
											<p
												className={`rounded-md inline-block px-2 active:scale-90 transition-all bg-gradient-to-r from-blue-400 to-blue-600 text-white font-[500]`}
												onClick={() => handleProcessOrder(order.id)}>
												NEXT
											</p>
										) : (
											<FaTrashAlt
												className="mx-auto inline-block text-blue-500 font-semibold"
												onClick={() => handleProcessOrder(order.id)}
											/>
										)}
									</div>
								</div>
							</div>
							{order.useDelivery && (
								<div className="flex gap-2 text-sm mt-2 text-blue-400 items-center">
									<MdDeliveryDining />
									This order use delivery service
								</div>
							)}
							<div className="mt-2 text-blue-500 flex justify-between">
								<div>ID: {order.id.slice(0, 6)}</div>
								<div className="text-right  font-[600]">Total price: {order.totalPrice},000d</div>
							</div>
						</div>
					))}
			</div>
		</div>
	)
}

export default VendorActiveOrders
