import React from "react";
import "./Container.css";

function Container(props) {
  return (
    <div className="container">
      <div >
          <label className="search">
            search by place:{" "}
            <input
              type="text"
              value={props.search}
              onChange={props.handleSearchChange}
            />
          </label>
        </div>
        <div className={`container${props.fluid ? "-fluid" : ""}`}>
          {props.children}
        </div>
      </div>
  );
}

export default Container;
