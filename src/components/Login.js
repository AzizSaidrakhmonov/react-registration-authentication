import React, { useState, useEffect} from 'react';
import '../styles/style.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import axios from 'axios';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Istatus } from '../helpers/interfaces';

const Login = () => {
    let navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();

        const {username, password} = e.target.elements;

        const res = await axios.post('https://regauth1.herokuapp.com/login', {
            username: username.value,
            password: password.value,
        });
        
        console.log(res);

        if(res.data.status === 200){
            alert('Successfully Logged In :)');

            setTimeout(() => {
                navigate(`/adminPanel/${res.data.token}`);
            }, 1000)} else {
                alert('User not found. Please sign up');
            }      
    }

    useEffect(() => {
        handleSubmit();
    }, []);

    return (
        <article>
            <h1>Log In</h1>

            <form onSubmit={handleSubmit}>
                <label htmlFor='username'>Username</label>
                <input type="username" name='username' placeholder="Username" required minLength={1}/>
               
                <label htmlFor='password'>Password</label>
                <input type='password' name='password' placeholder='Password' required minLength={1}/>

                <input className='form-btn btn btn-dark' type='submit' value='Login'/>

            </form>

            <div className='to-register'>
                <p>Do not have an account ?</p>
                <Link to='register'>Sign Up</Link>
            </div>
        </article>
    );
};

export default Login;