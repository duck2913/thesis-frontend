import React, { useState } from "react"
import chicken from "../../assets/chicken.png"
import circles from "../../assets/register-circles.svg"
import { Link, useNavigate } from "react-router-dom"

const Register = () => {
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const navigate = useNavigate()

	async function handleRegister(e) {
		e.preventDefault()

		const res = await fetch("http://localhost:8080/api/v1/auth/register", {
			method: "POST",
			body: JSON.stringify({ username, password }),
			headers: {
				"Content-type": "application/json; charset=UTF-8",
			},
		})
		if (res.ok) {
			navigate("/login")
		} else {
			console.error("Error when register")
		}
	}

	return (
		<div>
			<div className="login px-6 py-8">
				<h1 className="mt-[2rem] font-[600]">Create new account</h1>
				<p className="mt-2 text-sm text-gray-500">Enter your username and password</p>

				<img src={chicken} className="" />
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
