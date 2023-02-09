import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import Chart from "chart.js/auto"
import { Pie, Bar } from "react-chartjs-2"

import { getreport } from "../redux/actions/course"

const Report = () => {
	const report = useSelector(state => state.course.report)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getreport(0))
	}, [])

	const colorGen = len => {
		let a = []
		for (let i = 0; i < len; i++) {
			a.push(
				`rgb(${Math.random() * (255 - 0)},${
					Math.random() * (255 - 0)
				},${Math.random() * (255 - 0)})`
			)
		}
		console.log(a)
		return a
	}

	const data1 = {
		labels: report?.courseCat.map(a => a.category),
		datasets: [
			{
				backgroundColor: colorGen(report?.courseCat.length),
				data: report?.courseCat.map(a => a.count),
			},
		],
	}
	const data2 = {
		labels: report?.chapterWeek.map(a => a.date),
		datasets: [
			{
				backgroundColor: colorGen(report?.chapterWeek.length),
				data: report?.chapterWeek.map(a => a.count),
			},
		],
	}

	const options = {
		plugins: {
			legend: {
				display: false,
			},
		},
	}
	return (
		<div className="flex flex-col gap-8">
			<div className="flex flex-col">
				<h1 className="text-xl font-head">
					Most recently completed course
				</h1>
				{report?.mostRecent.length > 0 ? (
					<div class="flex flex-col">
						<div class="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
							<div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
								<div class="overflow-hidden">
									<table class="min-w-full">
										<thead class="font-body border-b bg-slate-800">
											<tr>
												<th
													scope="col"
													class="text-sm px-6 py-4 text-left"
												>
													#
												</th>
												<th
													scope="col"
													class="px-6 py-4 text-left"
												>
													Course Name
												</th>
												<th
													scope="col"
													class="px-6 py-4 text-left"
												>
													Completed On
												</th>
											</tr>
										</thead>
										<tbody>
											{report?.mostRecent.map(
												(course, idx) => {
													return (
														<tr class="font-body bg-gray-800 border-b transition duration-300 ease-in-out hover:bg-green-900">
															<td class="px-6 py-4">
																{idx + 1}
															</td>
															<td class=" px-6 py-4">
																{course.name}
															</td>
															<td class=" px-6 py-4">
																{course.date}
															</td>
														</tr>
													)
												}
											)}
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				) : (
					<span className="font-body indent-4 font-bold">
						Oops! You haven't completed any course yet.
					</span>
				)}
			</div>
			<div className="flex gap-16">
				<div className="flex flex-col gap-6">
					<h1 className="text-xl font-semibold font-head">
						Course enrolled by category
					</h1>
					{report?.courseCat.length > 0 ? (
						<div className="h-80 w-80 mx-auto">
							<Pie data={data1} />
						</div>
					) : (
						<span className="font-body font-bold indent-4">
							Oops! You haven't added any course.
						</span>
					)}
				</div>
				<div className="flex flex-col gap-6">
					<h1 className="text-xl font-semibold font-head">
						Chapter completed in last seven days
					</h1>
					{report?.chapterWeek.length > 0 ? (
						<div className="h-80 w-80">
							<Bar data={data2} options={options} />
						</div>
					) : (
						<span className="font-body font-bold indent-4">
							Oops! You haven't completed any chapters in the last
							7 days.
						</span>
					)}
				</div>
			</div>
		</div>
	)
}

export default Report
