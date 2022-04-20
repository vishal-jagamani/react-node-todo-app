import Addtodo from './addtodo';
import Todolist from './todolist';

import React, { useEffect, useState } from 'react';
import { Cookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function Home() {
    const [data, setData] = useState([]);
    const [count, updateCount] = useState(0);
    const [update, setUpdate] = useState({});

    const navigate = useNavigate();

    const cookie = new Cookies();
    const cname = cookie.get("cname");

    useEffect(() => {
        if (cname === undefined) {
            navigate("/");
        }
    }, []);

    let getData = async () => {
        const url = await fetch(`http://localhost:4000/getData`);
        const data = await url.json();
        setData(data);
    };

    useEffect(() => {
        getData();
    }, [count]);

    return (
        <div className="App bg-dark">
            <h1 className="h1 title p-3">TODO APP</h1>
            <div className="container body-container bg-dark">
                <div className="row">
                    <div className="col"><Addtodo updateCount={updateCount} count={count} update={update} /></div>
                    <div className="col"><Todolist data={data} updateCount={updateCount} count={count} setUpdate={setUpdate} /></div>
                </div>
            </div>
        </div>
    )
}

export default Home;