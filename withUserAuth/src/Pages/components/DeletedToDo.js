import React from 'react'
import {Card, Form, Button} from 'react-bootstrap'

const DeletedToDo = ({id, title, description, greatPutBack, greatDelete}) =>{
    return (
        <div className='p-2'>
            <Card className='p-2 completeToDo'>
                <p><strong>{title}</strong></p>
                <hr className='m-0 mb-2' />
                <p>{description}</p>
                <Form className='text-end'>
                    <Button className='col-3 mx-1' variant='btn btn-outline-warning' size='sm' onClick={()=>{greatPutBack(id)}} />
                    <Button className='col-3' variant='btn btn-outline-danger' size='sm' onClick={()=> {greatDelete(id)}}/>
                </Form>
            </Card>
        </div>
    )
}

export default DeletedToDo