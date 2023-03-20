import React,{useState} from 'react'
import axios from 'axios'
import {useHistory } from 'react-router-dom'
const Conduct_appointment = () => {
    const history = useHistory();
    const [medicine, setMedicine] = useState([]);
    // var days = 0;

    const handleMinus = () => {
        var input = document.getElementById('days');
        if(input.value > 0) input.value = parseInt(input.value) - 1;
    }

    const handlePlus = () => {
        var input = document.getElementById('days');
        input.value = parseInt(input.value) + 1;
    }
    const [val, setVal] = useState("");
    const changed=(e)=>[
        setVal(e.target.value)
    ]

    const main=()=>{
        axios.post('http://localhost:9002/doctor_prescribe', {
            rollno: "210496",
            medication: medicine,
            remark: val
        }).then((res)=>{
            console.log(res);
            history.push('/doctor_appt');
        }).catch((err)=>{
            console.log(err);
        })
    }
    const handleClick = () => {
        var name = document.getElementById('name').value;
        var dosage = document.getElementsByName('btnradio');
        var dose;
        var days = document.getElementById('days').value;
        for(var i = 0; i < dosage.length; i++)
        {
            if(dosage[i].checked)
            {
                dose = dosage[i].value;
                dosage[i].checked = false;
                break;
            }
        }
        setMedicine([...medicine, {name_of_medicine: name, dosage: dose, days: days}]);
        document.getElementById('name').value = "";
        document.getElementById('days').value = 0;
    }

    return (
        <div className="container row">
            <div className="col-5" role="group" aria-label="Vertical button group">
                <button type="button" className="btn btn-dark col-12 my-5" onClick={main}>Prescribe Medication</button>
                <button type="button" className="btn btn-dark col-12 my-5">Medical History</button>
                <button type="button" className="btn btn-dark col-12 my-5">Specialist Referral</button>
                <button type="button" className="btn btn-dark col-12 my-5">Diagnostic Tests</button>
            </div>
            <div className="col-7 text-center">
                <h2 className="mb-5">Medication</h2>
                <div className="container my-3">
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="inputGroup-sizing-default">Medicine Name</span>
                        <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" id="name"/>
                    </div>
                </div>
                <div class="btn-group my-3" role="group" aria-label="Basic radio toggle button group">  
                    <input type="radio" class="btn-check" name="btnradio" id="btnradio1" autocomplete="off" value="qD"/>
                    <label class="btn btn-outline-primary" htmlFor="btnradio1">qD</label>

                    <input type="radio" class="btn-check" name="btnradio" id="btnradio2" autocomplete="off" value="BID"/>
                    <label class="btn btn-outline-primary" htmlFor="btnradio2">BID</label>

                    <input type="radio" class="btn-check" name="btnradio" id="btnradio3" autocomplete="off" value="TID"/>
                    <label class="btn btn-outline-primary" htmlFor="btnradio3">TID</label>

                    <input type="radio" class="btn-check" name="btnradio" id="btnradio4" autocomplete="off" value="BBF"/>
                    <label class="btn btn-outline-primary" htmlFor="btnradio4">BBF</label>

                    <input type="radio" class="btn-check" name="btnradio" id="btnradio5" autocomplete="off" value="BD"/>
                    <label class="btn btn-outline-primary" htmlFor="btnradio5">BD</label>
                </div>

                <div className="row my-3">
                    <div className="col-5 align-center">
                        Days:
                    </div>
                    <div className="col-5">
                        <div class="input-group mb-3">
                            <button onClick={handleMinus} class="btn btn-dark" type="button" id="button-addon2">-</button>
                            <input id="days" style={{textAlign: "center"}} type="number" class="form-control" placeholder="0" aria-label="Number of Days" aria-describedby="button-addon2" value={0} readOnly/>
                            <button onClick={handlePlus} class="btn btn-dark" type="button" id="button-addon2">+</button>
                        </div>
                    </div>
                </div>

                <button className="btn btn-dark my-3" onClick={handleClick}>Add Medicine</button>
                <div className="row my-3">
                    <div className="col-6">
                        <h4>Current Prescription</h4>
                    </div>
                    <div className="col-6">
                        <h4 className="justify-content-center">Remarks</h4>
                    </div>
                    <div className="col-6">
                        {
                            medicine?.map((element) => {
                                return(
                                    <div className="row">
                                        {element.name} {element.dose}-{element.days}
                                    </div>
                                );
                            })
                        }
                    </div>
                    <div className="col-6">
                        <div class="input-group">
                            {/* <span class="input-group-text">With textarea</span> */}
                            <textarea value={val} onChange={changed}  class="form-control" rows="6" aria-label="With textarea"></textarea>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Conduct_appointment;
