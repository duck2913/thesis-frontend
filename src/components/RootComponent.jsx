import { Outlet } from "react-router-dom"

const RootComponent = () => {
	return (
		<div className="px-6 py-8 min-h-screen">
			<Outlet />
		</div>
	)
}

export default RootComponent
