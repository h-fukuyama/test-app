// FileInputScreen.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFileContext } from '../context/FileContext'; // Import useFileContext
import Header from './Header';

function FileInputScreen() {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const { setFileContext } = useFileContext(); // Use the setFileContext from FileContext

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile && selectedFile.type === 'application/json') {
      setFile(selectedFile);
      setFileContext(selectedFile); // Set the file context
      navigate('/main');
    } else {
      alert('Please select a valid JSON file.');
    }
  };

  // Conditionally render the header only when a file is selected
  const renderHeader = file && <Header file={file} />;

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      {renderHeader}
    </div>
  );
}

export default FileInputScreen;
