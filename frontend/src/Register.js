import React, { useState } from 'react'
import "./signup.css"
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Register() {
    const [name, namechange] = useState("");
    const [password, passwordchange] = useState("");
    const [email, emailchange] = useState("");
    const [dob, dobchange] = useState("");
    const [confirmPassword, confirmPasswordchange] = useState("")

    const navigate = useNavigate();
    const IsValidate = () => {
        let isproceed = true;
        let errormessage = 'Please enter the value in ';
        if (name === null || name === '') {
            isproceed = false;
            errormessage += ' Fullname';
        }
        if (password === null || password === '') {
            isproceed = false;
            errormessage += ' Password';
        }
        if (email === null || email === '') {
            isproceed = false;
            errormessage += ' Email';
        }
        if (dob === null || dob === '') {
            isproceed = false;
            errormessage += ' BirthDate';
        }
        if (confirmPassword === null || confirmPassword === '') {
            isproceed = false;
            errormessage += ' Confirm Password';
        }
        if(!isproceed){
            toast.warning(errormessage)
        }else{
            if(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)){

            }else{
                isproceed = false;
                toast.warning('Please enter the valid email')
            }
        }
        return isproceed;
    }
    const handlesubmit = (e) => {
        e.preventDefault();
        let regobj = { name, password, email, dob, confirmPassword };
        if (IsValidate()) {
        //console.log(regobj);
        fetch("http://localhost:5000/signup", {
            method: "POST",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(regobj)
        }).then((res) => {
            toast.success('Registered successfully.')
            navigate('/login');
        }).catch((err) => {
            toast.error('Failed :' + err.message);
        });
    }
}
const login =() => {
    navigate("/login");
}
  return (
    // <div>
    //         <div className="offset-lg-3 col-lg-6">
    //             <form className="container" onSubmit={handlesubmit}>
    //                 <div className="card">
    //                     <div className="card-header">
    //                         <h1>User Registeration</h1>
    //                     </div>
    //                     <div className="card-body">

    //                         <div className="row">
    //                         <div className="col-lg-6">
    //                                 <div className="form-group">
    //                                     <label>Full Name <span className="errmsg">*</span></label>
    //                                     <input value={name} onChange={e => namechange(e.target.value)} className="form-control"></input>
    //                                 </div>
    //                             </div>
    //                             <div className="col-lg-6">
    //                                 <div className="form-group">
    //                                     <label>Email <span className="errmsg">*</span></label>
    //                                     <input value={email} onChange={e => emailchange(e.target.value)} className="form-control"></input>
    //                                 </div>
    //                             </div>
    //                             <div className="col-lg-6">
    //                                 <div className="form-group">
    //                                     <label>Password <span className="errmsg">*</span></label>
    //                                     <input value={password} onChange={e => passwordchange(e.target.value)} type="password" className="form-control"></input>
    //                                 </div>
    //                             </div>
    //                             <div className="col-lg-6">
    //                                 <div className="form-group">
    //                                     <label>Confirm Password <span className="errmsg">*</span></label>
    //                                     <input value={confirmPassword} onChange={e => confirmPasswordchange(e.target.value)} type="password" className="form-control"></input>
    //                                 </div>
    //                             </div>
    //                             <div className="col-lg-6">
    //                                 <div className="form-group">
    //                                     <label>Date Of Birth <span className="errmsg">*</span></label>
    //                                     <input value={dob} onChange={e => dobchange(e.target.value)} type="date" className="form-control"></input>
    //                                 </div>
    //                             </div>

    //                         </div>

    //                     </div>
    //                     <div className="card-footer">
    //                         <button type="submit" className="btn btn-primary">Register</button> |
    //                         <button type="submit" className="btn btn-success" onClick={login}>Login</button>
    //                     </div>
    //                 </div>
    //             </form>
    //         </div>


    //     </div>
    <div className="body"> 
    <div className="register">
        <h1 className="registerheading">Register</h1>
        <input type="text" name="name" value={name} placeholder='Your First Name' onChange={(e) => namechange(e.target.value)}></input>
        <input type="text" name="email" value={email} placeholder='Your Email' onChange={(e) => emailchange(e.target.value)}></input>
        <input type="date" name="dob" value={dob} placeholder='Date Of Birth' onChange={(e) => dobchange(e.target.value)}></input>
        <input type="password" name="password" value={password} placeholder="Your Password" onChange={(e) => passwordchange(e.target.value)}></input>
        <input type="password" name="reEnterPassword" value={confirmPassword} placeholder="Re-enter Password" onChange={(e) => confirmPasswordchange(e.target.value)}></input>
        <div className="button" onClick={handlesubmit}>Register</div>
        <div className="or">OR</div>
        <div className="button" onClick={login}>Login</div>
    </div>
    </div>
  )
}

export default Register