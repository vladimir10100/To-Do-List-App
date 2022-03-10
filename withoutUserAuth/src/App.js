import './App.css';
import {
    Container,
    Row,
    Col,
    Card
} from 'react-bootstrap'

import React, {useEffect, useState} from 'react'

import AddToDo from './components/AddToDo';
import ToDo from './components/ToDo'
import CompletedToDo from './components/CompletedToDo'
import DeletedToDo from './components/DeletedToDo'

import axios from 'axios'


function App() {

    const [todo, SetToDo] = useState([])
    const [done, Completed] = useState([])
    const [trash, Deleted] = useState([])


    const getToDo = async () =>{
        try{
            const response = await axios.get('/api/todo/')
            const {data} = response

            const doneArray = []
            for (let i=0; i<data.length; i++){
                if (data[i].completed && !data[i].deleted){
                    doneArray.push(data[i])
                }
            }
            
            const todoArray = []
            for (let i=0; i<data.length; i++){
                if (!data[i].completed && !data[i].deleted){
                    todoArray.push(data[i])
                }
            }

            const trashArray = []
            for (let i=0; i<data.length; i++){
                if (data[i].deleted){
                    trashArray.push(data[i])
                }
            }

            Completed(doneArray)
            SetToDo(todoArray)
            Deleted(trashArray)
            

        }catch (err){
            console.log(err)
        }
    }
    useEffect(() => {
        getToDo()
    }, [])

    const addToDo = async newToDo =>{
        try{
            await axios.post('/api/todo/', newToDo)
            getToDo()   
        }catch(err){
            console.log(err)
        }
    }

    const doneToDo = async id =>{
        try{
            const item = todo.filter(item => item.id === id)[0]
            item.completed = true
            await axios.put(`/api/todo/${id}/`, item)
            getToDo()
        }catch(err){
            console.log(err)
        }
    }

    const deleteToDo = async id => {
        try{
            const item = todo.filter(item => item.id === id)[0]
            item.deleted = true
            await axios.put(`/api/todo/${id}/`, item)
            getToDo()
        }catch(err){
            console.log(err)
        }
    }
    const editToDo = async editToDo =>{
        try{
            await axios.put(`/api/todo/${editToDo.id}/`, editToDo)
            getToDo()
        }catch(err){
            console.log(err)
        }
    }

    const putBack = async id => {
        try{
            const item = done.filter(item => item.id ===id)[0]
            item.completed = false
            await axios.put(`/api/todo/${id}/`, item)
            getToDo()
        }catch(err){
            console.log(err)
        }
    }

    const deleteDoneToDo = async id => {
        try{
            const item = done.filter(item => item.id === id)[0]
            item.deleted = true
            await axios.put(`/api/todo/${id}/`, item)
            getToDo()
        }catch(err){
            console.log(err)
        }

    }

    const greatPutBack = async id => {
        try{
            const item = trash.filter(item => item.id ===id)[0]
            item.deleted = false
            await axios.put(`/api/todo/${id}/`, item)
            getToDo()
        }catch(err){
            console.log(err)
        }
    }

    const greatDelete = async id =>{
        try{
            await axios.delete(`/api/todo/${id}/`)
            getToDo()
        }catch(err){
            console.log(err)
        }
    }








    return ( 
        <div className='wrapper'>
            <Container className='border-dark border-radius rounded p-3 container'>
                <Row>

                    <Col className='col-3'>
                        <Card className='addBox'>
                            <AddToDo addToDo={addToDo} />
                        </Card>
                        <Row>
                            <Col className='pt-4'>
                                <Card className='p-2'>
                                    <h5>Deleted Tasks</h5>
                                    <hr className='my-0 mb-1' />
                                    {trash.map((item, index) => (
                                        <DeletedToDo key={index} id={item.id} title={item.title} description={item.description}
                                        greatPutBack={greatPutBack} greatDelete={greatDelete} />
                                    ))}
                                </Card>
                            </Col>
                        </Row>
                    </Col>




                    <Col className='col-6'>
                        <Card>
                            <div className='p-2 text-center'>
                                <h3><strong>Django Rest Framework x React</strong></h3>
                                <hr className='my-0 mb-1' />
                            </div>
                            {todo.map((item, index) => (
                                <ToDo key={index} id={item.id} title={item.title} description={item.description} 
                                doneToDo={doneToDo} deleteToDo={deleteToDo} editToDo={editToDo} />
                            ))}
                        </Card>
                    </Col>




                    <Col className='col-3'>
                        <Card>
                            <div className='p-2'>
                                <h5>Completed Tasks</h5>
                                <hr className='my-0 mb-1' />
                            </div>
                            {done.map((item, index) => (
                                <CompletedToDo key={index} id={item.id} title={item.title} description={item.description}
                                putBack={putBack} deleteDoneToDo={deleteDoneToDo} /> 
                            ))}
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>


    );
}

export default App;
