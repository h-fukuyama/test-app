import React, { useEffect } from 'react';
import { useFileContext } from '../context/FileContext';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import useFileContent from '../utils/useFileContent';
import ScTable from '../utils/scTable';

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
    for( let i = 0; i <= 44744; i+=56 ) {
      if ( sc[i] === '00' ) {
        return datasets.push(["チャイム1", "チャイム2"]);
      } else if ( sc[i] === '01' ) {
        //return results_all.push()
      } else if ( sc[i] === '02' ) {
        
      } else if ( sc[i] === '03' ) {
        
      } else if ( sc[i] === '04' ) {
        
      } else if ( sc[i] === '05' ) {
        
      } else if ( sc[i] === '06' ) {
        
      } else if ( sc[i] === '07' ) {
        
      } else {

      }
    }
    return datasets;
  }

  const datasets = ScProcessor({ sc: fileContent?.if_config?.sc || [] });

  return (
    <div>
      {file && ( //fileが存在すれば以下を表示
        <div>
          <Header />
          <h2>Sc Page</h2>
          <p>File Name: {file.type}</p>
          <h3>無線① WCシリーズ(400ペア)</h3>
          <ScTable id={1} call={"チャイム１"} back={"チャイム2"} />
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
