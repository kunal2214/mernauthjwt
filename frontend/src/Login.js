import React,{ useEffect, useState }  from 'react'
import "./login.css"
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
    const [email, emailupdate] = useState('');
    const [password, passwordupdate] = useState('');
    const usenavigate=useNavigate();

    useEffect(()=>{
        sessionStorage.clear();
    },[]);

    const validate = () => {
        let result = true;
        if (email === '' || email === null) {
            result = false;
            toast.warning('Please Enter Email');
        }
        if (password === '' || password === null) {
            result = false;
            toast.warning('Please Enter Password');
        }
        return result;
    }

    async function ProceedLogin(e){
        e.preventDefault();
        if (validate()) {
            let inputobj={"email": email, "password": password};
            console.log(inputobj)
            const response = await fetch("http://localhost:5000/signin",{
                method:'POST',
                headers:{'content-type':'application/json'},
                body:JSON.stringify(inputobj)
            })
            const data = await response.json()
            console.log(data)
            if (data.userInfo) {
                sessionStorage.setItem('username',email);
                sessionStorage.setItem('jwttoken',data.jwtToken);
                   usenavigate('/')
            } else {
                alert('Please check your username and password')
            }
    }}
    const register =() => {
        usenavigate("/register");
    }
  return (
    <div className='bg'>
    <div className="login">
        <h1 className='heading'>Login</h1>
        <input type="text" name="email" value={email} placeholder='Your Email' onChange={(e) => emailupdate(e.target.value)}></input>
        <input type="password" name="password" value={password} placeholder="Your Password" onChange={(e) => passwordupdate(e.target.value)}></input>
        <div className="button" onClick={ProceedLogin}>Login</div>
        <div className='or'>OR</div>
        <div className="button" onClick={register}>Register</div>
    </div>
    </div>
  )
}

export default Login