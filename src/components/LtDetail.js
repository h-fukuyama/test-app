import React, { useEffect } from 'react';
import { useFileContext } from '../context/FileContext';
import { useNavigate, useParams } from 'react-router-dom';
import Header from './Header';
import useFileContent from '../utils/useFileContent';
import { hexToBinary } from '../utils/calculate';
import { LtDetailTable } from '../utils/lt/ltDetailTable';

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
        console.log(title);
        return datasets;
      }
    }

    const tableSet = LtDetailProcessor({ lt: fileContent?.if_config?.lt || [], id: id})

    return (
    <div>
        {file && (
        <div>
            <Header />
            <h2>LocalTimer Detail Page</h2>
            <h3>ローカルタイマー{Number(id)}の詳細</h3>
            {fileContent && (
            <div><LtDetailTable week={tableSet[0]} title={tableSet[1]} /></div>)}
        </div>
        )}
        {!file && <h2>Lt Page</h2>}
    </div>
    );
};

export default LtDetail;
