// MainComponent.js
import React from 'react';
import { useFileContext } from '../context/FileContext';
import Header from './Header';
import useFileContent from '../utils/useFileContent';

const MainComponent = () => {
  const { file } = useFileContext();
  const { fileContent } = useFileContent(file);

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
