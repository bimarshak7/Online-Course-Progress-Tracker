import Popup from "./Popup"

const ConfirmDiag = ({ setShow, yesFunc, title = "", params = null }) => {
	const setDisp = () => {
		setShow(prev => {
			return { ...prev, show: false }
		})
	}
	return (
		<Popup title={title} setShow={setDisp}>
			<div className="flex flex-col gap-4">
				<h2 className="text-xl"> Are you sure?</h2>
				<div className="flex gap-8">
					<button
						className="button bg-green-600"
						onClick={e => yesFunc(params)}
					>
						Yes
					</button>
					<button
						className="button bg-red-600"
						onClick={e =>
							setShow(prev => {
								return { ...prev, show: false }
							})
						}
					>
						No
					</button>
				</div>
			</div>
		</Popup>
	)
}

export default ConfirmDiag
