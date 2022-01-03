import React, { useState } from "react";
import { useAppContext } from "../App";
import { create } from "ipfs-http-client";
import axios from "axios";

const files = ["Aadhaar Card", "Pan Card", "Photograph"];

const client = create("https://ipfs.infura.io:5001/api/v0");

function File(props) {
  const { fileName } = props;

  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const retrieveFile = async (e) => {
    e.preventDefault();
    try {
      setIsUploading(true);
      const data = e.target.files[0];
      const reader = new window.FileReader();
      reader.readAsArrayBuffer(data);

      reader.onloadend = async () => {
        setFile(reader.result);
        const created = await client.add(reader.result);
        console.log(created);
        const url = `https://ipfs.infura.io/ipfs/${created.path}`;
        setUrl(url);
        setIsUploading(false);
      };
    } catch (err) {
      console.log(err);
      setIsUploading(false);
      alert("Error uploading file");
    }
  };

  const removeFile = () => {
    setFile(null);
    setUrl("");
  };

  return (
    <form className="file">
      <div className="file-left">
        <div className="file-name">{fileName}</div>
        {url && (
          <div className="file-url">
            <a href={url} target="_blank" rel="noopener noreferrer">
              View file
            </a>
          </div>
        )}
      </div>
      <div className="file-right">
        {!file && (
          <>
            {isUploading ? (
              <div style={{ cursor: "default" }}>Uploading...</div>
            ) : (
              <label className="custom-file-upload">
                <input type="file" onChange={retrieveFile} />
                Upload
              </label>
            )}
          </>
        )}
        {file &&
          url.length >
            0(
              <div
                className="custom-file-upload remove-file"
                onClick={removeFile}
              >
                Remove
              </div>
            )}
      </div>
    </form>
  );
}

export default function UploadFiles() {
  const { aadhaarNumber, bank } = useAppContext();

  const [panNumber, setPanNumber] = React.useState("");

  const [longitude, setLongitude] = React.useState(null);
  const [latitude, setLatitude] = React.useState(null);
  const [ip, setIP] = useState("");

  React.useEffect(() => {
    const getIP = () => {
      axios.get("https://geolocation-db.com/json/").then((res) => {
        console.log("IPv4: ", res.data.IPv4);
        setIP(res.data.IPv4);
      });
    };

    const getLocation = () => {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          console.log("Latitude is :", position.coords.latitude);
          console.log("Longitude is :", position.coords.longitude);
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        function (error) {
          console.error("Error Code = " + error.code + " - " + error.message);
        }
      );
    };

    function init() {
      getIP();
      getLocation();
    }

    init();
  }, []);

  return (
    <div className="main flex-col justify-start">
      <h2>Upload files</h2>
      <div className="files">
        <input
          type="text"
          disabled={true}
          className="mb-4"
          placeholder="Enter Bank Name"
          value={bank}
        ></input>
        <input
          type="number"
          disabled={true}
          className="mb-4"
          placeholder="Enter Aadhaar Number"
          value={aadhaarNumber}
        ></input>
        <input
          type="text"
          className="mb-4"
          placeholder="Enter PAN Number"
          value={panNumber}
          onChange={(e) => setPanNumber(e.target.value)}
        ></input>
        {files.map((file, index) => {
          return <File fileName={file} key={index} />;
        })}
        <div>{`IP address: ${ip ? ip : "Error"}`}</div>
        <div>{`Location: ${
          longitude && latitude ? `${longitude}, ${latitude}` : "Error"
        }`}</div>

        <div className="custom-file-upload mt-8">Submit</div>
      </div>
    </div>
  );
}
