const FormText = ({
	type,
	name,
	value,
	handleChange,
	labelText,
	placeholder = "",
}) => {
	return (
		<div className="mb-3">
			<label
				htmlFor={name}
				className="float-left capitalize tracking-wide"
			>
				{labelText || name}
			</label>

			<input
				type={type}
				value={value}
				name={name}
				placeholder={placeholder}
				onChange={handleChange}
				className="form-input w-full py-1 px-2 rounded-md bg-[#1a2025] outline-none"
			/>
		</div>
	)
}

export { FormText }
