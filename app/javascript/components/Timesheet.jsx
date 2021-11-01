import { Table, message, Popconfirm } from "antd";
import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";

const Timesheet = (props) => {
	let { id } = useParams();
	const {timesheet, setTimesheet} = useState({})

	const loadTimesheet = () => {
		const url = `/api/v1/timesheets/${id}.json`;
		axios.get(url)
    .then(resp => { setTimesheet(resp.data.timesheet) })
    .catch(resp => console.log(resp) )
	};

	return (
		<>
			<p>
				<strong>Start time:</strong>
				<p>{this.state.timesheet.start_time}</p>
			</p>
			<p>
				<strong>End time:</strong>
				<p>{this.state.timesheet.end_time}</p>
			</p>

			<p>
				<strong>Hours worked:</strong>
				<p>{this.state.timesheet.hours_worked}</p>
			</p>
			<Link to={`/timesheets/${record.id}/edit`}>Edit</Link>
			<Link to={`/timesheets/`}>Back</Link>
		</>
	);
}


export default Timesheet;