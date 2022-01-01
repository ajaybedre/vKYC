import React from "react";
import Stepper from "./Stepper";

const steps = 3;

export default function Login() {
  const [aadhaarNumber, setAadhaarNumber] = React.useState("");
  const [OTP, setOTP] = React.useState("");

  const [currentStep, setCurrentStep] = React.useState(2);

  const handleAadhaarNumberChange = (e) => {
    setAadhaarNumber(e.target.value);
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
              onClick={handleAadhaarNumberChange}
            ></input>
            <button
              className="btn mt-4 btn-gradient"
              onClick={() => setCurrentStep(2)}
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
              onClick={handleOTPChange}
              disabled={currentStep !== 2}
            ></input>
            <button
              className={
                "btn mt-4 " + (currentStep === 2 ? "btn-gradient" : "")
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
                <div className="bank-option">State Bank of India</div>
                <div className="bank-option">HDFC Bank</div>
                <div className="bank-option">ICICI Bank</div>
                <div className="bank-option">Bank of Baroda</div>
                <div className="bank-option">Axis Bank</div>
                <div className="bank-option">Yes Bank</div>
                <div className="bank-option">Punjab National Bank</div>
                <div className="bank-option">Union Bank of India</div>
                <div className="bank-option">Canara Bank</div>
            </>
        )}
      </div>
    </div>
  );
}
