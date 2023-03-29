import React, { useState } from 'react';
import Popup from './Popup';
import { useEffect } from 'react';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
// import axios from 'axios';
const MedHistory = (props) => {
    const axiosPrivate = useAxiosPrivate();
    const [showModal, setShowModal] = useState(false);
    const [popup, setPopup] = useState(false);
    // eslint-disable-next-line
    const{ rollno } = props;
    const [hist,sethist]=useState([]);
    useEffect(() => {
        getHistory();
        // eslint-disable-next-line
    },[]);
    const getHistory = () => {
        axiosPrivate.get("/student_history"+rollno).then((res) => {
            console.log(res.data.request);
            sethist(res.data.request);

        }).catch((err) => {
            console.log(err);
        })
    }
    
    return (
        <div className="col-7 mx-1" style={{ maxHeight: '600px', overflowY: 'scroll' }}>
            {hist?.map((element) => (
                <div key={element.index}>
                    <div className="card my-3 mx-3 btn btn-light" key={element.index} onClick={() => {
                        setPopup(element);
                        setShowModal(true);
                    }}>
                        <div className="card-header text-center">{element.date}</div>
                        <div className="card-body">
                            <h5 className="card-title">{element.date}</h5>
                            <div className="card-text">{
                                element.medication?.map((med) => (
                                    <div key={med.index}>
                                        <div>{med.name_of_medicine}</div>
                                        <div>{med.days}</div>
                                        <div>{med.dosage}</div>
                                    </div>
                                ))
                            }</div>
                        </div>
                        <Popup open={showModal} details={popup}/>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default MedHistory;