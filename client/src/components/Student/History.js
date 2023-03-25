import "./History.css"
import React from "react";
import { useEffect,useState } from "react";
import {global} from "../login/login";
import axios from "axios";
// import {Link} from "react-router-dom";

export default function History(props) {
	const [history, setHistory] = useState([]);
    useEffect(() => {
		document.onload=getHistory();
	}, []);

	const getHistory = () => {
        axios.get("http://localhost:9002/student_history"+global.rollno).then((res) => {
			console.log(res);
			setHistory(res.data);
		}).catch((err) => {
			console.log(err);
		})
	}

	return (
		<div className="student_history">
		<h2>Your medical history:</h2>
		{/* <h2>{history}</h2> */}
		</div>
	)
}