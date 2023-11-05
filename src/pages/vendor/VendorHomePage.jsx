import { BsCart4 } from "react-icons/bs"
import { FaRegRectangleList } from "react-icons/fa6"
import cover from "../../assets/Cover2.png"
import { Link } from "react-router-dom"
import { BsFillTrashFill } from "react-icons/bs"
import { useEffect, useState } from "react"

const VITE_APP_MENU_SERVICE = import.meta.env.VITE_APP_MENU_SERVICE
const VITE_APP_ORDER_SERVICE = import.meta.env.VITE_APP_ORDER_SERVICE
const IMG_SERVER = VITE_APP_MENU_SERVICE

const VendorHomePage = () => {
	const [dishes, setDishes] = useState([])
	const [numActiveOrders, setNumActiveOrders] = useState(0)

	const foods = dishes.filter((dish) => dish.category == "FOOD")
	const drinks = dishes.filter((dish) => dish.category == "DRINK")

	useEffect(() => {
		getAllDishes()
		getNumActiveOrders()
	}, [])

	function getNumActiveOrders() {
		fetch(`${VITE_APP_ORDER_SERVICE}/active`)
			.then((res) => res.json())
			.then((data) => {
				setNumActiveOrders(data.length)
			})
			.catch((error) => console.error(error))
	}

	async function getAllDishes() {
		const res = await fetch(`${VITE_APP_MENU_SERVICE}`)
		const data = await res.json()
		setDishes(data)
	}

	async function deleteDish(dishId) {
		const res = await fetch(`${VITE_APP_MENU_SERVICE}/delete/${dishId}`, {
			method: "DELETE",
		})
		if (!res.ok) return
		const data = await res.text()
		setDishes((curr) => curr.filter((dish) => dish.id !== dishId))
	}

	function removeItemFromMenu(item) {
		deleteDish(item.id)
	}

	return (
		<>
			<div className="page">
				<div className="header flex justify-between">
					<div className="header--text">
						<p className="text-gray-500">Good morning</p>
						<p className="font-semibold">Staff</p>
					</div>
					<div className="flex gap-4">
						<Link
							to={"/vendor/all-orders"}
							className="border border-black rounded-full w-10 h-10 flex items-center justify-center text-black relative">
							<FaRegRectangleList className="text-[1.5rem]" />
						</Link>
						<Link
							to={"/vendor/active-orders"}
							className="border border-black rounded-full w-10 h-10 flex items-center justify-center text-black relative">
							<BsCart4 className="text-[1.5rem]" />
							{numActiveOrders > 0 && (
								<div
									className={
										"badge absolute top-[-0.5rem] right-[-0.5rem] w-[1rem] h-[1rem] flex items-center justify-center p-3 rounded-full text-white bg-red-400"
									}>
									{numActiveOrders}
								</div>
							)}
						</Link>
					</div>
				</div>
				<img src={cover} alt="" className="rounded-lg mt-4 " />

				<Link to={"/vendor/new-dish"}>
					<button className="w-full mt-6 bg-gradient p-2 rounded-md font-bold">Add new dish</button>
				</Link>

				<h2 className="text-lg font-semibold mt-4 ">Main Dishes</h2>
				<div className="overflow-auto">
					<div className="flex w-max gap-6 mt-2">
						{foods.map((food) => (
							<div className="food relative" key={food.imgUrl}>
								<img
									src={`${VITE_APP_MENU_SERVICE}/${food.imgUrl}`}
									alt=""
									className="w-[10rem] h-[12rem] object-cover rounded-lg"
								/>
								<div>{food.name}</div>
								<div className="font-semibold text-orange-500">{food.price},000₫</div>
								<button
									className="p-0 absolute bottom-[3.5rem] right-1 bg-green-600 w-8 h-8 rounded-full flex items-center justify-center text-green-100"
									onClick={() => removeItemFromMenu(food)}>
									<BsFillTrashFill />
								</button>
							</div>
						))}
					</div>
				</div>

				<h2 className="text-lg font-semibold mt-4 ">Drinks</h2>
				<div className="overflow-auto">
					<div className="flex w-max gap-6 mt-2">
						{drinks.map((drink) => (
							<div className="drink relative" key={drink.imgUrl}>
								<img
									src={`${VITE_APP_MENU_SERVICE}/${drink.imgUrl}`}
									alt=""
									className="w-[10rem] h-[12rem] object-cover rounded-lg"
								/>
								<div>{drink.name}</div>
								<div className="font-semibold text-orange-500">{drink.price},000₫</div>
								<button
									className="p-0 absolute bottom-[3.5rem] right-1 bg-green-600 w-8 h-8 rounded-full flex items-center justify-center text-green-100"
									onClick={() => removeItemFromMenu(drink)}>
									<BsFillTrashFill />
								</button>
							</div>
						))}
					</div>
				</div>
				{/* end of main page */}
			</div>
		</>
	)
}

export default VendorHomePage
