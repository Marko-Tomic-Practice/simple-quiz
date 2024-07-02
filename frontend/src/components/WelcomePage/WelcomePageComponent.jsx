import React from 'react'
import './WelcomePage.css'
import { useNavigate } from 'react-router-dom'

const WelcomePageComponent = () => {
    const navigate = useNavigate();

    function handleClick(){
        navigate('/home');
    }
  return (
    <div className='container'>
        <div className='display-1'>
             Welcome to the Quiz 👋
        </div>
        <button className='btn btn-primary' onClick={handleClick}>Start the Quiz</button>
    </div>
  )
}

export default WelcomePageComponent