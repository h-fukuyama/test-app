import React, { useEffect } from 'react';
import { useFileContext } from '../context/FileContext';
import { useNavigate, useParams } from 'react-router-dom';
import Header from './Header';
import useFileContent from '../utils/useFileContent';
import { ScDetailTable1 } from '../utils/sc/ScDetailTable';
import { mapFolderValue } from '../utils/sc/scComponentFunction';
import { hexToSignedDecimal } from '../utils/calculate';

const ScDetail = () => {
  const { file } = useFileContext(); //fileとsetFileContextを取得
  const { fileContent } = useFileContent(file); //fileのファイルの内容を読み込む
  const navigate = useNavigate();
  const { id } = useParams();
  const startIndex = ( id - 1 ) * 56;

  useEffect(() => {
    if (!file) {
      navigate('/reset');
    }
  }, [file, navigate]);

const ScDetailProcessor = ({ sc,id }) => {
    console.log(sc[startIndex])
    switch (sc[startIndex]) {
        case '00':
            const fileName = [sc[startIndex+1],sc[startIndex+5],sc[startIndex+9],sc[startIndex+13],sc[startIndex+17]];
            const folder = [sc[startIndex+2],sc[startIndex+6],sc[startIndex+10],sc[startIndex+14],sc[startIndex+18]];
            const transformedFolder = folder.map(mapFolderValue);
            const volume = [sc[startIndex+3],sc[startIndex+7],sc[startIndex+11],sc[startIndex+15],sc[startIndex+19]];
            const transformedVolume = volume.map(hexToSignedDecimal);
            const mixing = [sc[startIndex+4],sc[startIndex+8],sc[startIndex+12],sc[startIndex+16],sc[startIndex+20]];
            const transformedMixing = mixing.map(hexValue => parseInt(hexValue, 16))
            return <ScDetailTable1 fileName={fileName} folder={transformedFolder} volume={transformedVolume} mixing={transformedMixing} />;
        case '01':
            return sc;
        case '02':
            return sc;        
        case '03':
            return sc;        
        case '04':
            return sc;        
        case '05':
            return sc;        
        case '06':
            return sc;        
        case '07':
          return sc;
        
        default:
          return [sc[id], sc[id + 22400]];
      }
} 

   const tableSet = ScDetailProcessor({ sc: fileContent?.if_config?.sc || [], id });
   //   const dataset = fileContent?.if_config?.sc.slice(startIndex, startIndex+56);

  return (
    <div>
      {file && (
        <div>
          <Header />
          <h2>Sc Detail Page</h2>
          <p>mode: {fileContent?.if_config?.sc[startIndex]}</p>
          {fileContent && (
              <div>
                {tableSet}
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
