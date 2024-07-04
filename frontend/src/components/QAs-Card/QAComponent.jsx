import React from 'react'
import NavbarComponent from '../Navbar/NavbarComponent'

const QAComponent = () => {
  return (
    <div>
        <NavbarComponent/>
        <br/> <br/> <br/>
        <div className='row'>
            <div className='col-md-3'></div>
            <div className="col-md-6 card">
                <div className="card-header h2">
                    #1 Question
                </div>
                <div className="card-body">
                    <h5 className="card-title">Special title treatment</h5>
                </div>
                <div className="card-footer text-muted">
                    2 days ago
                </div>
            </div>
        </div>
    </div>
  )
}

export default QAComponent