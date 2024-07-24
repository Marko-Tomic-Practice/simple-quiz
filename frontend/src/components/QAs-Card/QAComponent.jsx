import React, { useState } from 'react'
import NavbarComponent from '../Navbar/NavbarComponent'
import TestComponent from '../TestComponent/TestComponent';
import "./QAComponent.css"
import { addQuestion } from '../../services/QuestionService';

const QAComponent = () => {
    
    const [question, setQuestion] = useState("");
    const [answers, setAnswers] = useState([]);
    const [isSubmited, setIsSubmited] = useState(false);
    const [passed, setPassed] = useState({questionPass: false, answerAndIsCorrectPass: false, answerFillPass: false});
    const [errors, setErrors] = useState([]);
    const [res, setRes] = useState();
    const [errMessage, setErrMessage] = useState("");


    function handleQuestionChange(e){
        setQuestion(e.target.value);
    }


    function handleAddInput(){
        setAnswers([...answers, { text: '', isCorrect: false, classNamePositive: "btn btn-outline-primary positive", classNameNegative: "btn btn-outline-primary negative active"}]);
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
                return { ...answer, text: e.target.value };
            }
            return answer;
        });
        setAnswers(ansTextArray);
    }

    function handleIsActiveTrue(index){

        const ansIsCorrectArray = answers.map((answer, i) => {
            if(i === index){
                return { ...answer, isCorrect: true, classNamePositive: "btn btn-outline-primary positive active", classNameNegative: "btn btn-outline-primary negative" };
            }
            return answer;
        })

        setAnswers(ansIsCorrectArray);
    }

    function handleIsActiveFalse(index){
        
        const ansIsCorrectArray = answers.map((answer, i) => {
            if(i === index){
                
                return { ...answer, isCorrect: false, classNamePositive: "btn btn-outline-primary positive", classNameNegative: "btn btn-outline-primary negative active" };
            }
            return answer;
        })
        setAnswers(ansIsCorrectArray);
    }
    /*
    function testErrors(){
        const isCorrectList = answers.map((ans) => ans.isCorrect);
        console.log(question!== "");
        if(question!== ""){
            setPassed({...passed, questionPass: true});
            console.log(passed);
            if(answers.length < 3) {
                setPassed({...passed, answerAndIsCorrectPass: false});
                return(
                    <h3>You need at least 3 anwers!</h3>
                );
            } else if(!isCorrectList.includes(true)){
                setPassed({...passed, answerAndIsCorrectPass: false});
                return (
                    <h3>You need at least one correct answer!</h3>
                );
            } else{
                setIsSubmited(false);
            }
            setPassed({...passed, answerAndIsCorrectPass: true});
        } else {
            setPassed({...passed, questionPass: false});
            return <h3>Add question first!</h3>;
        }
          
    }
    */
    function validation(){

        const isCorrectList = answers.map((ans) => ans.isCorrect);
        const texts = answers.map((el) => el.text);

        const errorList = texts.map((txt, i) => {
            if(txt.trim() === ''){
                return i;
            }
            return null;

        });
        setErrors(errorList);

        const isNull = (x) => x === null;
        
        if(question!== ""){
            
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

/*
    function validate(){
        const texts = answers.map((el) => el.text);

        const errorList = texts.map((txt, i) => {
            if(txt.trim() === ''){
                return i;
            }
            return null;

        });
        setErrors(errorList);
        // console.log(errorList);
        // console.log(errorList.includes(!null));
        // console.log(errorList.some())

        const isNull = (x) => x === null;
        // console.log(errorList.every(isNull));
        if(errorList.every(isNull)){
            setPassed({...passed, answerFillPass: true});
        } else {
            setPassed({...passed, answerFillPass: false});
        }
    }
        */
        
    function handleSubmit(){
        setIsSubmited(true);
        // testErrors();
        // setRes(testErrors());
        // console.log(res);
        // validate();
        // console.log(passed);
        // console.log(answers);

        let QAPayload = {question, answers};
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
                            value={ans.text}
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
                 {   isSubmited && <h3>{errMessage}</h3>    }
                </div>
            </div>
        </div>
    </div>
  )
}

export default QAComponent