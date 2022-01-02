import React from "react";

function File(props) {
    const {fileName} = props;

    return (
        <div className="file">
            <div className="file-name">{fileName}</div>
            <div>Upload</div>
        </div>
    )
}

export default function UploadFiles() {
    return (
        <div className="main flex-col justify-start">
            <h2>Upload Files</h2>
            <div className="files">
            <File fileName="Aadhaar PDF"></File>
            </div>
        </div>
    )
}