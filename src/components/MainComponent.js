import React, { useEffect } from 'react';
import { useFileContext } from '../context/FileContext';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import useFileContent from '../utils/useFileContent';

const MainComponent = () => {
  const { file } = useFileContext();
  const { fileContent } = useFileContent(file);
  const navigate = useNavigate();

  useEffect(() => {
    if (!file) {
      navigate('/reset');
    }
  }, [file, navigate]);

  return (
    <div>
      {file && (
        <div>
          <Header />
          <h2>Main Page</h2>
          <p>File Name: {file.name}</p>
          {fileContent? (
            <div>
              <h3>File Content</h3>
              <pre>{JSON.stringify(fileContent, null, 2)}</pre>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      )}
      {!file && <h2>Main Page</h2>}
    </div>
  );
};

export default MainComponent;
