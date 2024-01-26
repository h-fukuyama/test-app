import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFileContext } from '../context/FileContext';
import Header from './Header';
import { useDropzone } from 'react-dropzone';

const FileInputScreen = () => {
  const navigate = useNavigate();
  const { setFileContext } = useFileContext();

  const { acceptedFiles, getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'application/json',
    maxFiles: 1,
    onDrop: handleFileChange,
  });

  function handleFileChange(files) {
    const selectedFile = files[0];

    if (selectedFile) {
      setFileContext(selectedFile);
      navigate('/main');
    }
  }

  const renderHeader = acceptedFiles.length > 0 && <Header file={acceptedFiles[0]} />;

  return (
    <div>
      <h1>PRX-IP5000 configファイル解析アプリ</h1>
      <div
        {...getRootProps({
          style: {
            border: '2px dashed #cccccc',
            borderRadius: '4px',
            padding: '20px',
            textAlign: 'center',
            cursor: 'pointer',
            height: '500px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            ...(isDragActive && { border: '2px dashed #2196F3' }), // ドラッグ中のスタイル
          },
        })}
      >
        <input {...getInputProps()} />
        <p>JSONファイルをここにドラッグ&ドロップするか<br />クリックしてファイルを一つ選択してください。</p>
      </div>
      {renderHeader}
    </div>
  );
};

export default FileInputScreen;
