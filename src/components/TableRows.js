import React from "react";

function TableRow({ quakes }) {
  return quakes.map((quake) => {
    return (
      <tr key={quake.id}>
        <td></td>
        <td>{quake.properties.mag}</td>
        <td>{quake.properties.place}</td>
        <td>{new Date(quake.properties.time).toLocaleString()}</td>
        <td>{quake.properties.type}</td>
      </tr>
    );
  });
}

export default TableRow;
