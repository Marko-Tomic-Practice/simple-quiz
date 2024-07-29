import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SignInComponent = () => {
  
    const navigate = useNavigate();
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleClickBack(){
        navigate(-1);
    }

    function handleClickSignIn(){
        const credentials = { email, password };
        console.log(credentials);
    }

    return (
    <div className='row mt-5'>
        <div className='col-4'></div>
        <div className='col-4 card'>
            <div className='card-header h2 text-center'>
                Sign In
            </div>
            <div className='card-body h4'>
                <div className='row'>
                    <h4 className='col-4 text-center'>E-mail:</h4>
                    <input className='col-8' type="text" onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <div className='row mt-4'>
                    <h4 className='col-4 text-center'>Password:</h4>
                    <input className='col-8' type="password" onChange={(e)=> setPassword(e.target.value)}/>
                </div>
            </div>
            <div className='card-footer'>
                <button className='btn btn-secondary' onClick={handleClickBack}>Back</button>
                <button className='btn btn-success float-end' onClick={handleClickSignIn}>Sign In</button>
            </div>
        </div>
        <div className='col-4'></div>
    </div>
  )
}

export default SignInComponent