import { useEffect } from "react"
import { MutatingDots } from "react-loader-spinner"
import { useNavigate } from "react-router-dom"

const RootComponent = () => {
	const navigate = useNavigate()

	useEffect((effect) => {
		setTimeout(() => {
			navigate("/login")
		}, 2000)
	}, [])

	return (
		<div className="min-h-screen flex flex-col justify-center items-center">
			<MutatingDots
				height="100"
				width="100"
				color="#f78a36"
				secondaryColor="#ffbd66"
				radius="13.5"
				ariaLabel="mutating-dots-loading"
				wrapperStyle={{}}
				wrapperClass=""
				visible={true}
			/>
			<p className="text-gray-500 text-lg">Please wait a second...</p>
		</div>
	)
}

export default RootComponent
