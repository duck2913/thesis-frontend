export function getNextOrderStatus(currentStatus, useDelivery) {
	switch (currentStatus) {
		case "NEW":
			return "COOKING"
		case "COOKING":
			if (useDelivery) return "DELIVERY"
			return "DONE"
		case "DELIVERY":
			return "DONE"
	}
}
