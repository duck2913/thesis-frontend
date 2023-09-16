import React from "react"
import { FiHome } from "react-icons/fi"
import { MdDeliveryDining } from "react-icons/md"
import { BsCart4 } from "react-icons/bs"
import "../index.scss"

const Navbar = () => {
	return (
		<div className="fixed bottom-0 left-0 bg-black text-white w-full py-6 px-6 rounded-t-[1rem] flex items-center justify-between">
			<div className="nav--item flex flex-col justify-center items-center">
				<FiHome className="text-[1.2rem]" />
				<p>Home</p>
			</div>
			<div className="nav--item flex flex-col justify-center items-center">
				<MdDeliveryDining className="text-[1.2rem] font-bold" />
				<p>Shipper</p>
			</div>
			<div className="nav--item flex flex-col justify-center items-center">
				<BsCart4 className="text-[1.2rem]" />
				<p>My orders</p>
			</div>
		</div>
	)
}

export default Navbar
