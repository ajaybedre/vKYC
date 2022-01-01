import React from "react";
import { useNavigate } from "react-router-dom";
import Card from './Card';

export default function Home() {
    const navigate = useNavigate();
    return (
        <div className="main">
            <Card title="Login" handleClick={() => navigate('/login')}/>
        </div>
    )
}