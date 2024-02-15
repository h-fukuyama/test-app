import React, { useEffect } from 'react';
import { useFileContext } from '../context/FileContext';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import Header from './Header';
import useFileContent from '../utils/useFileContent';
import { ScDetailTable0, ScDetailTable1, ScDetailTable2, ScDetailTable3, ScDetailTable4, ScDetailTable5, ScDetailTable6 } from '../utils/sc/ScDetailTable';
import { BinaryConverter, mapFolderValue, replaceControl, replaceValue, replaceSubject, replaceVolume, generateOutput } from '../utils/sc/scComponentFunction';
import { hexToSignedDecimal } from '../utils/calculate';
import { processBGMBand } from '../utils/bgmBand';

const ScDetail = () => {
  const { file } = useFileContext(); //fileとsetFileContextを取得
  const { fileContent } = useFileContent(file); //fileのファイルの内容を読み込む
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const params = location.key;
  const startIndex = id >= 101 ? (id - 101) * 56 : (id - 1) * 56;
  
  useEffect(() => {
    if (!file) {
      navigate('/reset');
    }
  }, [file, navigate]);

  const ScDetailProcessor = ({ sc,id }) => {
    switch (sc[startIndex+id]) {
      case '00': //コメント再生         
          const fileName = [sc[startIndex+1+id],sc[startIndex+5+id],sc[startIndex+9+id],sc[startIndex+13+id],sc[startIndex+17+id]];
          const folder = [sc[startIndex+2+id],sc[startIndex+6+id],sc[startIndex+10+id],sc[startIndex+14+id],sc[startIndex+18+id]];
          const transformedFolder = folder.map(mapFolderValue);
          const volume = [sc[startIndex+3+id],sc[startIndex+7+id],sc[startIndex+11+id],sc[startIndex+15+id],sc[startIndex+19+id]];
          const transformedVolume = volume.map(hexToSignedDecimal);
          const mixing = [sc[startIndex+4+id],sc[startIndex+8+id],sc[startIndex+12+id],sc[startIndex+16+id],sc[startIndex+20+id]];
          const transformedMixing = mixing.map(hexValue => parseInt(hexValue, 16));
          const output = BinaryConverter(sc[startIndex+21+id]);
          const repeat = (sc[startIndex+22+id] === '00' ?  '未設定' : parseInt(sc[startIndex+22+id], 16) ); 
          const external = [(sc[startIndex+23+id] === '00' ? '利用しない' : '利用する'), parseInt(sc[startIndex+24+id],16), replaceControl(sc[startIndex+25+id]), parseInt(sc[startIndex+26+id],16)];
          const channel = [(sc[startIndex+27+id] === '00' ? '利用しない' : '利用する')];
          const channelName = (() => {
              switch (sc[startIndex+28+id]) {
                  case '00': 
                      return `${processBGMBand(sc[startIndex+31+id])}${parseInt(sc[startIndex+32+id])}`;
                  case '01':
                      return sc[startIndex+29+id] === '00' ? '未設定' : `プログラム${sc[startIndex+29+id]}`;
                  case '02':
                      return sc[startIndex+30+id];
                  default:
                      return '不明'
              }
          })();
          channel.push(channelName);
          return <ScDetailTable0 fileName={fileName} folder={transformedFolder} volume={transformedVolume} mixing={transformedMixing} output={output} repeat={repeat} external={external} channel={channel} params={params}/>;
      case '01': //電源制御:1行
          return <ScDetailTable1 title="電源ON/OFF" power={replaceValue(sc[startIndex+33])} back={sc[startIndex+22400] === '00' ? "利用しない" : "利用する"} />;
      case '02': //チャンネル変更:9行(呼び戻し無し)
          let channel_Name = "";
          if(sc[startIndex+34] === '00') {
            channel_Name = `${processBGMBand(sc[startIndex + 37])}${parseInt(sc[startIndex + 38], 16)}`
          } else if(sc[startIndex+34] === '01') {
            channel_Name = "プログラム" + (sc[startIndex+35] === '00' ? "未設定" : sc[startIndex+35]);  
          } else if(sc[startIndex+34] === '02') {
            channel_Name = sc[startIndex+39];
          }
          const external3 = [(sc[startIndex+39] === '00' ? '利用しない' : '利用する'), parseInt(sc[startIndex+40],16), replaceControl(sc[startIndex+41]), parseInt(sc[startIndex+42],16)];
          return <ScDetailTable2 channel={channel_Name} external={external3} back={sc[startIndex+22400] === '00' ? "利用しない" : "利用する"}/>;        
      case '03': //カット制御:4行
          const cm = BinaryConverter(sc[startIndex+43]);
          const bgm = BinaryConverter(sc[startIndex+44]);
          const minute = BinaryConverter(sc[startIndex+45]);
          return <ScDetailTable3 cm={cm} bgm={bgm} minute={minute} action={generateOutput(sc[startIndex+46])} back={sc[startIndex+22400] === '00' ? "利用しない" : "利用する"}/>;        
      case '04': //ワンタッチボタン:2行
          return <ScDetailTable4 button={(sc[startIndex+47] === '00' ? "未設定" : parseInt(sc[startIndex+48],16))} control={replaceValue(sc[startIndex+48])} back={sc[startIndex+22400] === '00' ? "利用しない" : "利用する"}/>;        
      case '05': //外部制御:3行
          const external2 = [parseInt(sc[startIndex+49],16), replaceControl(sc[startIndex+50]), parseInt(sc[startIndex+51],16)];
          return <ScDetailTable5 external2={external2} back={sc[startIndex+22400] === '00' ? "利用しない" : "利用する"}/>;        
      case '06': //音量3行
          return <ScDetailTable6 subject={replaceSubject(sc[startIndex+52])} control={replaceVolume(sc[startIndex+53])} volume={parseInt(sc[startIndex+54],16)} back={sc[startIndex+22400] === '00' ? "利用しない" : "利用する"}/>;        
      case '07': //AUX:1行
          return <ScDetailTable1 title="AUX" power={replaceValue(sc[startIndex+55])} back={sc[startIndex+22400] === '00' ? "利用しない" : "利用する"}/>;        
      default:
        return [sc[id], sc[id + 22400]];
    }
  } 

  const tableSet = ScDetailProcessor({ sc: fileContent?.if_config?.sc || [], id: 0 });
  const tableSet2 = ScDetailProcessor({ sc: fileContent?.if_config?.sc || [], id: 22400 });
  
  return (
    <div>
      {file && (
        <div>
          <Header />
          <h2>Sc Detail Page</h2>
          <h3>ボタン: {Number(id)}の詳細</h3>
          {fileContent && (
              <div>
                {tableSet}
                {fileContent?.if_config?.sc[startIndex] === fileContent?.if_config?.sc[startIndex + 22400] ? tableSet2 : null}
              </div>
            )
          }
        </div>
      )}
      {!file && <h2>Lt Page</h2>}
    </div>
  );
};

export default ScDetail;
