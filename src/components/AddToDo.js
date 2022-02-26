import React from 'react'
import {Form, Button} from 'react-bootstrap'

const AddToDo = () =>{
    return (
        <div className='p-2'>
            <h4>addTask</h4>
            <hr className='my-0 mb-3' />
            <Form>
                <Form.Group>
                    <Form.Label>taskTitle</Form.Label>
                    <Form.Control type='text' />
                </Form.Group>
                <Form.Group>
                    <Form.Label>taskDescription</Form.Label>
                    <Form.Control as='textarea' />
                </Form.Group>
                <Button variant='btn btn-outline-dark' size='sm' type='submit' className='my-3'>addTask</Button>
            </Form>
        </div>
    )
}
export default AddToDo;