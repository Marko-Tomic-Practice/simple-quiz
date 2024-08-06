import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const NavbarComponent = () => {
  
  const navigate = useNavigate();
  const [isSignedIn, setIsSignedIn] = useState(false);

  function handleSignIn(){
    navigate('/sign-in');
  }

  return (
    <nav className="navbar navbar-expand-xl navbar-light bg-light">
    <div className="container-fluid">
      
      <a className="navbar-brand" href="/home">Quiz</a>
      
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarWithDropdown" aria-controls="navbarWithDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      
      <div className="collapse navbar-collapse show" id="navbarWithDropdown">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="/home">Home</a>
          </li>
          {
            isSignedIn &&
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Administration
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  <li><a className="dropdown-item" href="/add-questions">Add questions</a></li>
                  <li><a className="dropdown-item" href="/edit-questions">Edit questions</a></li>
                </ul>
            </li>
          }
        </ul>
      </div>
      <button className="btn btn-warning me-4" onClick={handleSignIn}>Sign-In</button>
    </div>
  </nav>
  )
}

export default NavbarComponent