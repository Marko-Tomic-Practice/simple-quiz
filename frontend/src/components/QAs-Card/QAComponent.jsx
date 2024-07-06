import React, { useState } from 'react'
import NavbarComponent from '../Navbar/NavbarComponent'
import TestComponent from '../TestComponent/TestComponent';

const QAComponent = () => {
    
    const [question, setQuestion] = useState("");
    const [answers, setAnswers] = useState([]);
    const [count, setCount] = useState(0);
    const [foos, setFoos] = useState([]);

    function handlePlusClick(){
        setCount(count+1);
        console.log("Count: "+ count);
        
        setFoos(v=>[...v, count]);
        console.log(foos);
    }

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
                        {
                            foos.map((foo)=> (console.log("Foo: "+foo), <TestComponent key={foo} counter={foo}/>))
                        }
                        <div>
                            <h5 className="card-title col-md-3">{(count+1)}. Answer: </h5>
                            <input type="text" className='col-md-8'/>
                            <button className='add-answer col-md-1' onClick={handlePlusClick}>+</button>
                        </div>
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