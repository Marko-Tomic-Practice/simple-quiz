import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { registerDB, signinDB } from '../../services/AuthService';

const SignInCardComponent = (props) => {

    const navigate = useNavigate();
    
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [usernameOrEmail, setUsernameOrEmail] = useState("");
    const [repPassword, setRepPassword] = useState("");

    const [register, setRegister] = useState(false);

    const location = useLocation();
    const [title, setTitle] = useState("");

    useEffect(()=> {
        if(location.pathname === "/register"){
            setRegister(true);
            setTitle("Register");
        } else {
            setTitle("Sign In");
        }
    }, [location])
    
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

        const registerReq = { name, username, email, password };
        const signinReq = { usernameOrEmail, password };

        if(validate()){
            if(register){
                registerDB(registerReq).then((res) => {
                    console.log(res.data);
                    navigate('/sign-in');
                    window.location.reload();                   
                    //  TODO: KRUCIJALNA GRESKA SA PREMESTANJEM PUTEM TITLE UMESTO URI!!!
                    // navigate('/home');
                }).catch((err) => console.error(err));
            } else
                signinDB(signinReq).then((res) => {
                    console.log(res.data);
                    navigate('/home');
                }).catch((err) => console.error(err));
        } else
            window.alert("Mrzi me da radim vizuelnu validaciju, unesi email sa @ i neka ti se slazu sifre");
    }


  return (
    <div className='row justify-content-center mt-5'>
        <div className='col-5 card'>
            <div className='card-header h2 text-center'>
                {title}
            </div>
            <div className='card-body h4'>
                <div className='row gap-3'>
                    { register ?
                        <>
                            <div className='row'>
                                <h4 className='col-5 text-center'>Name</h4>
                                <input className='col-7' type="text" onChange={(e)=>setName(e.target.value)}/>
                            </div>
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
                                <input className='col-7' type="text" onChange={(e)=>setUsernameOrEmail(e.target.value)}/>
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
                            <button className='btn btn-success' onClick={handleClickSignIn}>{title}</button>
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