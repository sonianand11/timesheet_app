import { Table, message, Popconfirm } from "antd";
import React from "react";
// import AddBeerModal from "./AddBeerModal";

class Timesheets extends React.Component {
	columns = [
		{
			title: "Brand",
			dataIndex: "brand",
			key: "brand",
		},
		{
			title: "Style",
			dataIndex: "style",
			key: "style",
		},
		{
			title: "Country",
			dataIndex: "country",
			key: "country",
		},
		{
			title: "Quantity",
			dataIndex: "quantity",
			key: "quantity",
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
		},
	];

	state = {
		timesheets: [],
	};

	componentDidMount() {
		this.loadTimesheets();
	}

	loadTimesheets = () => {
		const url = "/timesheets.json";
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
						brand: timesheet.brand,
						style: timesheet.style,
						country: timesheet.country,
						quantity: timesheet.quantity,
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
		const url = `/timesheets/${id}`;

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
	}
}

export default Timesheets;