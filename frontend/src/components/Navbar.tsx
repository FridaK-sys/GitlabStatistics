import React from 'react';
import '../App.css';
import { useState } from 'react';


export function Navbar() {

    //Planen for koden er å lagre repoet og nøkkelen som skrives inn i input-feltene. 
    //Har foreløpig tenkt at det går an å bruke useState og så lagre det i localstorage. 

    function Repo() {
        const [repo, setRepo] = useState("");
        return repo;
    }

    function handleClick() {
        
    }

    return (
        < div className="App-header">
        Her kommer en logo
        <div>
            Gitlab Repo:
            <input style={{width: "300px", height:"25px"}}
            id="repo"
            name="repo"
            />
        </div>
        <div>
            Access Token: 
            <input style={{width: "180px", height:"25px"}}
            id="access_token"
            type="text"
            name="acces_token"
            />
        </div>
        <button id='navbar-button' onClick={handleClick}>
            Kjør da
        </button>
        </div >
    );
}