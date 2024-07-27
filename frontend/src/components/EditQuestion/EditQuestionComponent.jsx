import React, { useEffect, useState } from 'react'
import NavbarComponent from '../Navbar/NavbarComponent'
import { useNavigate, useParams } from 'react-router-dom'
import { editQuestionDB, getQuestionByIdDB } from '../../services/QuestionService';

const EditQuestionComponent = () => {

    const [QAresponse, setQAresponse] = useState({});
    const [qtext, setQtext] = useState("");
    const [answers, setAnswers] = useState([]);
    const [isSubmited, setIsSubmited] = useState(false);
    const [errors, setErrors] = useState([]);
    const [errMessage, setErrMessage] = useState("");


    const { id } = useParams();
    const navigate = useNavigate();
    


    //  TODO - PROBATI ASIHRONO UCITAVANJE!
    useEffect(() => {
        getQuestionById(id);
    }, [id]);

    function getQuestionById(id){
        getQuestionByIdDB(id).then((response) => {
            console.log(response.data);
         setQAresponse(response.data);
         setQtext(response.data.qtext);
         setAnswers(response.data.answers);
        }).catch((err) => console.error(err));
    }

    function handleQuestionChange(e){
        setQtext(e.target.value);
    }

    function handleChangeTrueClass(index){
        if(answers[index].correctAnswer){
            return "btn btn-outline-primary positive active";
        } else {
            return "btn btn-outline-primary positive";
        }
    }

    function handleChangeFalseClass(index){
        if(answers[index].correctAnswer){
            return "btn btn-outline-primary negative";
        } else {
            return "btn btn-outline-primary negative active";
        }
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
                return { ...answer, correctAnswer: true };
            }
            return answer;
        })

        setAnswers(ansIsCorrectArray);
    }

    function handleIsActiveFalse(index){
        
        const ansIsCorrectArray = answers.map((answer, i) => {
            if(i === index){
                
                return { ...answer, correctAnswer: false };
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

    function dynamicInputs(){
        return(
            
            answers.map((ans, index) => (
                <div key={index}>
                    <h5>{index+1}. Answer:</h5>
                    <div className='row'>
                        <input
                            className={'col-md-6 inputs'}
                            type="text"
                            defaultValue={ans.atext}
                            onChange={(e) => handleInputChange(index, e)}
                        />
                        
                        <button className='btn btn-danger col-sm-1' onClick={()=>handleRemoveClick(index)}>X</button>
                        <span className='errMsg'>{index === errors[index] && "Please fill answer!"}</span> 
                    </div>
                    <div className='row'>
                        <h6>Is the question correct?</h6>
                        <div className="btn-group col-sm-1" role="group" aria-label="Basic outlined button group"> 
                            <button type="button" className={handleChangeTrueClass(index)} onClick={()=>handleIsActiveTrue(index)}>✔️</button>
                            <button type="button" className={handleChangeFalseClass(index)} onClick={()=>handleIsActiveFalse(index)}>❌</button>
                        </div>
                    </div>
                </div>
            )) 
        );
    }
    
    function handleAddInput(){
        setAnswers([...answers, { atext: '', correctAnswer: false}]);
        setErrors([...errors, null]);
        setIsSubmited(false);
    }

    function handleRemoveClick(index){
        const newArray = [...answers];
         
        newArray.splice(index, 1);
        setAnswers(newArray);
        setIsSubmited(false);
    }

    function handleSaveChanges(){
        setIsSubmited(true);
        
        const QAPayload = {qtext, answers};

        if(validation()){
            editQuestionDB(id, QAPayload).then(() => {
                navigate(-1);
            }).catch((err) => console.error(err));
        }
        
        // console.log(validation());
        // console.log(qtext);
        // console.log(answers);
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
                    defaultValue={qtext}
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
                    <div className='row gap-2'>
                        <button className='btn btn-success col-2' onClick={handleSaveChanges}>Save Changes</button>
                        <button className='btn btn-secondary col-2' onClick={() => navigate(-1)}>Back</button>
                    </div>
                    <div className='row'>
                    {   isSubmited && <h3>{errMessage}</h3>    }
                    </div>
                </div>

            </div>
        </div>

    </div>
  )
}

export default EditQuestionComponent