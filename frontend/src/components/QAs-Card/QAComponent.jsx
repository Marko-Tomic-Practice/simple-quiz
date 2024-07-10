import React, { useState } from 'react'
import NavbarComponent from '../Navbar/NavbarComponent'
import TestComponent from '../TestComponent/TestComponent';

const QAComponent = () => {
    
    const [inputs, setInputs] = useState([]);
    const [question, setQuestion] = useState("");

<<<<<<< Updated upstream
    function handlePlusClick(){
        setCount(count+1);
        console.log("Count: "+ count);
        
        setFoos(v=>[...v, count]);
        console.log(foos);
    }

=======

    function handleQuestionChange(e){
        setQuestion(e.target.value);
    }

    function handleAddInput(){
        setInputs([...inputs, { value: '' }]);
    }

    function handleInputChange(index, e){
            const newInputs = inputs.map((input, i) => {
                if (i === index) {
                  return { ...input, value: e.target.value };
                }
                return input;    
        });
        setInputs(newInputs);
    }

    function handleSubmit(){
        console.log(inputs);
    }
    
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
                        {
                            foos.map((foo)=> (console.log("Foo: "+foo), <TestComponent key={foo} counter={foo}/>))
                        }
                        <div>
                            <h5 className="card-title col-md-3">{(count+1)}. Answer: </h5>
                            <input type="text" className='col-md-8'/>
                            <button className='add-answer col-md-1' onClick={handlePlusClick}>+</button>
                        </div>
=======
                    
                        {inputs.map((input, index) => (
                            <div key={index}>
                            <input
                                type="text"
                                value={input.value}
                                onChange={(e) => handleInputChange(index, e)}
                            />
                            </div>
                        ))}
>>>>>>> Stashed changes
                    </div>
                    <button onClick={handleAddInput}>Add Answer</button>
                </div>
                <div className="card-footer">
                <button onClick={handleSubmit}>Submit</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default QAComponent