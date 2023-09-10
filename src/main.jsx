import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import "./index.css"
import RootComponent from "./components/RootComponent"
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"

const router = createBrowserRouter([
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
])

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>,
)
