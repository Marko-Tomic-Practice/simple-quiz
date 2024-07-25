import React, { useEffect, useState } from 'react'
import NavbarComponent from '../Navbar/NavbarComponent'
import { useParams } from 'react-router-dom'
import { getQuestionByIdDB } from '../../services/QuestionService';

const EditQuestionComponent = () => {

    const [QAresponse, setQAresponse] = useState({});
    const [qText, setQtext] = useState("");
    const [answers, setAnswers] = useState([]);


    const { id } = useParams();
    
     useEffect(() => {
        getQuestionById(id);
    }, [id]);

    function getQuestionById(id){
        getQuestionByIdDB(id).then((response) => {
            // console.log(response.data);
         setQAresponse(response.data);
         setQtext(response.data.qtext);
         setAnswers(response.data.answers);
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
                    Question: 
                </div>
                <h4>{qText}</h4>
                {
                    answers.map((ans) => 
                        <h5 key={ans.id}>{ans.atext}</h5>
                    )
                }
                <div className="card-body">
                        
                </div>
                <div className="card-footer">
                
                </div>
            </div>
        </div>

    </div>
  )
}

export default EditQuestionComponent