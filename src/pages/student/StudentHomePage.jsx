import Navbar from "../../components/Navbar"
import { MdOutlineNotifications } from "react-icons/md"
import { AiOutlinePlus } from "react-icons/ai"
import cover from "../../assets/Cover.png"
import CartOverlay from "../../components/CartOverlay"
import { useBearStore } from "../../stores/cartStore"

const foods = [
	{
		imgUrl: "https://fullofplants.com/wp-content/uploads/2019/07/vegan-bun-bo-hue-vietnamese-vegetarian-spicy-soup-chay-thumb.jpg",
		price: "30",
		name: "bún bò huế",
	},
	{
		imgUrl: "https://www.recipetineats.com/wp-content/uploads/2019/04/Beef-Pho_6.jpg",
		price: "30",
		name: "phở",
	},
	{
		imgUrl: "https://www.authenticfoodquest.com/wp-content/uploads/2021/01/VietnameseBrokenRicePorkChopRecipe_ComTam_AuthenticFoodQuest.jpeg.webp",
		price: "25",
		name: "cơm tấm",
	},
]

const drinks = [
	{
		imgUrl: "https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2019/7/25/746291/Tra-Da.jpg",
		price: "5",
		name: "trà đá",
	},
	{
		imgUrl: "https://product.hstatic.net/1000126467/product/06323318_c821194305af4d9db5a96c059b3b477d_42a1e2318ff24e048560a4cfb2b35dd2_grande.jpg",
		price: "10",
		name: "nutri",
	},
]

const StudentHomePage = () => {
	const cart = useBearStore((state) => state.cart)
	const addItemToCart = useBearStore((state) => state.addItemToCart)
	const totalItems = useBearStore((state) => state.totalItems)
	const totalPrice = useBearStore((state) => state.totalPrice)

	return (
		<>
			<div className="page">
				<div className="header flex justify-between">
					<div className="header--text">
						<p className="text-gray-500">Good morning</p>
						<p className="font-semibold">Minh Duc</p>
					</div>
					<div className="border border-black rounded-full w-10 h-10 flex items-center justify-center">
						<MdOutlineNotifications className="text-[1.5rem]" />
					</div>
				</div>

				<img src={cover} alt="" className="rounded-lg mt-4 " />

				<h2 className="text-lg font-semibold mt-4 ">Main Dishes</h2>
				<div className="overflow-auto">
					<div className="flex w-max gap-8 mt-2">
						{foods.map((food) => (
							<div className="food relative" key={food.imgUrl}>
								<img src={food.imgUrl} alt="" className="w-[10rem] h-[12rem] object-cover rounded-lg" />
								<div>{food.name}</div>
								<div className="font-semibold text-orange-500">{food.price} 000₫</div>
								<button
									className="p-0 absolute bottom-[3.5rem] right-1 bg-green-600 w-8 h-8 rounded-full flex items-center justify-center"
									onClick={() => addItemToCart(food)}>
									<AiOutlinePlus />
								</button>
							</div>
						))}
					</div>
				</div>

				<h2 className="text-lg font-semibold mt-4 ">Drinks</h2>
				<div className="overflow-auto">
					<div className="flex w-max gap-8 mt-2">
						{drinks.map((drink) => (
							<div className="drink relative" key={drink.imgUrl}>
								<img
									src={drink.imgUrl}
									alt=""
									className="w-[10rem] h-[12rem] object-cover rounded-lg"
								/>
								<div>{drink.name}</div>
								<div className="font-semibold text-orange-500">{drink.price} 000₫</div>
								<button
									className="p-0 absolute bottom-[3.5rem] right-1 bg-green-600 w-8 h-8 rounded-full flex items-center justify-center"
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
