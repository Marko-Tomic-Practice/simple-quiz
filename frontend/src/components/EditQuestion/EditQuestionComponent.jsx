import React, { useEffect, useState } from 'react'
import NavbarComponent from '../Navbar/NavbarComponent'
import { useParams } from 'react-router-dom'
import { getQuestionByIdDB } from '../../services/QuestionService';

const EditQuestionComponent = () => {

    const [QAresponse, setQAresponse] = useState({});
    const [qtext, setQtext] = useState("");
    const [newQtext, setNewQtext] = useState("");
    const [answers, setAnswers] = useState([]);
    const [isSubmited, setIsSubmited] = useState(false);
    const [errors, setErrors] = useState([]);


    const { id } = useParams();
    
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

    function handleNewQuestion(e){
        setNewQtext(e.target.value);
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
                        {/* <span className='errMsg'>{index === errors[index] && "Please fill answer!"}</span> */}
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
        // setErrors([...errors, null]);
        // setIsSubmited(false);
    }

    function handleRemoveClick(index){
        const newArray = [...answers];
         
        newArray.splice(index, 1);
        setAnswers(newArray);
    }

    function handleSaveChanges(){
        console.log(answers);
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
                    onChange={(e) => handleNewQuestion(e)}
                /> ?
                </div>
            
                <div className="card-body">
                    <div className='row'>  
                        {    dynamicInputs()    }                   
                    </div> <br/>
                        <button className='btn btn-primary' onClick={handleAddInput}>Add Answer</button>     
                </div>

                <div className="card-footer">
                    <button className='btn btn-success' onClick={handleSaveChanges}>Save Changes</button>
                </div>

            </div>
        </div>

    </div>
  )
}

export default EditQuestionComponent