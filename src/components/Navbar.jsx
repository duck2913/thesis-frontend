import React from "react"
import { FiHome } from "react-icons/fi"
import { MdDeliveryDining } from "react-icons/md"
import { BsCart4 } from "react-icons/bs"
import "../index.scss"
import { Link } from "react-router-dom"

const Navbar = () => {
	return (
		<div className="fixed bottom-0 left-0 bg-black text-white w-full py-6 px-6 rounded-t-[1rem] flex items-center justify-between">
			<Link to={"/student"} className="nav--item flex flex-col justify-center items-center text-white">
				<FiHome className="text-[1.2rem]" />
				<p>Home</p>
			</Link>
			<Link to={"/student/shipper"} className="nav--item flex flex-col justify-center items-center text-white">
				<MdDeliveryDining className="text-[1.2rem] font-bold" />
				<p>Shipper</p>
			</Link>
			<Link to={"/student/orders"} className="nav--item flex flex-col justify-center items-center text-white">
				<BsCart4 className="text-[1.2rem]" />
				<p>My orders</p>
			</Link>
		</div>
	)
}

export default Navbar
