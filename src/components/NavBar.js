import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const NavBar = (props) => {
    const [form, setForm] = useState("");
    const [select, setSelect] = useState("people");
    const navigate = useNavigate();


    const onSubmitHandler = (event) => {
        event.preventDefault();
        console.log(`select: ${select} Form:${form}`)
        navigate(`/${select}/${form}`);
    }


    return (
        <div>
            <div className="w-100 p-2 d-flex justify-content-around border border-bottom">
                <Link to="/" className="btn btn-primary">Main</Link>
                <Link to="/people" className="btn btn-success">People</Link>
                <Link to="/planets" className="btn btn-danger">Planets</Link>
            </div>
            <form onSubmit={onSubmitHandler}>
                <label>Search For:</label>
                <select name="search" onChange={(event) => setSelect(event.target.value)}>
                    <option value="people">People</option>
                    <option value="planets">Planets</option>
                </select>
                <label className="mx-3">ID:</label>
                <input type="text" onChange={(event) => setForm(event.target.value)} />
                <button className="mx-3 btn btn-primary" type="submit">Search</button>
            </form>
        </div>
    )
}

export default NavBar;