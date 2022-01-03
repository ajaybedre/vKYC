import React from "react";
import Stepper from "./Stepper";
import { useAppContext } from "../App";
import { useNavigate } from "react-router-dom";

const steps = 4;

const banks = [
  "State Bank of India",
  "HDFC Bank",
  "ICICI Bank",
];

export default function Login() {
  const {aadhaarNumber, setAadhaarNumber, bank, setBank} = useAppContext();
  const [OTP, setOTP] = React.useState("");

  const [currentStep, setCurrentStep] = React.useState(1);

  const navigate = useNavigate();

  const handleAadhaarNumberChange = (e) => {
    setAadhaarNumber(e.target.value);
  };

  const handleAadhaarSubmit = () => {
    setCurrentStep(2);
  };

  const handleOTPChange = (e) => {
    setOTP(e.target.value);
  };


  function getCardTitle() {
    switch (currentStep) {
      case 1:
        return "Enter Aadhaar Number";
      case 2:
        return "Enter OTP";
      case 3:
        return "Select your bank";
      case 4:
        return "Enter your account details";
      default:
        return "";
    }
  }

  return (
    <div className="main flex-col">
      <Stepper
        steps={steps}
        currentStep={currentStep}
        changeStep={setCurrentStep}
      />
      <div className="login-card">
        <div className="card-header justify-center">
          <h2 className="color-black">{getCardTitle()}</h2>
        </div>

        {/* 1 */}
        {currentStep === 1 && (
          <>
            <input
              placeholder="Enter Aadhaar"
              type="number"
              value={aadhaarNumber}
              onChange={handleAadhaarNumberChange}
            ></input>
            <button
              className="btn mt-4 btn-gradient"
              onClick={handleAadhaarSubmit}
            >
              Send OTP
            </button>
          </>
        )}

        {/* 2 */}
        {currentStep === 2 && (
          <>
            <input
              placeholder="Enter OTP"
              type="number"
              value={OTP}
              onChange={handleOTPChange}
            ></input>
            <button
              className={
                "btn mt-4 btn-gradient"
              }
              onClick={() => setCurrentStep(3)}
            >
              Submit
            </button>
          </>
        )}

        {/* 3 */}
        {currentStep === 3 && (
            <>
              {banks.map((bank, i) => (
                <div className="bank-option" key={i} onClick={() => {
                  setBank(bank);
                  setCurrentStep(4);
                }}>{bank}</div>
              ))}
            </>
        )}

        {/* 4 */}
        {currentStep === 4 && (
          <>
            <input placeholder="Enter Username"></input>
            <input placeholder="Enter Password" className="mt-8" type="password"></input>
            <button className="btn mt-4 btn-gradient" onClick={() => navigate('/dashboard')}>Submit</button>
          </>
        )}
      </div>
    </div>
  );
}
