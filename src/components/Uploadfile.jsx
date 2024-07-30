import React, { useState, useEffect } from 'react';
import './Upload.css';
import uploadIcon from './file.png';
import API_URL from '../pages/url';
import { useNavigate } from 'react-router-dom';



const Uploadfile = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const token = localStorage.getItem('financialtoken');
  const navigate = useNavigate();

useEffect(() => {

  if(!token){
      navigate('/signin')
      return
  }

}, [])

  const handleDrop = (e) => {
    e.preventDefault();
    const uploadedFile = e.dataTransfer.files[0];
    if (uploadedFile && uploadedFile.type === 'text/csv') {
      setFile(uploadedFile);
      setError('');
    } else {
      setFile(null);
      setError('Please upload a valid .csv file.');
    }
  };

  const handleBrowse = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile && uploadedFile.type === 'text/csv') {
      setFile(uploadedFile);
      setError('');
    } else {
      setFile(null);
      setError('Please upload a valid .csv file.');
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleUpload = async () => {
    if (!file) {
      setError('No file selected.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`${API_URL}/upload`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        // Handle success
        console.log('File uploaded successfully.');
        setFile(null);
        setError('');
      } else {
        // Handle error
        setError('Failed to upload file.');
      }
    } catch (error) {
      setError('An error occurred while uploading the file.');
    }
  };

  return (
    <div
      className="upload-container"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <div className="upload-box">
        <div className="upload-icon">
          <img src={uploadIcon} alt="Upload Icon" />
        </div>
        <p>You can drag and drop images to upload <br /><span style={{ color: 'lightgray', fontSize: '12px' }}>*The file should be in .csv </span></p>
        <input
          type="file"
          id="fileUpload"
          style={{ display: 'none' }}
          onChange={handleBrowse}
        />
        <label htmlFor="fileUpload" className="browse-button mr-3">Browse Computer</label>
        {file && <p className="file-info">File: {file.name}</p>}
        {error && <p className="error-message">{error}</p>}
        <button onClick={handleUpload} className="upload-button">Upload</button>
      </div>
    </div>
  );
};

export default Uploadfile;
