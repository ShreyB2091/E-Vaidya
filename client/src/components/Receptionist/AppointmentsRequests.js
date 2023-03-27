import React,{useEffect, useState} from 'react'
import Appointment from './Appointment'
import axios from 'axios';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const AppointmentsRequests = () => {
	const [app_t_arr, setAppts] = useState([])
    const axiosPrivate = useAxiosPrivate();
    
    useEffect(() => {
        document.onload = rrr();
    }, [])

    const rrr = () =>{
        axiosPrivate.get('/upcoming_student') 
        .then(res => {
            setAppts(res.data.request);
            console.log(res.data.request);
        })
        .catch(err => {
            console.log(err);
        })
    }
    return (
        <div>
            <div className="container my-5">
                <div className="row justify-content-between">
                    <div className="col-6">
                        <h2>Appointment Requests</h2>
                    </div>
                    <div className="col-5">
                        <form className="d-flex" role="search">
                            <input className="form-control me-2" type="number" placeholder="Roll/PF Number" aria-label="Search"/>
                            <button className="btn btn-outline-success" type="submit">
                                Search
                            </button>
                        </form>
                    </div>
                </div>
             {/* render below section from the data uploaded from the array appt_array that contains all the info*/}

                <div className="container"> 
                    <div className="row">
						{app_t_arr.map((el) =>  {
							return (
						<div className="col-md-4" key={app_t_arr.indexOf(el)}> 
							<Appointment prescription={{
                                 name :el.name ,
                                 id :el.rollno,
                                 slot :el.appt_slot ,
                                 description :el.symptoms,
                                 preferredDoctor :el.Doctor,
							}} />
						</div>);
						})
						}
                    </div>
                </div>


            </div>
        </div>
    );
}

export default AppointmentsRequests
