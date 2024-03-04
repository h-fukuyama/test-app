// import React, { useEffect } from 'react';
// import { useFileContext } from '../context/FileContext';
// import { useNavigate, useParams, useLocation } from 'react-router-dom';
// import Header from './Header';
// import useFileContent from '../utils/useFileContent';
// // import { MenuDetailTable0, MenuDetailTable1, MenuDetailTable2, MenuDetailTable3, MenuDetailTable4, MenuDetailTable5, MenuDetailTable6 } from './utils/menu/MenuDetailTable';
// // import { BinaryConverter, mapFolderValue, replaceControl, replaceValue, replaceSubject, replaceVolume, generateOutput } from './utils/menu/MenuComponentFunction';
// // import { hexToSignedDecimal } from '../utils/calculate';
// // import { processBGMBand } from '../utils/bgmBand';

// const MenuDetail = () => {
//   const { file } = useFileContext(); //fileとsetFileContextを取得
//   const { fileContent } = useFileContent(file); //fileのファイルの内容を読み込む
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const location = useLocation();
//   const params = location.key;
//   const startIndex = id >= 101 ? (id - 101) * 56 : ((id - 1) * 56)+44800;
  
//   useEffect(() => {
//     if (!file) {
//       navigate('/reset');
//     }
//   }, [file, navigate]);

//   const MenuDetailProcessor = ({ sc,id }) => {
//     switch (sc[startIndex+id]) {
//       case '00': //コメント再生         
//           const fileName = [sc[startIndex+1+id],sc[startIndex+5+id],sc[startIndex+9+id],sc[startIndex+13+id],sc[startIndex+17+id]];
//           const folder = [sc[startIndex+2+id],sc[startIndex+6+id],sc[startIndex+10+id],sc[startIndex+14+id],sc[startIndex+18+id]];
//           const transformedFolder = folder.map(mapFolderValue);
//           const volume = [sc[startIndex+3+id],sc[startIndex+7+id],sc[startIndex+11+id],sc[startIndex+15+id],sc[startIndex+19+id]];
//           const transformedVolume = volume.map(hexToSignedDecimal);
//           const mixing = [sc[startIndex+4+id],sc[startIndex+8+id],sc[startIndex+12+id],sc[startIndex+16+id],sc[startIndex+20+id]];
//           const transformedMixing = mixing.map(hexValue => parseInt(hexValue, 16));
//           const output = BinaryConverter(sc[startIndex+21+id]);
//           const repeat = (sc[startIndex+22+id] === '00' ?  '未設定' : parseInt(sc[startIndex+22+id], 16) ); 
//           const external = [(sc[startIndex+23+id] === '00' ? '利用しない' : '利用する'), parseInt(sc[startIndex+24+id],16), replaceControl(sc[startIndex+25+id]), parseInt(sc[startIndex+26+id],16)];
//           const channel = [(sc[startIndex+27+id] === '00' ? '利用しない' : '利用する')];
//           const channelName = (() => {
//               switch (sc[startIndex+28+id]) {
//                   case '00': 
//                       return `${processBGMBand(sc[startIndex+31+id])}${parseInt(sc[startIndex+32+id])}`;
//                   case '01':
//                       return sc[startIndex+29+id] === '00' ? '未設定' : `プログラム${sc[startIndex+29+id]}`;
//                   case '02':
//                       return sc[startIndex+30+id];
//                   default:
//                       return '不明'
//               }
//           })();
//           channel.push(channelName);
//           return <MenuDetailTable0 fileName={fileName} folder={transformedFolder} volume={transformedVolume} mixing={transformedMixing} output={output} repeat={repeat} external={external} channel={channel} params={params}/>;
//       case '01': //電源制御:1行
//           return <MenuDetailTable1 title="電源ON/OFF" power={replaceValue(sc[startIndex+33])} back={sc[startIndex+22400] === '00' ? "利用しない" : "利用する"} />;
//       case '02': //チャンネル変更:9行(呼び戻し無し)
//           let channel_Name = "";
//           if(sc[startIndex+34] === '00') {
//             channel_Name = `${processBGMBand(sc[startIndex + 37])}${parseInt(sc[startIndex + 38], 16)}`
//           } else if(sc[startIndex+34] === '01') {
//             channel_Name = "プログラム" + (sc[startIndex+35] === '00' ? "未設定" : sc[startIndex+35]);  
//           } else if(sc[startIndex+34] === '02') {
//             channel_Name = sc[startIndex+39];
//           }
//           const external3 = [(sc[startIndex+39] === '00' ? '利用しない' : '利用する'), parseInt(sc[startIndex+40],16), replaceControl(sc[startIndex+41]), parseInt(sc[startIndex+42],16)];
//           return <MenuDetailTable2 channel={channel_Name} external={external3} back={sc[startIndex+22400] === '00' ? "利用しない" : "利用する"}/>;        
//       case '03': //カット制御:4行
//           const cm = BinaryConverter(sc[startIndex+43]);
//           const bgm = BinaryConverter(sc[startIndex+44]);
//           const minute = BinaryConverter(sc[startIndex+45]);
//           return <MenuDetailTable3 cm={cm} bgm={bgm} minute={minute} action={generateOutput(sc[startIndex+46])} back={sc[startIndex+22400] === '00' ? "利用しない" : "利用する"}/>;        
//       case '04': //ワンタッチボタン:2行
//           return <MenuDetailTable4 button={(sc[startIndex+47] === '00' ? "未設定" : parseInt(sc[startIndex+48],16))} control={replaceValue(sc[startIndex+48])} back={sc[startIndex+22400] === '00' ? "利用しない" : "利用する"}/>;        
//       case '05': //外部制御:3行
//           const external2 = [parseInt(sc[startIndex+49],16), replaceControl(sc[startIndex+50]), parseInt(sc[startIndex+51],16)];
//           return <MenuDetailTable5 external2={external2} back={sc[startIndex+22400] === '00' ? "利用しない" : "利用する"}/>;        
//       case '06': //音量3行
//           return <MenuDetailTable6 subject={replaceSubject(sc[startIndex+52])} control={replaceVolume(sc[startIndex+53])} volume={parseInt(sc[startIndex+54],16)} back={sc[startIndex+22400] === '00' ? "利用しない" : "利用する"}/>;        
//       case '07': //AUX:1行
//           return <MenuDetailTable1 title="AUX" power={replaceValue(sc[startIndex+55])} back={sc[startIndex+22400] === '00' ? "利用しない" : "利用する"}/>;        
//       default:
//         return "";
//     }
//   } 

//   const tableSet = MenuDetailProcessor({ sc: fileContent?.if_config?.sc || [], id: 0 });
//   const tableSet2 = MenuDetailProcessor({ sc: fileContent?.if_config?.sc || [], id: startIndex<44800 ? 22400 : 448 });
  
//   return (
//     <div>
//       {file && (
//         <div>
//           <Header />
//           <h2>Menu Detail Page</h2>
//           <h3>ボタン: {Number(id)}の詳細</h3>
//           {fileContent && (
//               <div>
//                 <h4>呼出</h4>
//                 {tableSet.props.fileName?.join('') === '' ? '未登録' : tableSet}
//                 {
//                   (tableSet.props.back === '利用しない' || tableSet.props.fileName.join('') === '') 
//                   ? 
//                   <>
//                     <h4>呼戻</h4>
//                     未登録
//                   </>
//                   : 
//                   <>
//                     <h4>呼戻</h4>
//                     {tableSet2}
//                   </>
//                 }
//               </div>
//             )
//           }
//         </div>
//       )}
//       {!file && <h2>Lt Page</h2>}
//     </div>
//   );
// };

// export default MenuDetail;
