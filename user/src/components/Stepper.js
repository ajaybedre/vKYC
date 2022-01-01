import React from "react";

export default function Stepper(props) {
  const { steps, currentStep, changeStep } = props;

  function getStepperClass(step) {
    let className = "stepper-step";

    if (currentStep > step) {
      className += " step-completed";
    }

    return className;
  }

  return (
    <div className="stepper-container mb-8">
      <span className="stepper-line"></span>
      {[...Array(steps)].map((_, i) => (
        <div
          className={getStepperClass(i + 1)}
          onClick={() => {
            changeStep(i + 1);
          }}
          key={i}
        >
          {i + 1}
        </div>
      ))}
    </div>
  );
}
