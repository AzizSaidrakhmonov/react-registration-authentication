import React, { useEffect, useState } from 'react';
import '../styles/style.css';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import dateFormat from 'dateformat';
import {useNavigate, useParams} from 'react-router';
import { Iuser } from '../helpers/interfaces';

const AdminPanel = () => {
    const {token} = useParams();
    const navigate = useNavigate();

    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');
    const [ownUsername, setOwnUsername] = useState('');
    const [selected, setSelected] = useState([]);
    const [selectText, setSelectText] = useState('Select All');
    const [toggle, setToggle] = useState(false);
   
    useEffect(() => {
       axios
        .get('https://regauth1.herokuapp.com/user', {
            headers: {
                token: `${token}`
            }
        })
        .then((res) => {
            setUsers(res.data.users);
            setOwnUsername(res.data.username);
            console.log(res.data);
        })

    selected.length === users?.length ? setSelectText('Remove All') : setSelectText('Select All');

}, [token, selected, toggle])


    const handleChange = (e) => {
        const id = e.target.value;
        if(selected?.includes(id)){
            setSelected([...selected.filter((e) => e != id)]);
        } else {
            setSelected([...selected, id]);
        }
    }

    const handleClick = () => {
        if(selected.length === users?.length){
            setSelected([]);
        } else {
            const arr = new Set(users?.map(e => e._id));
            setSelected([...Array.from(arr)]);
        }
    }

    const handleBlock = () => {
        axios
            .put(`https://regauth1.herokuapp.com/user`, 
                {
                    arrId: selected,
                    status: false,
                },
                {
                    headers: {
                        'token':`${token}`
                    }
                }
            )
            .then((res) => {
                if(res.data.status === 200) {
                    setToggle(!toggle);
                } else if (res.data.status === 401) {
                    alert('token is invalid');
                    navigate('/')
                } else if (res.data.status === 400) {
                    alert(res.data.message);
                    navigate('/');
                }
            });
    }

    const handleUnblock = () => {
        axios
            .put(`https://regauth1.herokuapp.com/user`, 
                {
                    arrId: selected,
                    status: true,
                },
                {
                    headers: {
                        token: `${token}`,
                    }
                }
            )
            .then((res) => {
                if(res.data.status === 200) {
                    setToggle(!toggle);
                } else if (res.data.status === 401){
                    alert('token is invalid');
                    navigate('/');
                }
            });
    }

    const handleDelete = () => {
        axios
            .delete(`https://regauth1.herokuapp.com/user?arrId=${selected}`, {
                headers: {
                    'token': `${token}`
                }
            })
            .then((res) => {
                if(res.data.status === 200){
                    setToggle(!toggle);
                } else if (res.data.status === 401){
                    alert('token is invalid');
                    navigate('/');
                } else if (res.data.status === 400) {
                    alert(res.data.message);
                    navigate('/')
                }
            });
        }

    return (
        <main className='admin-panel'>
            <header className='admin-panel__header'>
                <form className='admin-panel__form'>
                    <input  
                        type='text' 
                        placeholder='search by username...' 
                        className='admin-panel__search' 
                        onChange={(e) => setSearch(e.target.value)}
                        value={search}
                    />
                </form>

                <div className='action-buttons'>
                    <button
                        className='btn-danger'
                        onClick={handleBlock}
                    >
                        Block
                    </button>
                    <LockOpenIcon 
                        className='btn-success' 
                        onClick={handleUnblock}
                    />
                    <DeleteOutlineIcon 
                        className='btn-warning'
                        onClick={handleDelete}
                    />
                </div>

                <div className='admin-panel__logout'>
                    <button 
                        className='logout-btn btn-dark'
                        onClick={() => navigate('/')}
                    >
                        Log Out
                    </button>
                </div>
            </header>

            <section className='admin-panel__table'>
                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th>
                                <button
                                    type='button'
                                        onClick={handleClick}
                                        className='table-checkbox__all'
                                >
                                    {selectText}
                                </button>
                            </th>
                            <th>No</th>
                            <th>Id</th>
                            <th>Full Name</th>
                            <th>Username</th>
                            <th>Password</th>
                            <th>Email</th>
                            <th>Last Login Time</th>
                            <th>Registration Time</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.filter((user) => {
                             if(search == ''){
                                return user
                            } else if(user.username.toLowerCase().includes(search.toLowerCase())){
                                return user
                            }
                        }).map((e, i) => {

                            return (
                                <tr key={i}>
                                    <td>
                                        <input 
                                            className='table-checkbox'
                                            type='checkbox' 
                                            role='switch'
                                            value={e._id}
                                            onChange={handleChange}
                                            checked={selected.includes(e._id)}  
                                        />
                                    </td>
                                    <td>{i+1}</td>
                                    <td>{e._id}</td>
                                    <td>
                                    {e.fullName}
                                    {e.username === ownUsername ? (
                                        <span className='admin-himself'>Admin</span>
                                    ) : (
                                        ''
                                    )}</td>
                                    <td>{e.username}</td>
                                    <td>{e.password}</td>
                                    <td>{e.email}</td>
                                    <td>
                                        {dateFormat(e.lastLogin, 'mmmm dS, yyyy, h:MM TT')}
                                    </td>
                                    <td>
                                        {dateFormat(
                                            e.registrationDate,
                                            "mmmm dS, yyyy, h:MM TT"
                                        )}
                                    </td>
                                    <td className={`${e.status ? "active" : "block"}`}>
                                        {e.status ? "Active" : "Blocked"}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </section>
            
        </main>
    );
};

export default AdminPanel;