import React from 'react'
import {Card, Button, Form} from 'react-bootstrap'



const CompletedToDo = ({id, title, description, putBack, deleteDoneToDo}) => {
    return (
        <div className='p-2'>
            <Card className='p-2 completeToDo'>
                <p><strong>{title}</strong></p>
                <hr className='m-0 mb-2' />
                <p>{description}</p>
                <Form className='text-end'>
                    <Button className='col-3 mx-1' variant='btn btn-outline-warning' size='sm' onClick={()=>{putBack(id)}}  />
                    <Button className='col-3' variant='btn btn-outline-dark' size='sm' onClick={()=> {deleteDoneToDo(id)}}/>
                </Form>
            </Card>
        </div>
    )
}

export default CompletedToDo