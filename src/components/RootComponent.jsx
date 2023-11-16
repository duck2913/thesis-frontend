import { useEffect } from "react"
import { MutatingDots } from "react-loader-spinner"
import { useNavigate } from "react-router-dom"
import { over } from "stompjs"
import SockJS from "sockjs-client/dist/sockjs"
import { v4 as uuidv4 } from "uuid"
import { useNotificationStore } from "../stores/notificationStore"
import { shallow } from "zustand/shallow"
const userId = JSON.parse(localStorage.getItem("user_info"))?.id

const RootComponent = () => {
	const navigate = useNavigate()
	const { addNotification } = useNotificationStore(
		(store) => ({
			addNotification: store.addNotification,
		}),
		shallow,
	)

	useEffect(() => {
		let Sock = new SockJS("http://localhost:8084/ws")
		let stompClient = over(Sock)
		stompClient.connect(
			{},
			(data) => {
				stompClient.subscribe(`/topics/notifications/${userId}`, (data) => {
					const newNotification = data.body
					addNotification({ message: newNotification, id: uuidv4() })
				})
			},
			(err) => {
				console.log(err)
			},
		)

		setTimeout(() => {
			navigate("/login")
		}, 3000)
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
