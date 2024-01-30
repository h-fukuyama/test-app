import React, { useEffect } from 'react';
import { useFileContext } from '../context/FileContext';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import useFileContent from '../utils/useFileContent';
// import { processTypeOne processType02, processType03, processType04, processType05, processType06, processType07 } from '../utils/sc/scComponentFunction';
import  replaceValue from '../utils/sc/scComponentFunction';
import ScTable from '../utils/sc/scTable';
import  { processBGMBand } from '../utils/bgmBand';
import generateOutput from '../utils/sc/scComponentFunction';

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
          } else datasets.push([ (i / 56) + 1, "<未登録>", "<未登録>"]);
        } else {
          //01~07毎の操作,sc[44800]の操作も行う
          if( sc[i] === '01' ){ //電源制御
            const dataset = [i, sc[i+33], sc[i+22433]];
            datasets.push([(i / 56) + 1, `電源${replaceValue(dataset[1])}`, `電源${replaceValue(dataset[2])}`]);
          } else if( sc[i] === '02' ){ //チャンネル変更(外部制御の操作はdetailで行う)
            if( sc[i+34] === '00' ) { //BGM
              datasets.push([ (i/56)+1, `チャンネル変更 ${processBGMBand(sc[i+37])}${parseInt(sc[i+38],16)}`, "ユーザ設定不可" ]);
            } else if( sc[i+34] === '01' ) { //プログラム
              datasets.push([(i/56)+1, sc[i+35] >= '00' && sc[i+35] <= '05' ? "チャンネル変更 <未設定>" : `チャンネル変更 ${sc[i+35]}`, "ユーザ設定不可"]);
            } else if( sc[i+34]==='02' ) { //radiko
              datasets.push([(i/56)+1, `チャンネル変更 ${sc[i+36]}`, "ユーザ設定不可" ])
            } else datasets.push([(i/56)+1, "不明", "ユーザ設定不可" ]);
          } else if( sc[i] === '03' ){ //BGM/CMカット
            datasets.push([ (i/56)+1, `BGM/CMカット ${generateOutput(sc[i+46])}`, `BGM/CMカット ${generateOutput(sc[i+22446])}`]);
          } else if( sc[i] === '04' ){ //ワンタッチボタン(外部制御の操作はdetailで行う)
            datasets.push( [(i/56)+1, `ワンタッチボタン${sc[i+47] === '00' ? "<未設定>" : parseInt(sc[i+47],16)} ${replaceValue(sc[i+48])}`,`ワンタッチボタン${sc[i+22447] === '00' ? "<未設定>" : parseInt(sc[i+22447],16)} ${replaceValue(sc[i+22448])}`])
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
