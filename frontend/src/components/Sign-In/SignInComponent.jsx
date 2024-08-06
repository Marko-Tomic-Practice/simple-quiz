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
    <div className='row justify-content-center mt-5'>
        <div className='col-5 card'>
            <div className='card-header h2 text-center'>
                Sign In
            </div>
            <div className='card-body h4'>
                <div className='row'>
                    <h4 className='col-5 text-center'>Username or E-mail:</h4>
                    <input className='col-7' type="text" onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <div className='row mt-4'>
                    <h4 className='col-5 text-center'>Password:</h4>
                    <input className='col-7' type="password" onChange={(e)=> setPassword(e.target.value)}/>
                </div>
            </div>
            <div className='card-footer'>
                <div className='row justify-content-between'>
                    <div className='col-3'>
                        <div className='row'>
                            <button className='btn btn-secondary' onClick={handleClickBack}>Back</button>
                        </div>
                    </div>
                    <div className='col-3'>
                        <div className='row text-center'>
                            <button className='btn btn-success' onClick={handleClickSignIn}>Sign In</button>
                            <h6>Or <a href="/register">register</a></h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SignInComponent