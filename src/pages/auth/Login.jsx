import "./Login.scss"
import circles from "../../assets/login-circles.svg"
import noodle from "../../assets/noodle.png"
import { Link, useNavigate } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useState } from "react"
import jwt_decode from "jwt-decode"

const SECRET_KEY = "c2bce70976fbc8cd488d84a89eba1de4b8e4255b8de7aed4485517f379de8f66"
const VITE_APP_AUTH_SERVICE = import.meta.env.VITE_APP_AUTH_SERVICE

const Login = () => {
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const navigate = useNavigate()

	async function handleLogin(e) {
		e.preventDefault()

		const res = await fetch(`${VITE_APP_AUTH_SERVICE}/login`, {
			method: "POST",
			body: JSON.stringify({ username, password }),
			headers: {
				"Content-type": "application/json; charset=UTF-8",
			},
		})

		if (!res.ok) {
			toast("🦄 Wrong username or password")
			return
		}

		const { token } = await res.json()
		if (!token) {
			console.error("Token is invalid")
			return
		}
		const { user } = jwt_decode(token)
		if (user.role === "USER") {
			navigate("/student")
		} else {
			navigate("/vendor")
		}
		localStorage.setItem("user_info", JSON.stringify(user))
	}

	return (
		<div>
			<ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="dark"
			/>
			<div className="login px-6 py-8">
				<h1 className="mt-[2rem] font-[600]">Let's order some food</h1>
				<p className="mt-2 text-sm text-gray-500">Enter your username and password</p>

				<img src={noodle} className="" />
				<form onSubmit={(e) => handleLogin(e)}>
					<input
						type="text"
						placeholder="Enter username"
						className="block w-full  px-2 py-4"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
					<input
						type="password"
						placeholder="Password"
						className="block w-full mt-6 px-2 py-4"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<button className="block mt-[4rem] w-full bg-black text-white rounded-lg p-2">Login</button>
				</form>
				<p className="text-sm text-gray-400 mt-6 text-center">
					Don't have an account yet?{" "}
					<Link to={"/register"}>
						<span className="font-[500] text-orange-400">Create an account</span>
					</Link>
				</p>
			</div>
			<img src={circles} alt="" className="fixed bottom-[-4rem] left-0 z-[-1]" />
		</div>
	)
}

export default Login
