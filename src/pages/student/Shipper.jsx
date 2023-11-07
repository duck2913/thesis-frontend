import React, { useEffect, useState } from "react"
import Navbar from "../../components/Navbar"
import orderImg from "../../assets/order.png"
import { FaLocationDot } from "react-icons/fa6"
import { BsFillTelephoneFill } from "react-icons/bs"

const VITE_APP_ORDER_SERVICE = import.meta.env.VITE_APP_ORDER_SERVICE

const Shipper = () => {
	const [type, setType] = useState("all")
	const [orders, setOrders] = useState([])

	useEffect(() => {
		fetch(`${VITE_APP_ORDER_SERVICE}/delivery`)
			.then((res) => res.json())
			.then((data) => {
				setOrders(data)
			})
			.catch((error) => console.error(error))
	}, [])
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
									{order.orderItems?.map((item) => (
										<div className="" key={Math.random()}>
											{item.dishName}{" "}
											<span className="text-sm text-gray-500">x{item.quantity}</span>
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

export default Shipper
