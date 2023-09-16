import "./Login.scss"
import circles from "../../assets/login-circles.svg"
import noodle from "../../assets/noodle.png"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"

const Login = () => {
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const navigate = useNavigate()

	function handleLogin() {
		console.log(username, password)
		navigate("/student")
	}

	return (
		<div>
			<div className="login px-6 py-8">
				<h1 className="mt-[5rem] font-[600]">Let's order some food</h1>
				<p className="mt-2 text-sm text-gray-500">Enter your username and password</p>

				<img src={noodle} className="" />
				<input
					type="text"
					placeholder="Enter username"
					className="block w-full  px-2 py-4"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
				<input
					type="text"
					placeholder="Password"
					className="block w-full mt-6 px-2 py-4"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>

				<button className="block mt-[4rem] w-full bg-black text-white rounded-lg p-2" onClick={handleLogin}>
					Login
				</button>
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
