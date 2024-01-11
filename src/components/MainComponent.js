// MainComponent.js
import React, { useState, useEffect } from 'react';
import { useFileContext } from '../context/FileContext';
import Header from './Header';

const MainComponent = () => {
  const { file } = useFileContext();
  const [fileContent, setFileContent] = useState(null);

  useEffect(() => {
    if (file) {
      readFileContent(file);
    }
  }, [file]);

  const readFileContent = async (file) => {
    try {
      const content = await readFile(file);
      setFileContent(content);
    } catch (error) {
      console.error('Error reading file:', error);
    }
  };

  const readFile = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        try {
          const content = JSON.parse(event.target.result);
          resolve(content);
        } catch (parseError) {
          reject(parseError);
        }
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsText(file);
    });
  };

  return (
    <div>
      {file && (
        <div>
          <Header file={file} />
          <h2>Main Page</h2>
          <p>File Name: {file.name}</p>
          {fileContent && (
            <div>
              <h3>File Content</h3>
              <pre>{JSON.stringify(fileContent, null, 2)}</pre>
            </div>
          )}
        </div>
      )}
      {!file && <h2>Main Page</h2>}
    </div>
  );
};

export default MainComponent;
