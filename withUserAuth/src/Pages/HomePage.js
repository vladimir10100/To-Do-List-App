import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../Context/AuthContext'

import ToDo from './components/ToDo'
import AddToDo from './components/AddToDo'
import CompletedToDo from './components/CompletedToDo'
import DeletedToDo from './components/DeletedToDo'



import { Card, Col, Container, Row } from 'react-bootstrap'



const HomePage = () => {

    const {authToken, logoutUser} = useContext(AuthContext)
    const [todo, SetToDo] = useState([])
    const [done, Completed] = useState([])
    const [trash, Deleted] = useState([])




    const getToDo = async () =>{
        try{
            const response = await fetch('http://127.0.0.1:8000/api/todo/', {
                method:"GET",
                headers:{
                    'Content-Type':'application/json',
                    'Authorization': 'Bearer '+ String(authToken.access)
                }
            })
            const data = await response.json()
            if (response.status === 200){
                SetToDo(data)
            }
            else if (response.statuse === 'Unauthorized'){
                logoutUser()
            }

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


    const addToDo = async (newToDo) =>{
        try{
            await fetch('http://127.0.0.1:8000/api/todo/',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization': 'Bearer '+ String(authToken.access)
                },
                body:JSON.stringify(newToDo)
            })
            getToDo()   
        }catch(err){
            console.log(err)
        }
    }

    const editToDo = async editToDo =>{
        try{
            await fetch(`http://127.0.0.1:8000/api/todo/${editToDo.id}/`, {
                method:'PUT',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization': 'Bearer '+ String(authToken.access)
                },
                body: JSON.stringify(editToDo)
            })
            getToDo()
        }catch(err){
            console.log(err)
        }
    }


    const doneToDo = async (id) =>{
        try{
            const item = todo.filter(item => item.id === id)[0]
            item.completed = true
            await fetch(`http://127.0.0.1:8000/api/todo/${id}/`,{
                method:'PUT',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization': 'Bearer '+ String(authToken.access)
                },
                body:JSON.stringify(item)
            })
            getToDo()
        }catch(err){
            console.log(err)
        }
    }

    const deleteToDo = async (id) => {
        try{
            const item = todo.filter(item => item.id === id)[0]
            item.deleted = true
            await fetch(`http://127.0.0.1:8000/api/todo/${id}/`, {
                method:'PUT',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization': 'Bearer '+ String(authToken.access)
                },
                body:JSON.stringify(item)
            })
            getToDo()
        }catch(err){
            console.log(err)
        }
    }

    const putBack = async id => {
        try{
            const item = done.filter(item => item.id ===id)[0]
            item.completed = false
            await fetch(`http://127.0.0.1:8000/api/todo/${id}/`, {
                method:'PUT',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization': 'Bearer '+ String(authToken.access)
                },
                body: JSON.stringify(item)
            })
            getToDo()
        }catch(err){
            console.log(err)
        }
    }

    const deleteDoneToDo = async id => {
        try{
            const item = done.filter(item => item.id === id)[0]
            item.deleted = true
            await fetch(`http://127.0.0.1:8000/api/todo/${id}/`, {
                method:'PUT',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization': 'Bearer '+ String(authToken.access)
                },
                body: JSON.stringify(item)
            })
            getToDo()
        }catch(err){
            console.log(err)
        }

    }

    const greatPutBack = async id => {
        try{
            const item = trash.filter(item => item.id ===id)[0]
            item.deleted = false
            await fetch(`http://127.0.0.1:8000/api/todo/${id}/`, {
                method:'PUT',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization': 'Bearer '+ String(authToken.access)
                },
                body: JSON.stringify(item)
            })
            getToDo()
        }catch(err){
            console.log(err)
        }
    }

    const greatDelete = async id =>{
        try{
            await fetch(`http://127.0.0.1:8000/api/todo/${id}/`, {
                method:'DELETE',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization': 'Bearer '+ String(authToken.access)
                },
            })
            getToDo()
        }catch(err){
            console.log(err)
        }
    }



    return (
        <div className='home'>
            
            <Container className='border-dark border-radius rounded p-3 container'>
                    <Row>
                        <Col className='col-3'>
                            <Card>
                                <AddToDo addToDo={addToDo} />
                            </Card>
                            <Col className='pt-3'>
                                <Card className='p-2'>
                                    <h5>Deleted Tasks</h5>
                                    <hr className='my-0 mb-1' />
                                    {trash.map((item, index) => (
                                        <DeletedToDo key={index} id={item.id} title={item.title} description={item.description}
                                        greatPutBack={greatPutBack} greatDelete={greatDelete} />
                                    ))}
                                </Card>
                            </Col>
                        </Col>

                        <Col className='col-6'>

                            <Card>
                                <div className='p-2 text-center'>
                                    <h3><strong>Django Rest Framework x React</strong></h3>
                                    <hr className='my-0 mb-1' />
                                </div>
                                {todo.map((item, index) => (
                                <ToDo key={index} id={item.id} title={item.title} description={item.description}
                                doneToDo={doneToDo} deleteToDo={deleteToDo} editToDo={editToDo}/>
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
                                putBack={putBack} deleteDoneToDo={deleteDoneToDo}/> 
                                ))}
                            </Card>
                        </Col>
                    </Row>
            </Container>
        </div>
    )
}

export default HomePage