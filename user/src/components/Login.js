import React from "react";

export default function Login() {
    const [adhaarNumber, setAdhaarNumber] = React.useState("");

    return (
        <div className="main flex-col">
            <div className="login-card">
                <input placeholder="Enter Aadhaar" type="number"></input>
                <button className="mt-4">Send OTP</button>

                <div className="divider mt-4 mb-4"></div>

                <input placeholder="Enter OTP" type="number"></input>
                <button className="mt-4">Submit</button>

            </div>
        </div>
    )
}