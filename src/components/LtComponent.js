import React, { useEffect } from 'react';
import { useFileContext } from '../context/FileContext';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import useFileContent from '../utils/useFileContent';

const LtComponent = () => {
  const { file } = useFileContext(); //fileとsetFileContextを取得
  const { fileContent } = useFileContent(file); //fileのファイルの内容を読み込む
  const navigate = useNavigate();

  useEffect(() => {
    if (!file) {
      navigate('/reset');
    }
  }, [file, navigate]);

  return (
    <div>
      {file && ( //fileが存在すれば以下を表示
        <div>
          <Header />
          <h2>Lt Page</h2>
          <p>File Name: {file.type}</p>
          {fileContent && (
            <div>
              <h3>Lt Config</h3>
              <pre>{JSON.stringify(fileContent.if_config.lt, null, 2)}</pre>
            </div>
          )}
        </div>
      )}
      {!file && <h2>Lt Page</h2>} {/* fileが存在しなければタイトルだけ表示（/に遷移するとかでもよさそう) */}
    </div>
  );
};

export default LtComponent;
