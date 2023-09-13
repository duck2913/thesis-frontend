import React from "react"

const CartOverlay = () => {
	return (
		<div className="overlay-container fixed bottom-[120px] px-[1.5rem] w-full">
			<div className="bg-orange-300 rounded-lg p-4 text-orange-800 flex gap-4">
				<p className="font-semibold">Basket</p>
				<p>• 3 items </p>
				<p className="ml-auto">
					<span className="font-bold text-orange-700">500000₫</span>
				</p>
			</div>
		</div>
	)
}

export default CartOverlay
