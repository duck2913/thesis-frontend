import RootComponent from "./components/RootComponent"
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"
import StudentHomePage from "./pages/student/StudentHomePage"
import { createBrowserRouter } from "react-router-dom"

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
		element: <StudentHomePage />,
	},
])
