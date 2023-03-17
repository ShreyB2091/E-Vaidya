import express from "express"
import cors from "cors"
import mongoose from "mongoose"

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

//mongodb+srv://CS:5i4tDRJZM5W78xgn@cluster0.5ebvu5n.mongodb.net/
//mongodb+srv://aniketsborkar:AeQrXz4v5Go8WTKP@cluster0.ukqevpn.mongodb.net/test
mongoose.connect("mongodb+srv://aniketsborkar:AeQrXz4v5Go8WTKP@cluster0.ukqevpn.mongodb.net/test?retryWrites=true&w=majority", {
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
                console.log(request);
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
    medicine: [{
        name_med: String,
        dosage: [String],
        number_of_days: Number
    }],
    remark: String
});

const Appointment = new mongoose.model('Appointment', apptSchema);

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

app.post("/doctor_prescribe", (req, res) => {

})


// const arr=[name,roll_id,description,slot,doctor_by_receptionist , doctor_by_student_choice]
app.post("/submitted", (req, res) =>{
    console.log(req.body);
    const {name,roll_id,description,slot,doctor_by_receptionist , doctor_by_student_choice} = req.body;
    console.log(name);
    const appt_final = new Appointment;
    const filter = {
        name: name,
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
            appt_final.Doctor = doctor_by_receptionist;
            // appt_final.identity = stuff.
            appt_final.save(err =>{
                if(err){
                    console.log(err);
                    res.send(err);
                }
            });

            Student_request.deleteOne(filter, (err) =>{
                if(err){
                    console.log(err);
                }
            });

            res.send({message : "Done"});
        }
    })
});



    
app.listen(9002,() => {
    console.log("BE started at port 9002")
})