import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/style.css';
import { useNavigate } from 'react-router';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';


const Register = () => {

    let navigate = useNavigate();
    
    const handleSubmit = async(e) => {
        e.preventDefault();

        const {username, password, email, fullName} = e.target.elements;

        const res = await axios.post('https://regauth1.herokuapp.com/new-user', {
                username: username.value,
                password: password.value,
                email: email.value,
                fullName: fullName.value,
            })
            
            console.log(res);

            if(res.data.status === 200){
                alert('Successfully Signed Up :)')

                setTimeout(() => {
                    navigate(`/adminPanel/${res.data.token}`)
                }, 1000)} else {
                    alert('This username is taken, please try again')
                }
            }

    useEffect(() => {
        handleSubmit()
    }, []);

    return (
        <article>
            <h1>Sign Up</h1>

            <form onSubmit={handleSubmit}>
                <label htmlFor='fullName'>Full Name</label>
                <input type="fullName" name='fullName' placeholder="FullName" required minLength={1}/>

                <label htmlFor='username'>Username</label>
                <input type="username" name='username' placeholder="username" required minLength={1}/>

                <label htmlFor='email'>Email</label>
                <input type="email" name='email' placeholder="name@example.com" required minLength={1}/>
               
                <label htmlFor='password'>Password</label>
                <input type='password' name='password' placeholder='Password' required minLength={1}/>

                <input className='form-btn btn btn-dark' type='submit' value='Sign Up'/>
            </form>

            <div className='to-register'>
                <p>Do you have an account ?</p>
                <Link to='/'>Log In</Link>
            </div>
        </article>
    );
};

export default Register;