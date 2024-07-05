import React, { useState } from 'react'
import NavbarComponent from '../Navbar/NavbarComponent'

const QAComponent = () => {
    
    const [question, setQuestion] = useState("");
    const [answers, setAnswers] = useState([]);
    const [count, setCount] = useState(0);

    return (
    <div>
        <NavbarComponent/>
        <br/> <br/> <br/>
        <div className='row'>
            <div className='col-md-3'></div>
            <div className="col-md-6 card">
                <div className="card-header h2">
                Question: <input 
                    type="text"
                    name='question'
                    value={question}
                    onChange={(e) => handleQuestionChange(e)}
                />
                </div>
                <div className="card-body">
                    <div className='row'>
                        <h5 className="card-title col-md-2">{(count+1)}. Answer: </h5> 
                        <input type="text" className='col-md-9'/>
                        <button className='add-answer col-md-1'>+</button>
                    </div>
                </div>
                <div className="card-footer">
                    <button>Submit</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default QAComponent