import React from 'react';
import { useFileContext } from '../context/FileContext';
import Header from './Header';
import useFileContent from '../utils/useFileContent';
import { hexToBinary, checkBit } from '../utils/calculate';

const OthrComponent = () => {
  const { file } = useFileContext(); //fileとsetFileContextを取得
  const { fileContent } = useFileContent(file); //fileのファイルの内容を読み込む

  const OthrProcessor = ({ other }) => {
    const otherPropertyFunctions = [processFunction1];

    const results = [];

    for (let i = 0; i < 1; i++) {
      const property = other[i];
      const func = otherPropertyFunctions[i];

      const result = func(property);

      results.push(result);
    }
    return results;
  };

  const processFunction1 = (property) => {
    const result1 = [];
    const binaryString = hexToBinary(property);

    const bitDefinitions = [
      { bit: 0, property: 'タイムテーブル(ONで有効)' },
      { bit: 1, property: '店内BGMカット' },
      { bit: 2, property: '事務所BGMカット' },
      { bit: 3, property: '店内CMカット' },
      { bit: 4, property: '事務所CMカット' },
      { bit: 9, property: 'バックアップ(ONで有効)' },
      { bit: 10, property: '店内ワンタッチ分指定カット' },
      { bit: 11, property: '事務所ワンタッチ分指定カット' },
      { bit: 12, property: 'インカムCMカット' },
      { bit: 13, property: 'インカムワンタッチ分指定カット' },
      { bit: 14, property: 'インカム音量(ON=インカム/OFF=ライン)' },
      { bit: 15, property: 'ログファイル複製(ON=済/OFF=未)' },
    ];

    bitDefinitions.forEach(({ bit, property }) => {
      const isBitSet = checkBit(binaryString, bit);
      result1.push({ property, value: isBitSet ? 'ON' : 'OFF' });
    });

    return result1;
  };

  const results_all = OthrProcessor({ other: fileContent?.if_config?.othr || [] });

  return (
    <div>
      {file && (
        <div>
          <Header />
          <h2>Othr Page</h2>
          <p>File Name: {file.name}</p>
          {fileContent && fileContent.if_config ? (
            <div>
              <h3>Othr Config</h3>
              {results_all.map((result, index) => (
                <div key={index}>
                  <h4>{`Result ${index + 1}`}</h4>
                  <ul>
                    {result.map(({ property, value }) => (
                      <li key={property}>{`${property}: ${value}`}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      )}
      {!file && <h2>Othr Page</h2>}
    </div>
  );
};

export default OthrComponent;
