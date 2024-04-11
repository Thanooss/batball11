import React  from "react";
import "./More.css"
export default function More(){
    return(<div className="rounded">
        <ul className="list-group pt-5">
        <li className="list-group-item list-group-item  mb-1" onclick="this.classList.toggle('active')">About Batball</li>
        <li className="list-group-item  mb-1">How to use</li>
        <li className="list-group-item  mb-1">User benefits</li>
        <li className="list-group-item  mb-1">Application features</li>
        <li className="list-group-item  mb-1">Fantasy points sytem
        </li></ul>
    </div>)
}