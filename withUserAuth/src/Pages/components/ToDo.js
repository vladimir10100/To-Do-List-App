import React, {useState} from 'react'
import {Form, Card, Button, Col, Row, Modal} from 'react-bootstrap'


const ToDo = ({id, title, description, doneToDo, deleteToDo, editToDo}) => {

    
    const [show, setShow] = useState(false)

    const [newTitle, setTitle] = useState(title)
    const [newDescription, setDescription] = useState(description)

    const handleClose = () => {
        setShow(false)
        setTitle(title)
        setDescription(description)
    }

    const handleShow = () => {
        setShow(true)
        setTitle(title)
        setDescription(description)
    }
    const saveChanges = (title, description) => {
        handleClose()
        const todo = {id, title, description}
        editToDo(todo)
        setTitle(title)
        setDescription(description)
    }


    console.log(title, description)
    return (
        <div className='p-2'>
            
            <Card className='p-2 todoCard'>
                

                <Row>
                    <Col md={1} className='my-auto text-center'>
                        <Form>
                            <Button className='p-1' variant='btn btn-outline-success' size='sm' onClick={() => doneToDo(id)}/>
                        </Form>
                    </Col>
                    <Col md={9}>
                        <p><strong>{title}</strong></p>
                        <hr className='m-0 mb-2'/>
                        <p>{description}</p>
                    </Col>
                    <Col md={2} className='text-center'>
                        <Form>
                            <Button variant='btn btn-outline-primary' className='m-2' size='sm' onClick={handleShow} >Edit</Button>
                            <Button variant='btn btn-outline-dark' size='sm' onClick={()=> deleteToDo(id)}>Delete</Button>
                        </Form>
                    </Col>
                </Row>


            </Card>


            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit ToDo</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <Form.Group className='mb-3'>
                            <Form.Label className='mb-0'>title:</Form.Label>
                            <Form.Control type='text' value={newTitle} onChange={e=> setTitle(e.target.value)}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className='mb-0'>description:</Form.Label>
                            <Form.Control as='textarea' value={newDescription} onChange={e=> setDescription(e.target.value)}/>
                        </Form.Group>
                    </Form>
                </Modal.Body>


                <Modal.Footer>
                    <Button variant="btn btn-outline-secondary" size='sm' onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="btn btn-outline-dark" size='sm' onClick={() => saveChanges (newTitle, newDescription)}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    )
}

export default ToDo