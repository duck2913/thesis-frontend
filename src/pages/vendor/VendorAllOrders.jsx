import React, { useEffect, useState } from "react"
import { BiArrowBack } from "react-icons/bi"
import { useNavigate } from "react-router-dom"
import "./VendorOrders.scss"

const IMG_SERVER = "http://localhost:8081/"

const VendorAllOrders = () => {
	const navigate = useNavigate()
	const [orders, setOrders] = useState([])

	useEffect(() => {
		fetch("http://localhost:8082")
			.then((res) => res.json())
			.then((data) => {
				console.log(data)
				setOrders(data)
			})
			.catch((error) => console.error(error))
	}, [])

	return (
		<div className="page">
			<div className={"flex gap-8"}>
				<BiArrowBack className="text-[1.5rem]" onClick={() => navigate(-1)} />
				<h2>All orders</h2>
			</div>
			<div className={"mt-[2rem]"} />
			<div className="mt-[3rem] flex flex-col w-[90%] gap-4 mx-auto">
				{orders.map((order) => (
					<div key={Math.random()} className="flex gap-8 bg-[#fff9f7] p-4 rounded-lg">
						<img src={`${IMG_SERVER}${order.imageUrl}`} alt="" className="w-12 h-12 rounded-lg" />
						<div className="item-list">
							{order?.orderItems?.map((item) => (
								<div className="" key={Math.random()}>
									{item.dishName} <span className="text-sm text-gray-500">x{item.quantity}</span>
								</div>
							))}
						</div>
						<div className="text-center ml-auto">
							<p
								className={`order-status rounded-md inline-block px-2 ${order.status.toLowerCase()} active:scale-90 transition-all`}>
								{order.status}
							</p>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default VendorAllOrders
