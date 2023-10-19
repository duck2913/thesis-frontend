import React, { useRef, useState } from "react"
import { BiArrowBack } from "react-icons/bi"
import { useNavigate } from "react-router-dom"

const AddNewDish = () => {
	const navigate = useNavigate()
	const nameRef = useRef(null)
	const priceRef = useRef(null)
	const categoryRef = useRef(null)
	const imageRef = useRef(null)
	const [selectedImg, setSelectedImg] = useState(null)

	async function handleAddNewDish() {
		const name = nameRef.current.value
		const price = priceRef.current.value
		const category = categoryRef.current.value

		if (!name || !price || !selectedImg) return

		const formData = new FormData()
		formData.append("name", name)
		formData.append("price", price)
		formData.append("category", category)
		formData.append("image", selectedImg)

		fetch("/upload", {
			method: "POST",
			body: formData,
		})
			.then((response) => response.json())
			.then((data) => {
				// Handle the response from the server
				console.log(data)
			})
			.catch((error) => {
				// Handle errors
				console.error(error)
			})
	}

	return (
		<div className="page">
			<div className="cart--header flex items-center justify-between">
				<BiArrowBack className="text-[1.5rem]" onClick={() => navigate(-1)} />
				<p className="text-[1.2rem]">Add new dish</p>
				<div className="w-[24px]">&nbsp;</div>
			</div>
			<div className="mt-12 px-4">
				<div>
					<label className="mb-1 text-gray-700 block font-semibold">Name</label>
					<input
						type="text"
						className="border border-gray-300 block w-full rounded-md focus:border-blue-400 focus:border p-2"
						placeholder="Ex: Bún bò"
						ref={nameRef}
					/>
				</div>
				<div className="mt-8">
					<label className="mb-1 text-gray-700 block font-semibold">Price</label>
					<input
						type="text"
						className="border border-gray-300 block w-full rounded-md focus:border-blue-400 focus:border p-2"
						placeholder="Ex: 30000"
						ref={priceRef}
					/>
				</div>
				<div className="mt-8">
					<label className="mb-1 text-gray-700 block font-semibold">Category</label>
					<select
						type=""
						className="border border-gray-300 block w-full rounded-md focus:border-blue-400 focus:border p-2"
						placeholder="Ex: Food"
						ref={categoryRef}>
						<option value="food">Food</option>
						<option value="drink">Drink</option>
					</select>
				</div>
				<div className="mt-8">
					<label htmlFor="file" className="mb-1 text-gray-700 block font-semibold">
						Image
					</label>
					<input
						type="file"
						className="hidden"
						id="file"
						ref={imageRef}
						onChange={(e) => {
							setSelectedImg(e.target?.files[0])
						}}
					/>
					<div
						className="w-full h-[6rem] bg-green-50 rounded-xl border-[2px] border-dashed border-green-400 flex items-center justify-center text-green-300 overflow-hidden"
						onClick={() => {
							imageRef.current.click()
						}}>
						{selectedImg ? selectedImg.name : "Upload the food's image"}
						{selectedImg && (
							<img src={URL.createObjectURL(selectedImg)} alt="" className="w-[3rem] h-[3rem] ml-2" />
						)}
					</div>
				</div>
			</div>
			<button className="w-full mt-12 bg-gradient p-2 py-4 rounded-md font-bold" onClick={handleAddNewDish}>
				Add new dish
			</button>
		</div>
	)
}

export default AddNewDish
