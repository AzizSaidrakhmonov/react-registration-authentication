import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminPanel from './components/AdminPanel';
import Login from './components/Login';
import Register from './components/Register';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login/>} />
                <Route path='/register' element={<Register/>} />
                <Route path='/adminPanel/:token' element={<AdminPanel/>} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;