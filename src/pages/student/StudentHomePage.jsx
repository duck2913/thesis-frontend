import Navbar from "../../components/Navbar"
import { MdOutlineNotifications } from "react-icons/md"
import { AiOutlinePlus } from "react-icons/ai"
import cover from "../../assets/Cover.png"
import CartOverlay from "../../components/Cart/CartOverlay"
import { useCartStore } from "../../stores/cartStore"
import { shallow } from "zustand/shallow"
import { Link } from "react-router-dom"
import { useNotificationStore } from "../../stores/notificationStore.js"
import { useEffect, useState } from "react"

const IMG_SERVER = "http://localhost:8081/"

const StudentHomePage = () => {
	const [dishes, setDishes] = useState([])
	const foods = dishes.filter((dish) => dish.category == "FOOD")
	const drinks = dishes.filter((dish) => dish.category == "DRINK")

	useEffect(() => {
		getData()
	}, [])

	async function getData() {
		const res = await fetch("http://localhost:8081")
		const data = await res.json()
		console.log(data)
		setDishes(data)
	}

	const { addItemToCart, totalItems, totalPrice } = useCartStore(
		(state) => ({
			addItemToCart: state.addItemToCart,
			totalItems: state.totalItems,
			totalPrice: state.totalPrice,
		}),
		shallow,
	)

	const { notifications } = useNotificationStore(
		(store) => ({
			notifications: store.notificationList,
		}),
		shallow,
	)

	return (
		<>
			<div className="page pb-[12rem]">
				<div className="header flex justify-between">
					<div className="header--text">
						<p className="text-gray-500">Good morning</p>
						<p className="font-semibold">Minh Duc</p>
					</div>
					<Link
						to={"/student/notification"}
						className="border border-black rounded-full w-10 h-10 flex items-center justify-center text-black relative">
						<MdOutlineNotifications className="text-[1.5rem]" />
						{notifications.length > 0 && (
							<div
								className={
									"badge absolute top-[-0.5rem] right-[-0.5rem] w-[1rem] h-[1rem] flex items-center justify-center p-3 rounded-full text-white bg-red-400"
								}>
								{notifications.length}
							</div>
						)}
					</Link>
				</div>

				<img src={cover} alt="" className="rounded-lg mt-4 " />

				<h2 className="text-lg font-semibold mt-4 ">Main Dishes</h2>
				<div className="overflow-auto">
					<div className="flex w-max gap-6 mt-2">
						{foods.map((food) => (
							<div className="food relative" key={food.imgUrl}>
								<img
									src={`${IMG_SERVER}${food.imgUrl}`}
									alt=""
									className="w-[10rem] h-[12rem] object-cover rounded-lg"
								/>
								<div>{food.name}</div>
								<div className="font-semibold text-orange-500">{food.price},000₫</div>
								<button
									className="p-0 absolute bottom-[3.5rem] right-1 bg-green-600 w-8 h-8 rounded-full flex items-center justify-center text-green-100"
									onClick={() => addItemToCart(food)}>
									<AiOutlinePlus />
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
									src={`${IMG_SERVER}${drink.imgUrl}`}
									alt=""
									className="w-[10rem] h-[12rem] object-cover rounded-lg"
								/>
								<div>{drink.name}</div>
								<div className="font-semibold text-orange-500">{drink.price},000₫</div>
								<button
									className="p-0 absolute bottom-[3.5rem] right-1 bg-green-600 w-8 h-8 rounded-full flex items-center justify-center text-green-100"
									onClick={() => addItemToCart(drink)}>
									<AiOutlinePlus />
								</button>
							</div>
						))}
					</div>
				</div>
				{/* end of main page */}
			</div>
			{totalItems > 0 && <CartOverlay totalItems={totalItems} totalPrice={totalPrice} />}
			<Navbar />
		</>
	)
}

export default StudentHomePage
