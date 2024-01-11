// ScComponent.js
import React, { useState, useEffect } from 'react';
import { useFileContext } from '../context/FileContext';
import Header from './Header';

const ScComponent = () => {
  const { file } = useFileContext();
  const [scConfig, setScConfig] = useState(null);

  useEffect(() => {
    if (file) {
      readFileContent(file);
    }
  }, [file]);

  const readFileContent = async (file) => {
    try {
      const content = await readFile(file);
      const scConfig = extractScConfig(content);
      setScConfig(scConfig);
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

  const extractScConfig = (content) => {
    // Assuming the structure is { if_config: { sc: ... } }
    return content && content.if_config && content.if_config.sc;
  };

  return (
    <div>
      {file && (
        <div>
          <Header file={file} />
          <h2>Sc Page</h2>
          <p>File Name: {file.name}</p>
          {scConfig && (
            <div>
              <h3>Sc Config</h3>
              <pre>{JSON.stringify(scConfig, null, 2)}</pre>
            </div>
          )}
        </div>
      )}
      {!file && <h2>Sc Page</h2>}
    </div>
  );
};

export default ScComponent;
