import axios from 'axios'
import { Table, message, Popconfirm } from "antd";
import React, {useState, useEffect, Fragement} from "react";
import { useParams, Link } from "react-router-dom";

const Timesheet = (props) => {
	let { id } = useParams();
	const [timesheet, setTimesheet] = useState({})
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {

		console.log(id)
		const url = `/api/v1/timesheets/${id}.json`;
		
		axios.get(url)
    .then(resp => { 
			console.log(resp.data)

			setTimesheet(resp.data.timesheet) 
			setLoaded(true)
		})
    .catch(resp => console.log(resp) )
  }, [])

	return (
		<div>
		{
			loaded &&
			<div>
				<p>
					<strong>Start time:</strong>
					<p>{timesheet.start_time}</p>
				</p>
				<p>
					<strong>End time:</strong>
					<p>{timesheet.end_time}</p>
				</p>

				<p>
					<strong>Hours worked:</strong>
					<p>{timesheet.hours_worked}</p>
				</p>
				<Link to={`/timesheets/${id}/edit`}>Edit</Link>
				<Link to={`/timesheets/`}>Back</Link>
			</div>
		}
		</div>
	)
}


export default Timesheet