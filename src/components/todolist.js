import '../index.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

function Todolist({ data, updateCount, count, setUpdate }) {

    const [cookies, setCookie, removecCookie] = useCookies(['cookie-name']);

    console.log(data);
    const navigate = useNavigate();

    let updateData = (id, name, date) => {
        setUpdate({ id, name, date });
    };

    let deleteTask = (e) => {
        console.log(e);
        var id = e;
        console.log(id);
        var payload = {
            id,
        };

        fetch("http://localhost:4000/deleteTask", {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "content-type": "application/json",
            },
            body: JSON.stringify(payload),
        });
        updateCount(count + 1);
    }

    //logout function
    let logout = () => {
        document.cookie = "cname" + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        navigate("/");
    }

    return (

        <div className="tablelist">
            <nav aria-label="Page navigation example">
                <ul class="pagination">
                    <li class="page-item">
                        <a class="page-link" href="#" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                            <span class="sr-only"></span>
                        </a>
                    </li>
                    <li class="page-item"><a class="page-link" href="#">1</a></li>
                    <li class="page-item"><a class="page-link" href="#">2</a></li>
                    <li class="page-item"><a class="page-link" href="#">3</a></li>
                    <li class="page-item">
                        <a class="page-link" href="#" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                            <span class="sr-only"></span>
                        </a>
                    </li>
                </ul>
            </nav>
            <br /><button onClick={logout} className="btn btn-primary logout-btn">Log Out</button>
            <br /><p className="h1">Tasks</p>
            <table className="table table-dark table-hover" id="tasklist">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Work</th>
                        <th scope="col">Date</th>
                        <th scope="col">Completed</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((listValue, index) => {
                        return (
                            <tr key={index}>
                                <td>{listValue.id}</td>
                                <td>{listValue.task}</td>
                                <td>{listValue.date.slice(0, 10)}</td>
                                <td><button className="btn btn-primary" id="updateBtn" onClick={() => updateData(listValue.id, listValue.task, listValue.date.slice(0, 10))}>Update</button>{" "}
                                    <button className="btn btn-warning" id="updateBtn" onClick={() => deleteTask(listValue.id)}>Delete</button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default Todolist;