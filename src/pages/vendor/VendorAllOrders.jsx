import React, { useEffect, useState } from "react"
import { BiArrowBack } from "react-icons/bi"
import { useNavigate } from "react-router-dom"
import "./VendorOrders.scss"
import { MdDeliveryDining } from "react-icons/md"

const VITE_APP_MENU_SERVICE = import.meta.env.VITE_APP_MENU_SERVICE
const VITE_APP_ORDER_SERVICE = import.meta.env.VITE_APP_ORDER_SERVICE

const VendorAllOrders = () => {
	const navigate = useNavigate()
	const [orders, setOrders] = useState([])

	useEffect(() => {
		fetch(VITE_APP_ORDER_SERVICE)
			.then((res) => res.json())
			.then((data) => {
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
			<div className="mt-[3rem] flex flex-col w-[90%] gap-8 mx-auto">
				{orders.map((order) => (
					<div className="bg-[#fff9f7] p-4 rounded-lg shadow-sm">
						<div key={Math.random()} className="flex gap-8 ">
							<img
								src={`${VITE_APP_MENU_SERVICE}/${order.imageUrl}`}
								alt=""
								className="w-12 h-12 rounded-lg"
							/>
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
						{order.useDelivery && (
							<div className="flex gap-2 text-sm mt-2 text-orange-400 items-center">
								<MdDeliveryDining />
								This order use delivery service
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	)
}

export default VendorAllOrders
