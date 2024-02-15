import React, { useEffect } from 'react';
import { useFileContext } from '../context/FileContext';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import useFileContent from '../utils/useFileContent';
import { ScProcessor1, ScProcessor2 } from './ScComponent'
import { ScTable1, ScTable2 } from '../utils/sc/scTable';

const MainComponent = () => {
  const { file } = useFileContext();
  const { fileContent } = useFileContent(file);
  const navigate = useNavigate();

  useEffect(() => {
    if (!file) {
      navigate('/reset');
    }
  }, [file, navigate]);

  const datasets1 = ScProcessor1({ sc: fileContent?.if_config?.sc || [] });
  const datasets2 = ScProcessor2({ sc: fileContent?.if_config?.sc || [] });

  return (
    <div>
      {file && (
        <div>
          <Header />
          <h2>Main Page</h2>
          <p>File Name: {file.name}</p>
          {fileContent? (
            <div>
              <h2>スタッフコール(両方未接続の設定以外を表示)</h2>
              <h3>無線① WCシリーズ(101~400)</h3>
              {datasets1.map((data, index) => (
                <div key={index}>
                  {(data[1] !== "<未登録>" || data[2] !== "<未登録>") && (
                    <ScTable1 id={data[0]} button={data[0]+100} call={data[1]} back={data[2]} />
                  )}
                </div>
              ))}
              <h3>無線② UTW/WCシリーズ(1~16)</h3>
                {datasets2.map((data, index) => (
                  <div key={index}>
                    {((data[1] !== "<未登録>" && data[1] !== "") || (data[2] !== "<未登録>" && data[2] !== "")) && (
                      <ScTable1 id={data[0]} button={data[0]} call={data[1]} back={data[2]} />
                    )}
                  </div>
                ))}
                <h3>有線(1~16)</h3>
                {datasets2.map((data, index) => (
                  <div key={index}>
                    {((data[1] !== "<未登録>" && data[1] !== "") || (data[2] !== "<未登録>" && data[2] !== "")) && (
                      <ScTable2 id={data[0]} call={data[1]} />
                    )}
                  </div>
                ))}
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
