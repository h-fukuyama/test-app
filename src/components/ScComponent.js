import React, { useEffect } from 'react';
import { useFileContext } from '../context/FileContext';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import useFileContent from '../utils/useFileContent';
import { getActionResult } from '../utils/sc/scComponentFunction';
import ScTable from '../utils/sc/scTable';

const ScComponent = () => {
  const { file } = useFileContext(); //fileとsetFileContextを取得
  const { fileContent } = useFileContent(file); //fileのファイルの内容を読み込む
  const navigate = useNavigate();

  useEffect(() => {
    if (!file) {
      navigate('/reset');
    }
  }, [file, navigate]);

  const ScProcessor = ({ sc }) => {
    const datasets = [];  
    for (let i = 0; i < 22400; i += 56) {
      const isSameButton = sc[i] === sc[i + 22400];
      if (isSameButton) {
        const dataset = [
          [sc[i + 1], sc[i + 5], sc[i + 9], sc[i + 13], sc[i + 17]],
          [sc[i + 22401], sc[i + 22405], sc[i + 22409], sc[i + 22413], sc[i + 22417]],
        ];
        const firstArrayValue = dataset[0].find(value => value !== "");
        const secondArrayValue = dataset[1].find(value => value !== "");
        datasets.push([
          (i / 56) + 1,
          firstArrayValue || "<未登録>",
          secondArrayValue || "<未登録>",
        ]);
      } else {
        const actionResult = getActionResult(sc, i); 
        datasets.push([(i / 56) + 1, ...actionResult]);
      }
    }
    return datasets;
  }; 
  
  const datasets = ScProcessor({ sc: fileContent?.if_config?.sc || [] });

  return (
    <div>
      {file && ( //fileが存在すれば以下を表示
        <div>
          <Header />
          <h2>Sc Page</h2>
          <p>File Name: {file.type}</p>
          <h3>無線① WCシリーズ(400ペア)</h3>
          {/* すべてのテーブルを回す */}
          {datasets.map((data, index) => (
            <div key={index}>
              <ScTable id={data[0]} call={data[1]} back={data[2]} />
            </div>
          ))}
          <h3>無線② UTW/WCシリーズ(1~16)</h3>
          <ScTable />
          <h3>有線(1~16)</h3>
          <ScTable />
        </div>
      )}
      {!file && <h2>Sc Page</h2>} {/* fileが存在しなければタイトルだけ表示（/に遷移するとかでもよさそう) */}
    </div>
  );
};

export default ScComponent;
