import { create } from "zustand"

export const useNotificationStore = create((set) => ({
  notificationList: [{ message: 'Your order has been received', id: 1 }, {
    message: 'Your order is being delivered',
    id: 2,
  }],

  addNotification: (newNotification) =>
    set((state) => {
      console.log(newNotification)
      state.notificationList = [...state.notificationList, newNotification]
      return {}
    }),

  removeNotification: (id) =>
    set((state) => {
      state.notificationList = state.notificationList.filter(notification => notification.id !== id)
      return {}
    }),
}))