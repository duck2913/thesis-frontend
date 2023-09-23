import React from "react"
import Navbar from "../../components/Navbar"
import orderImg from "../../assets/order.png"

import "./MyOrder.scss"

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
		status: "processing",
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
	},
]

const MyOrder = () => {
	return (
		<>
			<div className="page">
				<h2 className="text-center text-lg">Your orders</h2>
				<div className="mt-[3rem] flex flex-col gap-12">
					{orders.map((order) => (
						<div key={Math.random()} className="flex gap-8 ">
							<img src={orderImg} alt="" className="w-12 h-12" />

							<div className="item-list">
								{order.items.map((item) => (
									<div className="" key={Math.random()}>
										{item.name} <span className="text-sm text-gray-500">x{item.quantity}</span>
									</div>
								))}
							</div>

							<div className="w-[100px] text-center ml-auto">
								<p className="text-xs mb-1">Status</p>
								<p className={`order-status rounded-md inline-block px-2 ${order.status}`}>
									{order.status}
								</p>
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