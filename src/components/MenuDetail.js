import React, { useEffect } from 'react';
import { useFileContext } from '../context/FileContext';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import Header from './Header';
import useFileContent from '../utils/useFileContent';
import { MenuDetailTable0, MenuDetailTable1, MenuDetailTable2, MenuDetailTable3, MenuDetailTable4, MenuDetailTable5 } from '../utils/menu/menuDetailTable'
import { BinaryConverter, mapFolderValue, replaceControl, replaceValue, replaceSubject, replaceVolume, generateOutput } from '../utils/sc/scComponentFunction';
import { hexToSignedDecimal } from '../utils/calculate';
import { processBGMBand } from '../utils/bgmBand';

const MenuDetail = () => {
  const { file } = useFileContext(); //fileとsetFileContextを取得
  const { fileContent } = useFileContent(file); //fileのファイルの内容を読み込む
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const params = location.key;
  const startIndex = ((id - 1) * 70) + 17 ;
  
  useEffect(() => {
    if (!file) {
      navigate('/reset');
    }
  }, [file, navigate]);

  const MenuDetailProcessor = ({ menu,id }) => {
    switch (menu[startIndex+id]) {
      case '00': //コメント再生         
          const fileName = [menu[startIndex+1+id],menu[startIndex+5+id],menu[startIndex+9+id],menu[startIndex+13+id],menu[startIndex+17+id]];
          const folder = [menu[startIndex+2+id],menu[startIndex+6+id],menu[startIndex+10+id],menu[startIndex+14+id],menu[startIndex+18+id]];
          const transformedFolder = folder.map(mapFolderValue);
          const volume = [menu[startIndex+3+id],menu[startIndex+7+id],menu[startIndex+11+id],menu[startIndex+15+id],menu[startIndex+19+id]];
          const transformedVolume = volume.map(hexToSignedDecimal);
          const mixing = [menu[startIndex+4+id],menu[startIndex+8+id],menu[startIndex+12+id],menu[startIndex+16+id],menu[startIndex+20+id]];
          const transformedMixing = mixing.map(hexValue => parseInt(hexValue, 16));
          const output = BinaryConverter(menu[startIndex+21+id]);
          const repeat = (menu[startIndex+22+id] === '00' ?  '未設定' : parseInt(menu[startIndex+22+id], 16) ); 
          const external = [(menu[startIndex+23+id] === '00' ? '利用しない' : '利用する'), parseInt(menu[startIndex+24+id],16), replaceControl(menu[startIndex+25+id]), parseInt(menu[startIndex+26+id],16)];
          const channel = [(menu[startIndex+27+id] === '00' ? '利用しない' : '利用する')];
          const channelName = (() => {
              switch (menu[startIndex+28+id]) {
                  case '00': 
                      return `${processBGMBand(menu[startIndex+31+id])}${parseInt(menu[startIndex+32+id])}`;
                  case '01':
                      return menu[startIndex+29+id] === '00' ? '未設定' : `プログラム${menu[startIndex+29+id]}`;
                  case '02':
                      return menu[startIndex+30+id];
                  default:
                      return '不明'
              }
          })();
          channel.push(channelName);
          return <MenuDetailTable0 fileName={fileName} folder={transformedFolder} volume={transformedVolume} mixing={transformedMixing} output={output} repeat={repeat} external={external} channel={channel} params={params}/>;
      case '01': //チャンネル変更:9行
          let channel_Name = "";
          if(menu[startIndex+50] === '00') {
            channel_Name = `${processBGMBand(menu[startIndex + 53])}${parseInt(menu[startIndex + 54], 16)}`
          } else if(menu[startIndex+50] === '01') {
            channel_Name = "プログラム" + (menu[startIndex+51] === '00' ? "未設定" : menu[startIndex+51]);  
          } else if(menu[startIndex+50] === '02') {
            channel_Name = menu[startIndex+52];
          }
          const external1 = [(menu[startIndex+55] === '00' ? '利用しない' : '利用する'), parseInt(menu[startIndex+56],16), replaceControl(menu[startIndex+57]), parseInt(menu[startIndex+58],16)];
          return <MenuDetailTable1 channel={channel_Name} external={external1}/>;        
      case '02': //BGM/CMカット:4行
        const cm = BinaryConverter(menu[startIndex+59]);
        const bgm = BinaryConverter(menu[startIndex+60]);
        const minute = BinaryConverter(menu[startIndex+61]);
        return <MenuDetailTable2 cm={cm} bgm={bgm} minute={minute} action={generateOutput(menu[startIndex+62])}/>;        
      case '03': //外部制御:3行
        const external3 = [parseInt(menu[startIndex+63],16), replaceControl(menu[startIndex+64]), parseInt(menu[startIndex+65],16)];
        return <MenuDetailTable3 external3={external3}/>;        
      case '04': //ボリューム:3行
          return <MenuDetailTable4 subject={replaceSubject(menu[startIndex+66])} control={replaceVolume(menu[startIndex+67])} volume={parseInt(menu[startIndex+68],16)}/>;        
      case '05': //AUX:1行
          return <MenuDetailTable5 title="AUX" power={replaceValue(menu[startIndex+69])}/>;        
      default:
        return "";
    }
  } 

  const tableSet = MenuDetailProcessor({ menu: fileContent?.if_config?.menu || [], id: 0 });
  
  return (
    <div>
      {file && (
        <div>
          <Header />
          <h2>Menu Detail Page</h2>
          <h3>ワンタッチボタン: {Number(id)}の詳細</h3>
          {fileContent && (
            <div>{tableSet.props.fileName?.join('') === '' ? '未登録' : tableSet}</div>)}
        </div>
      )}
      {!file && <h2>Lt Page</h2>}
    </div>
  );
};

export default MenuDetail;
