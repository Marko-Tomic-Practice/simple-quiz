import React, { useEffect, useState } from 'react'
import NavbarComponent from '../Navbar/NavbarComponent'
import { getAllQuestionsDB, getQuestionByIdDB, removeQuestionDB } from '../../services/QuestionService';
import "./EditQuestionComponent.css"
import { useNavigate } from 'react-router-dom';



const EditQuestionsComponent = () => {

    const [questions, setQuestions] = useState([]);
    
    const navigate = useNavigate();

    useEffect(()=> {
        getAllQuestions();
    }, []);

    function getAllQuestions(){
        getAllQuestionsDB().then((response) => {
            setQuestions(response.data);
            // console.log(response.data);
        }).catch((err) => console.error(err));
    }

    function handleEdit(id){
        // console.log(id);

        navigate('/edit-questions/'+id);

        // getQuestionByIdDB(id).then((response) => {
        //     console.log(response.data);
        // }).catch((err) => console.error(err));
    }

    function handleDelete(id){
        removeQuestionDB(id).then(() => {
            getAllQuestions();
        }).catch((err) => console.error(err));
    }

  return (
    <div>
        <NavbarComponent/>
        <br/> <br/> <br/>
        <div className='row'>
            <div className='col-md-3'></div>
            <div className="col-md-6 card">
                <div className="card-header h2">
                    Questions: 
                </div>
                <div className="card-body">
                        {
                            questions.map((question,index) =>
                                <div key={question.id}>
                                    <div className='row gap-2'>  
                                        <h4 className='col'>{index+1}.{' ' + question.qtext}</h4>
                                        <button className='btn btn-secondary col-2' onClick={() => handleEdit(question.id)}>Edit</button>
                                        <button className='btn btn-danger col-2' onClick={() => handleDelete(question.id)}>Delete</button>
                                    </div> <br/>
                                </div>
                            )
                        }
                </div>
                <div className="card-footer">
                
                </div>
            </div>
        </div>

    </div>
  )
}

export default EditQuestionsComponent