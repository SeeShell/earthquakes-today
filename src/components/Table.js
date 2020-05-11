import React from "react";
import "./Table.css"

function Table(props){
    return(
        <table className="table">
    <thead>
        <tr>
            <th><button onClick={props.handleSort}>{props.arrow}</button></th>
            <th>Magnitude</th>
            <th>Place</th>
            <th>Time</th>
            <th>Type</th>
        </tr>
    </thead>
    <tbody>
            {props.children}       
    </tbody>
</table>
    )
}

export default Table;