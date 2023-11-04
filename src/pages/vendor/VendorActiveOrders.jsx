import React, { useState, useEffect } from "react"
import { BiArrowBack } from "react-icons/bi"
import { useNavigate } from "react-router-dom"
import "./VendorOrders.scss"

const IMG_SERVER = "http://localhost:8081/"

const initialOrders = [
	{
		id: 1,
		items: [
			{
				name: "bún bò",
				quantity: 1,
			},
		],
		status: "new",
	},
	{
		id: 2,
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
	},
	{
		id: 3,
		items: [
			{
				name: "pho",
				quantity: 1,
			},
		],
		status: "new",
	},
	{
		id: 4,
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
		status: "new",
	},
]

const VendorActiveOrders = () => {
	const navigate = useNavigate()
	const [type, setType] = useState("unprocessed")
	const [unprocessedOrders, setUnprocessedOrders] = useState(initialOrders)
	const [processedOrders, setProcessedOrders] = useState([])

	useEffect(() => {
		fetch("http://localhost:8082/active")
			.then((res) => res.json())
			.then((data) => {
				console.log(data)
				setUnprocessedOrders(data)
			})
			.catch((error) => console.error(error))
	}, [])

	function handleSelectType(s) {
		setType(s)
	}

	function handleProcessOrder(id) {
		if (type === "unprocessed") {
			const selectedOrder = unprocessedOrders.find((order) => order.id === id)
			selectedOrder.status = "cooking"
			setProcessedOrders((curr) => [...curr, selectedOrder])

			const updatedList = unprocessedOrders.filter((order) => order.id !== id)
			setUnprocessedOrders(updatedList)
			return
		}

		let updatedList = [...processedOrders]
		const selectedOrder = updatedList.find((order) => order.id === id)

		switch (selectedOrder.status) {
			case "cooking":
				selectedOrder.status = "done"
				break

			default:
				updatedList = updatedList.filter((order) => order.id !== selectedOrder.id)
				break
		}
		setProcessedOrders(updatedList)
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
					className={`selection flex-1 text-center ${type === "unprocessed" ? "active" : ""}`}
					onClick={() => handleSelectType("unprocessed")}>
					Unprocessed
				</div>
				<div
					className={`selection flex-1 text-center ${type === "processed" ? "active" : ""}`}
					onClick={() => handleSelectType("processed")}>
					Cooking
				</div>
			</div>
			<div className="mt-[3rem] flex flex-col w-[90%] gap-4 mx-auto">
				{type === "unprocessed" &&
					unprocessedOrders.map((order) => (
						<div key={Math.random()} className="flex gap-8 justify-between bg-[#fff9f7] p-4 rounded-lg">
							<img src={`${IMG_SERVER}${order.imageUrl}`} alt="" className="w-12 h-12 rounded-lg" />
							<div className="item-list">
								{order.orderItems?.map((item) => (
									<div className="" key={Math.random()}>
										{item.dishName} <span className="text-sm text-gray-500">x{item.quantity}</span>
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
					))}
				{type === "processed" &&
					processedOrders.map((order) => (
						<div key={Math.random()} className="flex gap-8 justify-between p-4 rounded-lg bg-[#f7f7ff] ">
							<img src={`${IMG_SERVER}${order.imageUrl}`} alt="" className="w-12 h-12 rounded-lg" />
							<div className="item-list">
								{order.orderItems?.map((item) => (
									<div className="" key={Math.random()}>
										{item.dishName} <span className="text-sm text-gray-500">x{item.quantity}</span>
									</div>
								))}
							</div>
							<div className="text-center">
								<p
									className={`order-status rounded-md inline-block px-2 ${order.status} active:scale-90 transition-all`}
									onClick={() => handleProcessOrder(order.id)}>
									{order.status === "cooking" ? "cooking" : "done"}
								</p>
							</div>
						</div>
					))}
			</div>
		</div>
	)
}

export default VendorActiveOrders
