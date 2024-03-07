import React, { useEffect } from 'react';
import { useFileContext } from '../context/FileContext';
import { useNavigate, useParams } from 'react-router-dom';
import Header from './Header';
import useFileContent from '../utils/useFileContent';
import { hexToBinary } from '../utils/calculate';
import { LtDetailTable, LtDetailTable2 } from '../utils/lt/ltDetailTable';
import { getActionResult } from '../utils/lt/ltComponentFunction';

const LtDetail = () => {
    const { file } = useFileContext(); //fileとsetFileContextを取得
    const { fileContent } = useFileContent(file); //fileのファイルの内容を読み込む
    const navigate = useNavigate();
    const { id } = useParams();
    
    useEffect(() => {
      if (!file) {
        navigate('/reset');
      }
    }, [file, navigate]);

    const LtDetailProcessor = ({ lt, id }) => {
      if(lt){
        const datasets = [];
        const title = lt[((id-1)*4702)+1]? lt[((id-1)*4702)+1] : 'ローカルタイマー'+id+'(ユーザ未定義)';
        datasets.push(hexToBinary(lt[(id-1)*4702]),title);
        return datasets;
      }
    }

    const LtDetailProcessor2 = ({ lt, id }) => {
      if(lt){
        const datasets = [];
        for(let i = 1; i <= 100; i++ ) {
          const startIndex = ((47 * (i - 1)) + ( 4702* (id - 1) + 2));
          const hour = lt[startIndex]==='18' ? '--': parseInt(lt[startIndex],16);
          const minute = lt[startIndex+1]==='3C' ? '--': parseInt(lt[startIndex+1],16);
          if(lt[startIndex+2]==='00') {
            const dataset = [lt[startIndex+3],lt[startIndex+7],lt[startIndex+11],lt[startIndex+15],lt[startIndex+19]];
            const firstArrayValue = dataset.find(value => value !== "");
            const call= firstArrayValue ? firstArrayValue : '<未登録>';
            datasets.push([id,i,hour,minute,call])//id, id2, hour, minute, call
          }else {
            const call = getActionResult(lt, startIndex);
            datasets.push([id,i,hour,minute,call])
          }
        }
        return datasets;
      }
    }

    const tableSet = LtDetailProcessor({ lt: fileContent?.if_config?.lt || [], id: id});
    const tableSet2 = LtDetailProcessor2({ lt: fileContent?.if_config?.lt || [], id: id});

    return (
    <div>
        {file && (
        <div>
            <Header />
            <h2>LocalTimer Detail Page</h2>
            <h3>ローカルタイマー{Number(id)}の詳細</h3>
            {fileContent && (
              <>
                <div><LtDetailTable week={tableSet[0]} title={tableSet[1]} /></div>
                {tableSet2.map((data, index) => (
                  <div key={index}>
                    <div><LtDetailTable2 id={data[0]} id2={data[1]} hour={data[2]} minute={data[3]} call={data[4]} /></div>
                  </div>
                ))}
              </>
            )}
        </div>
        )}
        {!file && <h2>Lt Page</h2>}
    </div>
    );
};

export default LtDetail;
