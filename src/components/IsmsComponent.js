// IsmsComponent.js
import React from 'react';
import { useFileContext } from '../context/FileContext';
import Header from './Header';
import useFileContent from '../utils/useFileContent';

const IsmsComponent = () => {
  const { file } = useFileContext(); //fileとsetFileContextを取得
  const { fileContent } = useFileContent(file); //fileのファイルの内容を読み込む

  return (
    <div>
      {file && ( //fileが存在すれば以下を表示
        <div>
          <Header />
          <h2>Isms Page</h2>
          <p>File Name: {file.type}</p>
          {fileContent && (
            <div>
              <h3>Isms Config</h3>
              <pre>{JSON.stringify(fileContent.if_config.isms, null, 2)}</pre>
            </div>
          )}
        </div>
      )}
      {!file && <h2>Isms Page</h2>} {/* fileが存在しなければタイトルだけ表示（/に遷移するとかでもよさそう) */}
    </div>
  );
};

export default IsmsComponent;
