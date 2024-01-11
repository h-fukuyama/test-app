// context/FileContext.js
import { createContext, useContext, useState } from 'react';

const FileContext = createContext();

export const FileProvider = ({ children }) => {
  const [file, setFile] = useState(null);

  const setFileContext = (newFile) => {
    setFile(newFile);
  };

  return (
    <FileContext.Provider value={{ file, setFileContext }}>
      {children}
    </FileContext.Provider>
  );
};

export const useFileContext = () => useContext(FileContext);
