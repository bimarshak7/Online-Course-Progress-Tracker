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
		<div className="flex flex-col gap-16">
			<div className="flex flex-col">
				<h1 className="text-xl font-bold">
					Most recently active course
				</h1>
				{report?.mostRecent.map(course => {
					return (
						<li className="ml-8 py-1 text-lg list-decimal">
							{course.name}
						</li>
					)
				})}
			</div>
			<div className="flex gap-16">
				<div className="flex flex-col gap-6">
					<h1 className="text-xl">Course enrolled by category</h1>
					<div className="h-80 w-80 mx-auto">
						<Pie data={data1} />
					</div>
				</div>
				<div className="flex flex-col gap-6">
					<h1 className="text-xl">
						Chapter completed in last seven days
					</h1>
					<div className="h-80 w-80">
						<Bar data={data2} options={options} />
					</div>
				</div>
			</div>
		</div>
	)
}

export default Report
