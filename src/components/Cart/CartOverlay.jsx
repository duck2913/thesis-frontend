import React from "react"
import { Link } from "react-router-dom"

const CartOverlay = ({ totalItems, totalPrice }) => {
	return (
		<Link className="overlay-container fixed bottom-[120px] px-[1.5rem] w-full" to={"cart"}>
			<div className="bg-orange-300 rounded-lg p-4 text-orange-700 flex gap-4">
				<p className="font-semibold">Basket</p>
				<p>• {totalItems} items </p>
				<p className="ml-auto">
					<span className="font-bold text-[#cd6a1f]">{totalPrice},000₫</span>
				</p>
			</div>
		</Link>
	)
}

export default CartOverlay
