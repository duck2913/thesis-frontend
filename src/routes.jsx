import RootComponent from "./components/RootComponent"
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"
import Cart from "./pages/student/Cart"
import MyOrder from "./pages/student/MyOrder"
import Shipper from "./pages/student/Shipper"
import StudentHomePage from "./pages/student/StudentHomePage"
import { createBrowserRouter } from "react-router-dom"
import Notification from "./pages/student/Notification.jsx"
import VendorHomePage from "./pages/vendor/VendorHomePage.jsx"
import VendorActiveOrders from "./pages/vendor/VendorActiveOrders.jsx"
import AddNewDish from "./pages/vendor/AddNewDish"
import VendorAllOrders from "./pages/vendor/VendorAllOrders.jsx"

export const router = createBrowserRouter([
	{
		path: "/",
		element: <RootComponent />,
	},
	{
		path: "login",
		element: <Login />,
	},
	{
		path: "register",
		element: <Register />,
	},
	{
		path: "student",
		children: [
			{
				path: "",
				element: <StudentHomePage />,
			},
			{
				path: "cart",
				element: <Cart />,
			},
			{
				path: "orders",
				element: <MyOrder />,
			},
			{
				path: "shipper",
				element: <Shipper />,
			},
			{
				path: "notification",
				element: <Notification />,
			},
		],
	},
	{
		path: "vendor",
		children: [
			{
				path: "",
				element: <VendorHomePage />,
			},
			{
				path: "active-orders",
				element: <VendorActiveOrders />,
			},
			{
				path: "all-orders",
				element: <VendorAllOrders />,
			},
			{
				path: "new-dish",
				element: <AddNewDish />,
			},
		],
	},
])
