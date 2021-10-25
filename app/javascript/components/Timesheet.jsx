import { Table, message, Popconfirm } from "antd";
import React from "react";
import { useLocation } from "react-router-dom";

function Timesheet(){
	debugger;
	const search = useLocation().search;
	const id= new URLSearchParams(search).get("id");
	console.log(id); //12345

	return (
		<>
			<div>This is timesheet show</div>
		</>
	);
}


export default Timesheet;