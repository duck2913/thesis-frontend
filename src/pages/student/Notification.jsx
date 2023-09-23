import React from "react"
import { BiArrowBack } from "react-icons/bi"
import { BsFillTrash3Fill } from "react-icons/bs"
import { useNavigate } from "react-router-dom"
import { useNotificationStore } from "../../stores/notificationStore.js"
import { shallow } from "zustand/shallow"

const Notification = () => {
	const navigate = useNavigate()
	const { notifications, removeNotification } = useNotificationStore(
		(store) => ({
			addNotification: store.addNotification,
			notifications: store.notificationList,
			removeNotification: store.removeNotification,
		}),
		shallow,
	)

	return (
		<div className={"page"}>
			<div className={"flex gap-8"}>
				<BiArrowBack className="text-[1.5rem]" onClick={() => navigate(-1)} />
				<h2>Notification</h2>
			</div>
			<div className={"mt-[2rem]"}>
				{notifications?.map((notification) => (
					<div
						key={Math.random()}
						className={
							"mt-4 bg-green-100 p-4 px-6 rounded-lg bg-opacity-70 text-green-600 flex justify-between items-center"
						}>
						{notification.message}

						<div
							onClick={() => {
								removeNotification(notification.id)
							}}>
							<BsFillTrash3Fill />
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default Notification
