import './App.css';
import {
    Container,
    Row,
    Col,
    Card
} from 'react-bootstrap'

import AddToDo from './components/AddToDo';
import ToDo from './components/ToDo'
import CompletedToDo from './components/CompletedToDo'



function App() {
    return ( 
        <body className='body'>
            <div className='wrapper'>
                <Container className='border-dark border-radius rounded p-3 container'>
                    <Row>
                        <Col className='col-3'>
                            <Card>
                                <AddToDo/>
                            </Card>
                        </Col>
                        <Col className='col-6'>
                            <Card>
                                <div className='p-2'>
                                    <h4>Django Rest Framework x React</h4>
                                    <hr className='my-0 mb-1' />
                                </div>
                                <ToDo />
                                <ToDo />
                                <ToDo />
                            </Card>
                        </Col>
                        <Col className='col-3'>
                            <Card>
                                <div className='p-2'>
                                    <h4>completedTasks</h4>
                                    <hr className='my-0 mb-1' />
                                </div>
                                <CompletedToDo />
                                <CompletedToDo />
                                <CompletedToDo />
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </body>

    );
}

export default App;
//  {/* <>
//       <h3>Hello</h3>
//       <AddToDo />
//       <ToDo />
//       <CompletedToDo />
//     </> */}