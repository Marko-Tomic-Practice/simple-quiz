import React, { useState } from 'react'
import NavbarComponent from '../Navbar/NavbarComponent'
import TestComponent from '../TestComponent/TestComponent';
import "./QAComponent.css"

const QAComponent = () => {
    
    const [inputs, setInputs] = useState([]);
    const [question, setQuestion] = useState("");
    const [counter, setCounter] = useState(1);
    const [isActive, setIsActive] = useState([]);


    function handleQuestionChange(e){
        setQuestion(e.target.value);
    }

    function handleAddInput(){
        setInputs([...inputs, { value: '' }]);
        setCounter(counter+1);
        //console.log(counter);
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

    function handleIsActiveChange(index){
        const newIsActive = inputs.map((input, i) => {
            if (i === index) {
              return { ...input, value: true };
            }
            return isActive;    
    });
    setIsActive(newIsActive);
}

    function handleSubmit(){
        //console.log(question);
        //console.log(inputs);        
        //console.log(inputs[1]);
        //console.log(inputs[1].value);
        console.log(isActive)
    }

    function handleRemoveClick(index){
        let newArray = inputs;
        console.log(index);
        if (index > -1) { 
            newArray.splice(index, 1);
            setInputs(newArray);
         }
         console.log(newArray);
         test();
    }

    function test(){
        return(
            inputs.map((input, index) => (
                <div key={index}>
                    <h5>{index+1}. Answer:</h5>
                    <div className='row'>
                        <input
                            className='col-md-6'
                            type="text"
                            value={input.value}
                            onChange={(e) => handleInputChange(index, e)}
                        />.
                        <button className='btn btn-danger col-sm-1' onClick={()=>handleRemoveClick(index)}>X</button>
                    </div>
                    <div className='row'>
                        <h6>Is the question correct?</h6>
                        <div className="btn-group col-sm-1" role="group" aria-label="Basic outlined button group"> 
                            <button type="button" className="btn btn-outline-primary" onClick={()=>handleIsActiveChange(index)}>✔️</button>
                            <button type="button" className="btn btn-outline-primary negative active">❌</button>
                        </div>
                    </div>
                    
                </div>
            )) 
        );
    }

    /**
     * 
     * inputs.map((input, index) => (
                            <div key={index}>
                                <h5>{index+1}. Answer:</h5>
                                <div className='row'>
                                    <input
                                        className='col-md-6'
                                        type="text"
                                        value={input.value}
                                        onChange={(e) => handleInputChange(index, e)}
                                    />.
                                    <button className='btn btn-danger col-sm-1' onClick={()=>handleRemoveClick(index)}>X</button>
                                </div>
                                <div className='row'>
                                    <h6>Is the question correct?</h6>
                                    <div className="btn-group col-sm-1" role="group" aria-label="Basic outlined button group"> 
                                        <button type="button" className="btn btn-outline-primary" onClick={()=>handleIsActiveChange(index)}>✔️</button>
                                        <button type="button" className="btn btn-outline-primary negative active">❌</button>
                                    </div>
                                </div>
                                
                            </div>
                        ))
     */
    
    return (
    <div>
        <NavbarComponent/>
        <br/> <br/> <br/>
        <div className='row'>
            <div className='col-md-3'></div>
            <div className="col-md-6 card">
                <div className="card-header h2">
                Question: <input
                    className='col-md-7' 
                    type="text"
                    name='question'
                    value={question}
                    onChange={(e) => handleQuestionChange(e)}
                /> ?
                </div>
                <div className="card-body">
                    <div className='row'>  
                        {test()}
                    </div> <br/>
                    <button className='btn btn-primary' onClick={handleAddInput}>Add Answer</button>
                </div>
                <div className="card-footer">
                <button className='btn btn-success' onClick={handleSubmit}>Submit</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default QAComponent