import React from "react";
import Card from "./Card";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../App";

export default function Dashboard() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [user, setUser] = React.useState({});

  const { aadhaarNumber, setAadhaarNumber } = useAppContext();

  const navigate = useNavigate();

  React.useEffect(() => {
    const checkKYC = async () => {
      setIsLoading(true);
      const { data } = await axios.post("http://localhost:5000/check-kyc", {
        aadhaarNumber: aadhaarNumber,
      });

      console.log(data);

      setUser(data);

      setIsLoading(false);
    };

    checkKYC();
  }, [aadhaarNumber]);

  if (isLoading) {
    return <div className="main">Loading...</div>;
  }

  if (!user) {
    return null;
  }
  if (user.message) {
    // No record found for this aadhaar number
    return (
      <div className="main">
        <Card
          title="Upload documents"
          handleClick={() => navigate("/dashboard/upload")}
        />
      </div>
    );
  }
  if (user.isKYCVerified) {
    // KYC verified
    return (
      <div className="main">
        <Card
          title="KYC verified"
          handleClick={() => navigate("/dashboard/upload")}
        />
      </div>
    );
  }
  if (!user.isKYCVerified) {
    // KYC not verified
    // i.e. KYC verification pending
    return (
      <div className="main">
        <Card
          title="KYC Pending"
          handleClick={() => navigate("/dashboard/upload")}
        />
      </div>
    );
  }
}
