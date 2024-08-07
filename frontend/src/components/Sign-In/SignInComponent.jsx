import React, { useState } from 'react'
import SignInCardComponent from './SignInCardComponent';

const SignInComponent = (props) => {
      
    return (
    <SignInCardComponent title = {props.title}/>
  )
}

export default SignInComponent