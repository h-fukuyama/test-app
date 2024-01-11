// FileInputScreen.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header'; // Assuming you have a Header component

function FileInputScreen() {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile && selectedFile.type === 'application/json') {
      setFile(selectedFile);
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
