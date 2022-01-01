import React from 'react';

export default function Card(props) {
    const {title, description, handleClick} = props;

    return (
        <div className="card" onClick={handleClick}>
            <div className="card-line"></div>
            <div className="card-header">
                <h3>{title}</h3>
            </div>
            <div className="card-body">
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam, doloremque, eaque, eius, eveniet fugiat ipsam laboriosam molestiae nam natus neque nisi obcaecati quae quisquam quod ratione reiciendis repellat saepe sed sequi sint sit tempora totam voluptate voluptatum!</p>
            </div>
        </div>
    );
}