// context/FileContext.js
import { createContext, useContext, useState } from 'react';

const FileContext = createContext(); //ファイル情報管理のためのコンテキストを作成

export const FileProvider = ({ children }) => { //childrenプロパティを受け取りプロバイダとして機能するコンポーネント
  const [file, setFile] = useState(null);

  const setFileContext = (newFile) => { //新しいファイル情報を受け取るとsetFile経由でfileを更新
    setFile(newFile);
  };

  return (
    <FileContext.Provider value={{ file, setFileContext }}>
      {children} {/* App.jsの親プロパティ*/}
    </FileContext.Provider>
  );
};

export const useFileContext = () => useContext(FileContext); //{FileContext}からfileとsetFileContextを取得する
