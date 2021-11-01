import { Table, message, Popconfirm } from "antd";
import React from "react";
import { Link } from "react-router-dom";
class Timesheets extends React.Component {
	columns = [
		{
			title: "Start time",
			dataIndex: "start_time",
			key: "start_time",
		},
		{
			title: "End Time",
			dataIndex: "end_time",
			key: "end_time",
		},
		{
			title: "Hours worked",
			dataIndex: "hours_worked",
			key: "hours_worked",
		},
		{
			title: "",
			key: "action",
			render: (_text, record) => (
				<Link to={`/timesheets/${record.id}`}>Show</Link>
			),
		},
		{
			title: "",
			key: "action",
			render: (_text, record) => (
				<Popconfirm
					title="Are you sure delete this timesheet?"
					onConfirm={() => this.deleteTimesheet(record.id)}
					okText="Yes"
					cancelText="No"
				>
					<a href="#" type="danger">
						Delete{" "}
					</a>
				</Popconfirm>
			),
		}
	];

	state = {
		timesheets: [],
	};

	componentDidMount() {
		this.loadTimesheets();
	}

	loadTimesheets = () => {
		const url = "/api/v1/timesheets.json";
		fetch(url)
			.then((data) => {
				if (data.ok) {
					return data.json();
				}
				throw new Error("Network error.");
			})
			.then((data) => {
				data.timesheets.forEach((timesheet) => {
					const newEl = {
						key: timesheet.id,
						id: timesheet.id,
						start_time: timesheet.start_time,
						end_time: timesheet.end_time,
						hours_worked: timesheet.hours_worked,
					};

					this.setState((prevState) => ({
						timesheets: [...prevState.timesheets, newEl],
					}));
				});
			})
			.catch((err) => message.error("Error: " + err));
	};

	reloadTimesheets = () => {
		this.setState({ timesheets: [] });
		this.loadTimesheets();
	};

	deleteTimesheet = (id) => {
		const url = `/api/v1/timesheets/${id}`;

		fetch(url, {
			method: "delete",
		})
			.then((data) => {
				if (data.ok) {
					this.reloadTimesheets();
					return data.json();
				}
				throw new Error("Network error.");
			})
			.catch((err) => message.error("Error: " + err));
	};

	render() {
		return (
			<>
				<Table
					className="table-striped-rows"
					dataSource={this.state.timesheets}
					columns={this.columns}
					pagination={{ pageSize: 5 }}
				/>

			</>
		);
	};
}

export default Timesheets;