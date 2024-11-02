import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import './resetpassword.css';

const resetPassword = ()=>{

    const {search}=useLocation();
    const navigate = useNavigate();
    
    const queryParams = search.split('?').join().split('&');
    console.log(queryParams);
    
    const [resetPassword,setResetPassword]=useState({
        oldPassword:'',
        newPassword:'',
        redirectTo:null
    })

    const getRedirectURL=()=>{
        const redirectTo=queryParams[0].split('=')[1];
        setResetPassword({...resetPassword,redirectTo})
    }

    const handleChange=(e)=>{
        setResetPassword({
            ...resetPassword,
            [e.target.id]:e.target.value
        })
    }

    useEffect(()=>{
    },[])

    useEffect(()=>{ 
        getRedirectURL()
    },[resetPassword.redirectTo])

    const Reset=()=>{
        //Make an API call to reset password
        
        //Callback fired when Reset Password API gives a response
        setTimeout(()=>{
            navigate("/");
        },0)
    }

    return(
        <div className="password_reset">
            <h1>
               Hey there, reset your password!
            </h1>
            <div className="form-control">
                <label htmlFor="oldPassword">Old Password</label>
                <input onChange={handleChange} id="oldPassword" type="password" />
            </div>
            <div className="form-control">
                <label htmlFor="newPassword">New Password</label>
                <input onChange={handleChange} id="newPassword" type="password" />
            </div>
            <div className="form-control" style={{justifyContent:'center'}}>
                <button onClick={Reset}>Reset Password</button>
            </div>
        </div>
    )
}

export default resetPassword;