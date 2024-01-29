import React, { useEffect } from 'react';
import { useFileContext } from '../context/FileContext';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import useFileContent from '../utils/useFileContent';
// import { processTypeOne processType02, processType03, processType04, processType05, processType06, processType07 } from '../utils/sc/scComponentFunction';
import { processTypeOne } from '../utils/sc/scComponentFunction';
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

    for( let i = 0; i < 22400; i+=56 ) {
      if ( sc[i] === sc[i+22400] ) {
        if( sc[i] === '00' ){
          //sc[0],sc[44800]のファイル名を全て調査[44800]以降でなければ呼戻無
          const dataset = [[sc[i + 1], sc[i + 5], sc[i + 9], sc[i + 13], sc[i + 17]], [sc[i + 22401], sc[i+22405], sc[i+22409], sc[i+22413], sc[i+22417]]];
          const firstArrayValue = dataset[0].find(value => value !== "");
          const secondArrayValue = dataset[1].find(value => value !== "");

          if (firstArrayValue || secondArrayValue) {
            datasets.push([ (i / 56) + 1, firstArrayValue || "<未登録>", secondArrayValue || "<未登録>"]);
          } else {
            datasets.push([ (i / 56) + 1, "<未登録>", "<未登録>"]);
          }
        } else {
          //01~07毎の操作,sc[44800]の操作も行う
          if( sc[i] === '01' ){
            const dataset = [i, sc[i+33], sc[i+22433]];
            const replacedValue1 = replaceValue(dataset[1]);
            const replacedValue2 = replaceValue(dataset[2]);
          
            return [(i / 56) + 1, replacedValue1, replacedValue2];
          } else if( sc[i] === '02' ){
            
          } else if( sc[i] === '03' ){
            
          } else if( sc[i] === '04' ){
            
          } else if( sc[i] === '05' ){
            
          } else if( sc[i] === '06' ){
            
          } else if( sc[i] === '07' ){
            
          } else {
            datasets.push([(i/56)+1,sc[i], sc[i+22400]]);
          }          

        }
      } else if ( sc[i] !== sc[i+22400] ) {
        if ( sc[i] === '00' ) {
          //あり得ないので"該当ボタンエラー"
          datasets.push([(i/56)+1,sc[i], sc[i+22400]]);
        } else {
          //01~07毎の操作sc[44800]の操作は行わず＜未設定＞
          datasets.push([(i/56)+1,sc[i], sc[i+22400]]);        }
      } else {
        //分岐以外
        datasets.push([(i/56)+1,"不明", "不明"]);
      }
    }
    return datasets;
  }
  function replaceValue(value) {
    switch (value) {
      case '00':
        return "電源ON⇔OFF";
      case '01':
        return "電源ON";
      case '02':
        return "電源OFF";
      default:
        return value; // 何も該当しない場合は元の値をそのまま返す
    }
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
