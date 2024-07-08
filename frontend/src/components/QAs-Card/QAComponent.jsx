import React, { useState } from 'react'
import NavbarComponent from '../Navbar/NavbarComponent'
import TestComponent from '../TestComponent/TestComponent';

const QAComponent = () => {
    
    const [question, setQuestion] = useState("");
    const [answers, setAnswers] = useState([]);
    const [count, setCount] = useState(0);
    const [foos, setFoos] = useState([]);

    const [test1, setTest1] = useState("");
    const [test2, setTest2] = useState([]);

    function handlePlusClick(){
        setCount(count+1);
        //console.log("Count: "+ count);
        
        setFoos(v=>[...v, count]);
        //console.log(foos);
    }

    function handleQuestionChange(e){
        setQuestion(e.target.input);
    }

    function handleSave(e){
        setTest2(e.target.value);

        console.log(test2);
    }

    function handleAnswerChange(test1) {
        // console.log(e);
        // console.log(e.target.value);
        // setTest1(e.target.value);

        setTest2([...test2, test1]);

        console.log(test2);
        
    }
// console.log("Foo: "+foo), <TestComponent key={foo} counter={foo} value = {val}/>
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
                    onChange={handleQuestionChange}
                />
                </div>
                <div className="card-body">
                    <div className='row'>
                        {
                            foos.map((foo)=> (
                                <div key={foo}>
                                    <h5 className="card-title col-md-3">{
                                        foo + 1                         
                                        }. Answer: 
                                    </h5>
                                    <input type="text" key={foo} className='col-md-8' 
                                    onBlur={(e)=> {
                                                   setTest1(e.target.value);
                                                   handleAnswerChange(test1);
                                                   }}/>
                                </div>
                            ))
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