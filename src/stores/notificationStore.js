import { create } from "zustand"

export const useNotificationStore = create((set) => ({
	numActiveOrders: 0,
	notificationList: [],

	setNumActiveOrders: (n) =>
		set(() => ({
			numActiveOrders: n,
		})),

	addNotification: (newNotification) =>
		set((state) => {
			console.log(newNotification)
			state.notificationList = [...state.notificationList, newNotification]
			return {}
		}),

	removeNotification: (id) =>
		set((state) => {
			state.notificationList = state.notificationList.filter((notification) => notification.id !== id)
			return {}
		}),
}))
