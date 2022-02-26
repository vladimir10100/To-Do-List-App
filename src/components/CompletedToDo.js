import React from 'react'
import {Card, Col, Row, Button, Form} from 'react-bootstrap'
import'../App.css'

const CompletedToDo = () => {
    return (
        <div className='p-2'>
            <Card className='p-2 completeToDo'>
                <p>taskTitle</p>
                <hr className='m-0 mb-2' />
                <p>taskDescription</p>
                <Form className='text-end'>
                    <Button className='col-3 mx-1' variant='btn btn-outline-primary' size='sm' />
                    <Button className='col-3' variant='btn btn-outline-dark' size='sm' />
                </Form>
            </Card>
        </div>
    )
}
export default CompletedToDo;