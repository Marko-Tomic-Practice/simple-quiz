import React, { useState } from 'react'
import NavbarComponent from '../Navbar/NavbarComponent'
import "./QAComponent.css"
import { addQuestion } from '../../services/QuestionService';

const QAComponent = () => {
    
    const [qtext, setQtext] = useState("");
    const [answers, setAnswers] = useState([]);
    const [isSubmited, setIsSubmited] = useState(false);
    const [passed, setPassed] = useState({questionPass: false, answerAndIsCorrectPass: false, answerFillPass: false});
    const [errors, setErrors] = useState([]);
    const [res, setRes] = useState();
    const [errMessage, setErrMessage] = useState("");


    function handleQuestionChange(e){
        setQtext(e.target.value);
    }


    function handleAddInput(){
        setAnswers([...answers, { atext: '', correctAnswer: false, classNamePositive: "btn btn-outline-primary positive", classNameNegative: "btn btn-outline-primary negative active"}]);
        setErrors([...errors, null]);
        setIsSubmited(false);
    }

    function handleRemoveClick(index){
        const newArray = [...answers];
         
        newArray.splice(index, 1);
        setAnswers(newArray);
    }

   function handleInputChange(index, e){

        const ansTextArray = answers.map((answer, i) => {
            if(i === index){
                return { ...answer, atext: e.target.value };
            }
            return answer;
        });
        setAnswers(ansTextArray);
    }

    function handleIsActiveTrue(index){

        const ansIsCorrectArray = answers.map((answer, i) => {
            if(i === index){
                return { ...answer, correctAnswer: true, classNamePositive: "btn btn-outline-primary positive active", classNameNegative: "btn btn-outline-primary negative" };
            }
            return answer;
        })

        setAnswers(ansIsCorrectArray);
    }

    function handleIsActiveFalse(index){
        
        const ansIsCorrectArray = answers.map((answer, i) => {
            if(i === index){
                
                return { ...answer, correctAnswer: false, classNamePositive: "btn btn-outline-primary positive", classNameNegative: "btn btn-outline-primary negative active" };
            }
            return answer;
        })
        setAnswers(ansIsCorrectArray);
    }
    
    function validation(){

        const isCorrectList = answers.map((ans) => ans.correctAnswer);
        const atexts = answers.map((el) => el.atext);

        const errorList = atexts.map((txt, i) => {
            if(txt.trim() === ''){
                return i;
            }
            return null;

        });
        setErrors(errorList);

        const isNull = (x) => x === null;
        
        if(qtext!== ""){
            
            if(answers.length < 3) {
                setErrMessage("You need at least 3 anwers!");
                return false;
            } else if(!isCorrectList.includes(true)){
                setErrMessage("You need at least one correct answer!");
                return false;
            } else if(!errorList.every(isNull)){
                return false;
            } else{
                setIsSubmited(false);
             }

           
        } else {
            setErrMessage("Add question first!");
            return false;
        }
        return true;

    }


        
    function handleSubmit(){
        setIsSubmited(true);

        const QAPayload = {qtext, answers};
        console.log(QAPayload);
        
        if(validation()){
            // console.log("Prosao!");
            addQuestion(QAPayload).then( (res) => {
                console.log(res.data);
            }).catch((err) => console.error(err));
        }
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
                            value={ans.atext}
                            onChange={(e) => handleInputChange(index, e)}
                        />
                        
                        <button className='btn btn-danger col-sm-1' onClick={()=>handleRemoveClick(index)}>X</button>
                        <span className='errMsg'>{index === errors[index] && "Please fill answer!"}</span>
                    </div>
                    <div className='row'>
                        <h6>Is the question correct?</h6>
                        <div className="btn-group col-sm-1" role="group" aria-label="Basic outlined button group"> 
                            <button type="button" className={ans.classNamePositive} onClick={()=>handleIsActiveTrue(index)}>✔️</button>
                            <button type="button" className={ans.classNameNegative} onClick={()=>handleIsActiveFalse(index)}>❌</button>
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
                    value={qtext}
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
                 {   isSubmited && <h3>{errMessage}</h3>    }
                </div>
            </div>
        </div>
    </div>
  )
}

export default QAComponent