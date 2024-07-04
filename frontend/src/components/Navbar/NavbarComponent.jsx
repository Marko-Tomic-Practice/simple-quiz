import React from 'react'

const NavbarComponent = () => {
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
    
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Administration
            </a>
            <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <li><a className="dropdown-item" href="/add-questions">Add questions</a></li>
              <li><a className="dropdown-item" href="/edit-questions">Edit questions</a></li>
              <li><a className="dropdown-item" href="/delete-questions">Delete questions</a></li>
            </ul>
          </li>

        </ul>
      </div>
    </div>
  </nav>
  )
}

export default NavbarComponent