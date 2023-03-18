import { BrowserRouter as Router, Switch, Route } from "react-router-dom" ;
import { useState } from 'react';

import './App.css'

import Homepage from "./components/homepage/homepage"

import Navbar from './components/Navbar';

import {Login,global} from "./components/login/login"

import Register from "./components/register/register"

import Doctor from './components/doctor/Entry_page';
import Schedule from './components/doctor/Schedule';
import Veiwappointments from './components/doctor/Veiw Appointments/veiw_appointments';
import Conductappointment from './components/doctor/Veiw Appointments/Conduct_appointment';

import InitialNurse from "./components/Nurse/InitialNurse"
import Vitals from "./components/Nurse/Vitals"

import InitialPharmacy from "./components/Pharmacy/InitialPharmacy"
import Prescription from "./components/Pharmacy/Prescription"
import CompletedPrescription from "./components/Pharmacy/CompletedPrescription";


import StudentHome from "./components/Student/Home";
import StudentRequest from "./components/Student/Request";
import StudentUpcoming from "./components/Student/Upcoming";
import StudentHistory from "./components/Student/History";
import StudentDoctors from "./components/Student/Doctors";

import InitialReceptionist from './components/Receptionist/InitialReceptionist';
import AppointmentsRequests from './components/Receptionist/AppointmentsRequests';
import DoctorAllotment from './components/Receptionist/DoctorAllotment';
import DoctorAppointments from './components/Receptionist/DoctorAppointments';
import UploadReports from './components/Receptionist/UploadReports';
import AppointmentStatus from './components/Receptionist/AppointmentStatus';

import pendingAppointments from './Data';
import { ongoingAppointments, completedAppointments } from './Data';

function App() {

  const [ user, setLoginUser] = useState({identity:"doctor"})

  // eslint-disable-next-line
  // const [pendingAppt, setPendingAppt] = useState(pendingAppointments);
  // eslint-disable-next-line
  // const [ongoingAppt, setOngoingAppt] = useState(ongoingAppointments);
  // eslint-disable-next-line
  // const [completedAppt, setCompletedAppt] = useState(completedAppointments);

  return (
    <div className="App">
      <Navbar/>
      <Router>
        <Switch>
          <Route exact path="/">
            {
              user && user._id ? <Homepage setLoginUser={setLoginUser} /> : <Login setLoginUser={setLoginUser}/>
            }
          </Route>
          <Route path="/login"><Login setLoginUser={setLoginUser}/></Route>
          
          <Route path="/register"><Register /></Route>
          
          <Route exact path="/doctor"><Doctor/></Route>
          <Route exact path="/doctor/schedule"><Schedule/></Route>
          <Route exact path="/doctor/view_appointment"><Veiwappointments/></Route>
          <Route exact path="/doctor/conduct_appointment"> <Conductappointment/> </Route>
          
          
          <Route exact path="/nurse/"><InitialNurse name="abcd" id={420}/></Route>
          <Route exact path="/nurse/vitals"><Vitals/></Route>
          
          
          <Route exact path="/pharmacy/"><InitialPharmacy prescriptions={ongoingAppointments}/></Route>
          <Route exact path="/pharmacy/prescription"><Prescription/></Route>
          <Route exact path="/pharmacy/completedprescription"><CompletedPrescription prescriptions={completedAppointments}/></Route>
          
          
          <Route exact path="/student"> <StudentHome /></Route>
          <Route exact path="/student/request"><StudentRequest /></Route>
          <Route exact path="/student/upcoming"><StudentUpcoming /></Route>
          <Route exact path="/student/history"><StudentHistory /></Route>
          <Route exact path="/student/doctors"><StudentDoctors /></Route>
          
          
          <Route exact path="/receptionist/"><InitialReceptionist/></Route>
          <Route exact path="/receptionist/appointments"><AppointmentsRequests prescriptions={pendingAppointments}/></Route>
          <Route exact path="/receptionist/appointmentstatus"><AppointmentStatus prescriptions={ongoingAppointments}/></Route>
          <Route exact path="/receptionist/doctorallotment"><DoctorAllotment/></Route>
          <Route exact path="/receptionist/setschedule"><DoctorAppointments/></Route>
          <Route exact path="/receptionist/uploadreports"><UploadReports/></Route>
          
          
        </Switch>
      </Router>
    </div>
  );
}

export default App;
