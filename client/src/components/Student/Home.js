import "./Home.css"
import React from "react";
import {Link,useHistory} from "react-router-dom";
import { global } from "../login/login";
import lib from './lib.jpg'

export default function Home(props) {
	const history= useHistory();
	var k=0;
   if(global[1]==='student'){
    k=1;
   }
   if(k===0){
    history.push("/login")
   }
	return (

		<div className="container row home-page">
		<Link to="student/request"><button className="student_home col-6"> Request Appointment</button></Link>
		<br/>
		<Link to="student/upcoming"><button className="student_home col-6"> View Upcoming Appointments</button></Link>
		<Link to="student/history"><button className="student_home col-6"> View Medical History</button></Link>
		<Link to="student/doctors"><button className="student_home col-6"> View Doctor Schedules</button></Link>
		{/* <img src={lib} alt="P K Kelkar Library"/> */}


		</div>
	)
}