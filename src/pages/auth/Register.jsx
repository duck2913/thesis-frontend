import React, { useState } from "react"
import chicken from "../../assets/chicken.png"
import circles from "../../assets/register-circles.svg"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const VITE_APP_AUTH_SERVICE = import.meta.env.VITE_APP_AUTH_SERVICE

const Register = () => {
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [address, setAddress] = useState("")
	const [phone, setPhone] = useState("")
	const navigate = useNavigate()

	async function handleRegister(e) {
		e.preventDefault()

		const res = await fetch(`${VITE_APP_AUTH_SERVICE}/register`, {
			method: "POST",
			body: JSON.stringify({ username, password, address, phoneNumber: phone }),
			headers: {
				"Content-type": "application/json; charset=UTF-8",
			},
		})
		if (!res.ok) {
			console.error("Error when register, maybe username already exists")
		} else {
			navigate("/login")
		}
	}

	return (
		<div>
			<div className="login px-6 py-8">
				<h1 className="mt-[2rem] font-[600]">Create new account</h1>
				<p className="mt-2 text-sm text-gray-500">Enter your username and password</p>

				<img src={chicken} className="scale-75 -mb-8" />
				<form onSubmit={(e) => handleRegister(e)}>
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
					<input
						type="text"
						placeholder="Your room number"
						className="block w-full mt-6 px-2 py-4"
						value={address}
						onChange={(e) => setAddress(e.target.value)}
					/>
					<input
						type="text"
						placeholder="Your phone number"
						className="block w-full mt-6 px-2 py-4"
						value={phone}
						onChange={(e) => setPhone(e.target.value)}
					/>
					<button className="block mt-[4rem] w-full bg-black text-white rounded-lg p-2">Register</button>
				</form>
				<p className="text-sm text-gray-400 mt-6 text-center">
					Already have an account?{" "}
					<Link to={"/login"}>
						<span className="font-[500] text-orange-400">Login</span>
					</Link>
				</p>
			</div>
			<img src={circles} alt="" className="fixed bottom-[-7rem] left-[0] z-[-1]" />
		</div>
	)
}

export default Register
