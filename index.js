//ABC -Aniket


import express from "express"
import cors from "cors"
import mongoose from "mongoose"

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

//mongodb+srv://CS:5i4tDRJZM5W78xgn@cluster0.5ebvu5n.mongodb.net/
//mongodb+srv://aniketsborkar:AeQrXz4v5Go8WTKP@cluster0.ukqevpn.mongodb.net/test
mongoose.connect("mongodb+srv://aniketsborkar:AeQrXz4v5Go8WTKP@cluster0.ukqevpn.mongodb.net/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log("DB connected")
})

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    rollno:String,
    bg:String,
    identity:String,
    password: String
})

const User = new mongoose.model("User", userSchema)

//Routes
app.post("/login", (req, res)=> {
    const { email, password} = req.body
    User.findOne({ email: email}, (err, user) => {
        if(user){
            console.log(user);
            if(password === user.password ) {
                res.send({message: "Login Successfull", user: user})
            } else {
                res.send({ message: "Password didn't match"})
            }
        } else {
            res.send({message: "User not registered"})
        }
    })
}) 

app.post("/register", (req, res)=> {
    const { name, email,rollno,bg,identity, password} = req.body
    User.findOne({email: email}, (err, user) => {
        if(user){
            res.send({message: "User already registerd"})
        } else {
            const user = new User({
                name,
                email,
                rollno,
                bg,
                identity,
                password
            })
            user.save(err => {
                if(err) {
                    res.send(err)
                } else {
                    res.send( { message: "Successfully Registered, Please login now." })
                }
            })
        }
    })
    
}) 

const student_request_schema = new mongoose.Schema({
    name: String,
    rollno:String,
    appy_type:String,
    appt_slot:String,
    symptoms: String,
    Doctor:String,
    identity:String
})

const Student_request = new mongoose.model("Student_request", student_request_schema)

app.post("/request_student", (req, res)=> {
    const [ name, rollno,appy_type,appt_slot,symptoms,Doctor ] = req.body
    console.log(req.body);
            const request = new Student_request({
                name,
                rollno,
                appy_type,
                appt_slot,
                symptoms,
                Doctor,
                identity:"student"
            })
                       request.save(err => {
                if(err) {
                    res.send(err)
                } else {
                    res.send( { message: "Succesfully request registered" })
                }
            })
        }
    )
    
app.get("/upcoming_student", (req, res)=> {
       Student_request.find({identity:"student"}, (err, request) => {
		if(request){
			res.send({message: "Upcoming appointments", request: request})
		} else {
			res.send({message: "No appointments"})
		}
    })
})

const apptSchema = new mongoose.Schema({
    name: String,
    rollno:String,
    appy_type:String,
    appt_slot:String,
    symptoms: String,
    Doctor:String,
    
    

    // identity:String,
});

const Appointment = new mongoose.model('Appointment', apptSchema);

const Medical_history = new mongoose.Schema({
    name: String,
    rollno:String,
    count:Number,
    medical_history:[{
        date: Date,
        medication:[{name_of_medicine:String,
                    dosage:String,
                    days:Number}],
        vitals_Blood_pressure: String,
        vitals_Oxygen: String,
        vitals_temperature: Number,
        completed: Boolean
    }],
    
});
const Med = new mongoose.model('Med', Medical_history);


app.get("/doctor_appt", (req, res) =>{
    console.log(req.query);
    Appointment.find({ Doctor: req.query.doctor }).then((err, stuff)=>{
        if(err){
            console.log(err);
            res.send(err);
        }
        else{
            console.log(stuff);
            res.json(stuff);
        }
    });
});

// app.post("/doctor_prescribe", (req, res) => {

// })


// const arr=[name,roll_id,description,slot,doctor_by_receptionist , doctor_by_student_choice]
app.post("/submitted", (req, res) =>{
    console.log(req.body);
    const [name,roll_id,description,slot,doctor_by_receptionist , doctor_by_student_choice] = req.body;
    console.log(name);
    const appt_final = new Appointment;
    const filter = {
        rollno: roll_id, 
        symptoms: description, 
        appt_slot: slot, 
        Doctor: doctor_by_student_choice
    };
    Student_request.find(filter, (err, stuff) =>{
        console.log("hello");
            if(err){
            console.log("here");
            console.log(err);
            res.send(err);
        }
        else{
            console.log(stuff);
            appt_final.name = stuff[0].name;
            appt_final.rollno = stuff[0].rollno;
            appt_final.appy_type = stuff[0].appy_type;
            appt_final.appt_slot = stuff[0].appt_slot;
            appt_final.symptoms = stuff[0].symptoms;
            appt_final.Doctor = stuff[0].Doctor;
            
            Med.findOne({rollno: stuff[0].rollno}, (err, stuff) =>{

                if(stuff){
                    console.log("here");
                    stuff.medical_history.push({
                        date: new Date(),
                        medication:[{name_of_medicine:"Paracetamol",
                                    dosage:"2 tablets",
                                    days:2}],
                        vitals_Blood_pressure: "Not chechked",
                         vitals_Oxygen: "Checked",
                         vitals_temperature: 0 ,
                          completed: false                
                    })
                }
                else{
                    const med = new Med;
                    med.count=0;
                    med.name = appt_final.name;
                    med.rollno = appt_final.rollno;
                    med.save(err => {
                        if(err){
                            console.log(err);
                            res.send(err);
                        }
                    })
                }
            })

            // appt_final.identity = stuff.
            appt_final.save(err =>{
                if(err){
                    console.log(err);
                    res.send(err);
                }
            });

            
            Student_request.findOneAndDelete(filter, (err) => {
                if(err){
                    console.log(err);
                    res.send(err);
                }
            })
            res.send({message : "Done"});
        }
    })
});
app.get("/new:roll", (req, res)=> {
    Appointment.find({rollno:req.params.roll}, (err, request) => {
        if(request){
            res.send({message: "Upcoming appointments", request: request})
          } else {
            res.send({message: "No appointments"})
          }
    })
})

app.get("/doctor:name", (req, res) =>{
     Appointment.find({Doctor:req.params.name}, (err, request) => {
        if(request){
            res.send({message: "Upcoming appointments", request: request})
          } else {
            res.send({message: "No appointments"})
          }
        })
});

app.post("/nurse", (req, res) => {
    console.log(req.body);
    Med.findOne({rollno: req.body.rollno}, (err, stuff) => {
                   if(stuff){
                    stuff.medical_history[stuff.count].vitals_Blood_pressure = req.body.vitals_Blood_pressure;
                    stuff.medical_history[stuff.count].vitals_Oxygen = req.body.vitals_Oxygen;
                    stuff.medical_history[stuff.count].vitals_temperature = req.body.vitals_temperature;
                   }
                   stuff.save(err => {
                          if(err){
                            console.log(err);
                            res.send(err);
                          }
                     })
    })
})

app.post("/doctor_prescribe", (req, res) => {
    const [rollno,medication,remark]=req.body;
    Med.findOne({rollno: rollno}, (err, stuff) => {
        if(stuff){
            stuff.medical_history[stuff.count].medication = medication;
            stuff.medical_history[stuff.count].remark = remark;
            stuff.medical_history[stuff.count].completed = true;
            stuff.count = stuff.count + 1;
        }
    })

})

let docschedule = {"Dr. A": "morning", "Dr. B": "evening", "Dr. C":"both"};

app.get("/docschedule", (req, res) => {
	res.send(docschedule)
});

app.post("/docschedule", (req, res) => {
	console.log(req.body);
	docschedule = req.body;
	res.send("Updated");
	
})

app.get("/student_history:roll", (req, res) => {
    Med.findOne({rollno: req.params.roll}, (err, stuff) => {
        if(stuff){
            res.send({message: "Medical history", request: stuff.medical_history})
          } else {
            res.send({message: "No Medical History"})
          }
    })
})

app.listen(9002,() => {
    console.log("BE started at port 9002")
})

