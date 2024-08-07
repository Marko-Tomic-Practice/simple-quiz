import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SignInCardComponent = (props) => {

    const navigate = useNavigate();
    
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [repPassword, setRepPassword] = useState("");
    const [register, setRegister] = useState(false);


    useEffect(()=> {
        if(props.title === "Register"){
            setRegister(true);
        }
    }, [props])
    
    function handleClickBack(){
        navigate(-1);
    }

    function validate(){

        if(register){
            if(password !== repPassword){
                return false;
            }
            if(!email.includes("@")){
                return false;
            }
        }

        return true;
    }

    function handleClickSignIn(){
        if(validate()){
            console.log("Prosao");
        } else
            console.log("Greska");
    }


  return (
    <div className='row justify-content-center mt-5'>
        <div className='col-5 card'>
            <div className='card-header h2 text-center'>
                {props.title}
            </div>
            <div className='card-body h4'>
                <div className='row gap-3'>
                    { register ?
                        <>
                            <div className='row'>
                                <h4 className='col-5 text-center'>Username</h4>
                                <input className='col-7' type="text" onChange={(e)=>setUsername(e.target.value)}/>
                            </div>
                            <div className='row'>
                                <h4 className='col-5 text-center'>E-mail:</h4>
                                <input className='col-7' type="text" onChange={(e)=>setEmail(e.target.value)}/>
                            </div>
                            <div className='row'>
                                <h4 className='col-5 text-center'>Password:</h4>
                                <input className='col-7' type="password" onChange={(e)=> setPassword(e.target.value)}/>
                            </div>
                            <div className='row'>
                                <h4 className='col-5 text-center'>Repeat Password:</h4>
                                <input className='col-7' type="password" onChange={(e)=> setRepPassword(e.target.value)}/>
                            </div>
                        </>
                        :
                        <>
                            <div className='row'>
                                <h4 className='col-5 text-center'>Username or E-mail:</h4>
                                <input className='col-7' type="text" onChange={(e)=>setUser(e.target.value)}/>
                            </div>
                            <div className='row'>
                                <h4 className='col-5 text-center'>Password:</h4>
                                <input className='col-7' type="password" onChange={(e)=> setPassword(e.target.value)}/>
                            </div>
                        </>  
                    }
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
                            <button className='btn btn-success' onClick={handleClickSignIn}>{props.title}</button>
                            {!register && <h6>Or <a href="/register">register</a></h6>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SignInCardComponent