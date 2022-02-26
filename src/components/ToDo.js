import React from 'react'
import'../App.css'
import {Form, Card, Button, Col, Row} from 'react-bootstrap'


const ToDo = () => {
    return (
        <div className='p-2'>
            
            <Card className='p-2 todoCard'>
                <p>taskTitle</p>
                <hr className='m-0 mb-2'/>
                <p>taskDescription</p>


                <Row>
                    <Col md={2} className='my-auto text-center'>
                        <Form>
                            <Button className='p-1' variant='btn btn-outline-success' size='sm'/>
                        </Form>
                    </Col>
                    <Col md={10} className='text-end' col-2>
                        <Form>
                            <Button variant='btn btn-outline-secondary' className='m-2' size='sm'>Edit</Button>
                            <Button variant='btn btn-outline-dark' size='sm'>Delete</Button>
                        </Form>
                    </Col>
                </Row>


            </Card>

        </div>
    )
}
export default ToDo;