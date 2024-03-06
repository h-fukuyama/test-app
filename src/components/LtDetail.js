import React, { useEffect } from 'react';
import { useFileContext } from '../context/FileContext';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import Header from './Header';
import useFileContent from '../utils/useFileContent';

const LtDetail = () => {
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

    const LtDetailProcessor = ({ lt, id }) => {

    }

    const tableSet = LtDetailProcessor({ lt: fileContent?.if_config?.menu || [], id: 0})

    return (
    <div>
        {file && (
        <div>
            <Header />
            <h2>LocalTimer Detail Page</h2>
            <h3>ローカルタイマー: {Number(id)}の詳細</h3>
            {fileContent && (
            <div>{tableSet.props.fileName?.join('') === '' ? '未登録' : tableSet}</div>)}
        </div>
        )}
        {!file && <h2>Lt Page</h2>}
    </div>
    );
};

export default LtDetail;
