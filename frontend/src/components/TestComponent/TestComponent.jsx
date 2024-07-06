import React from 'react'

const TestComponent = (props) => {

  return (
    <div>
        <h5 className="card-title col-md-3">{
               props.counter + 1                         
            }. Answer: 
        </h5>
        <input type="text" className='col-md-8'/>
    </div>
  )
}

export default TestComponent