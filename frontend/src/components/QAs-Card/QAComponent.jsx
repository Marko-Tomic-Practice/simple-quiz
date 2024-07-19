import React, { useState } from 'react'
import NavbarComponent from '../Navbar/NavbarComponent'
import TestComponent from '../TestComponent/TestComponent';
import "./QAComponent.css"

const QAComponent = () => {
    
    const [question, setQuestion] = useState("");
    const [answers, setAnswers] = useState([]);
    const [isSubmited, setIsSubmited] = useState(false);
    const [passed, setPassed] = useState(false);
    const [errors, setErrors] = useState([]);


    function handleQuestionChange(e){
        setQuestion(e.target.value);
    }


    function handleAddInput(){
        setAnswers([...answers, { text: '', isCorrect: false}]);
        setErrors([...errors, null]);
    }

    function handleRemoveClick(index){
        const newArray = [...answers];
         
        newArray.splice(index, 1);
        setAnswers(newArray);
    }

   function handleInputChange(index, e){

        const ansTextArray = answers.map((answer, i) => {
            if(i === index){
                return { ...answer, text: e.target.value };
            }
            return answer;
        });
        setAnswers(ansTextArray);
    }

    function handleIsActiveChange(e, index){

        const ansIsCorrectArray = answers.map((answer, i) => {
            if(i === index){
                return { ...answer, isCorrect: true};
            }
            return answer;
        })
        setAnswers(ansIsCorrectArray);
    
    }

    function testErrors(){

        validate();

        if(answers.length > 2) {
            
            console.log("Passed");

        } else {
            return(
                <h3>You need at least 3 anwers!</h3>
            );
        }
    }
    
    function validate(){
        const texts = answers.map((el) => el.text);
        console.log(texts);

        const errorList = texts.map((txt, i) => {
            if(txt.trim() === ''){
                return i;
            }
            return null;
        });
        setErrors(errorList);

        // console.log(errors);
       
    } 
        
    function handleSubmit(){
        setIsSubmited(true);
        testErrors();
        // console.log(errors);
    }

    function dynamicInputs(){
        return(
            
            answers.map((ans, index) => (
                <div key={index}>
                    <h5>{index+1}. Answer:</h5>
                    <div className='row'>
                        <input
                            className={'col-md-6 inputs'}
                            type="text"
                            value={ans.text}
                            onChange={(e) => handleInputChange(index, e)}
                        />
                        
                        <button className='btn btn-danger col-sm-1' onClick={()=>handleRemoveClick(index)}>X</button>
                        <span>{index === errors[index] && errors[index] && "Please fill answer"}</span>
                    </div>
                    <div className='row'>
                        <h6>Is the question correct?</h6>
                        <div className="btn-group col-sm-1" role="group" aria-label="Basic outlined button group"> 
                            <button type="button" className="btn btn-outline-primary positive" onClick={(e)=>handleIsActiveChange(e, index)}>✔️</button>
                            <button type="button" className="btn btn-outline-primary  negative active">❌</button>
                        </div>
                    </div>
                    
                </div>
            )) 
        );
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
                    className='col-md-7' 
                    type="text"
                    name='question'
                    value={question}
                    onChange={(e) => handleQuestionChange(e)}
                /> ?
                </div>
                <div className="card-body">
                    <div className='row'>  
                        {    dynamicInputs()    }                        
                    </div> <br/>
                    <button className='btn btn-primary' onClick={handleAddInput}>Add Answer</button>
                </div>
                <div className="card-footer">
                <button className='btn btn-success' onClick={handleSubmit}>Submit</button>
                {/* {   isSubmited && testErrors()    } */}
                </div>
            </div>
        </div>
    </div>
  )
}

export default QAComponent