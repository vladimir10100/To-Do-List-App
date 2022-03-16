import React, {useContext, useState} from 'react'
import {Form, Button} from 'react-bootstrap'
import AuthContext from '../../Context/AuthContext'

const AddToDo = ({addToDo}) =>{

    const {user} = useContext(AuthContext)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const addToDoHandler = e => {
        e.preventDefault()
        addToDo({
            title,
            description,
            completed:false,
            deleted: false,
            user: user.user_id
        })
        setTitle('')
        setDescription('')
    }

    return (
        <div className='p-2'>
            <h5>Add Task</h5>
            <hr className='my-0 mb-3' />
            <Form>
                <Form.Group className='mb-3'>
                    <Form.Label className='mb-0'>title</Form.Label>
                    <Form.Control type='text' value={title} onChange={e=> setTitle(e.target.value)}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label className='mb-0'>description</Form.Label>
                    <Form.Control as='textarea' value={description} onChange={e=> setDescription(e.target.value)}/>
                </Form.Group>
                    <Button variant='btn btn-outline-dark' size='sm' type='submit' className='my-3' onClick={addToDoHandler}>addTask</Button>
                
            </Form>
        </div>
    )
}
export default AddToDo;