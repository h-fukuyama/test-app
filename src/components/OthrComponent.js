import React from 'react';
import { useFileContext } from '../context/FileContext';
import Header from './Header';
import useFileContent from '../utils/useFileContent';
import { processBGMBand } from '../utils/bgmBand';
import { hexToBinary, checkBit } from '../utils/calculate';

const OthrComponent = () => {
  const { file } = useFileContext(); //fileとsetFileContextを取得
  const { fileContent } = useFileContent(file); //fileのファイルの内容を読み込む

  const OthrProcessor = ({ other }) => {
    const otherPropertyFunctions = [
      processFunction1, processFunction2, processFunction3, processFunction4, processFunction5, processFunction6, processFunction7, processFunction8, processFunction9, processFunction10,
      processFunction11, processFunction12, processFunction13, processFunction14, processFunction15, processFunction16, processFunction17, processFunction18, processFunction19, processFunction20,
      processFunction21, processFunction22, processFunction23, processFunction24, processFunction25, processFunction26, processFunction27, processFunction28, processFunction29, processFunction30,
      processFunction31, processFunction32, processFunction33
    ];

    const results = [];

    for (let i = 0; i < 33 ; i++) {
      const property = other[i];
      const func = otherPropertyFunctions[i];

      const result = func(property);

      results.push(result);
    }
    return results;
  };

  // ここから１行ずつのルール定義に入る(1~33行目)------------------------
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

  //未使用
  const processFunction2 = (property) => {
    const result2 = [];
    result2.push({ property, value: "未使用" });

    return result2;
  };

  //未使用
  const processFunction3 = (property) => {
    const result3 = [];
    result3.push({ property, value: "未使用" });

    return result3;
  };

  //未使用
  const processFunction4 = (property) => {
    const result4 = [];
    result4.push({ property, value: "未使用" });  

    return result4;
  };

  //未使用
  const processFunction5 = (property) => {
    const result5 = [];
    result5.push({ property, value: "未使用" });

    return result5;
  };

  const processFunction6 = (property) => {
    const result6 = [];
    result6.push({ property: "radiko放送局名", value: (property ? property.trim() : "") || '未設定' })

    return result6;
  };

  const processFunction7 = (property) => {
    const result7 = [];
    if (property) {
      const firstTwoDigits = property.substring(0, 2);
      const lastTwoDigits = parseInt(property.substring(2), 16);
      const bgm = processBGMBand(firstTwoDigits);
      result7.push({ property: 'BGMバンド', value: `${bgm}${lastTwoDigits}` });
    } else {
      result7.push({ property: 'BGMバンド', value: '未設定' });
    }
  
    return result7;
  };
  

  const processFunction8 = (property) => {
    const result8 = [];

    return result8;
  };

  const processFunction9 = (property) => {
    const result9 = [];

    return result9;
  };

  const processFunction10 = (property) => {
    const result10 = [];

    return result10;
  };

  const processFunction11 = (property) => {
    const result11 = [];

    return result11;
  };

  const processFunction12 = (property) => {
    const result12 = [];

    return result12;
  };

  const processFunction13 = (property) => {
    const result13 = [];

    return result13;
  };

  const processFunction14 = (property) => {
    const result14 = [];

    return result14;
  };

  const processFunction15 = (property) => {
    const result15 = [];

    return result15;
  };

  const processFunction16 = (property) => {
    const result15 = [];

    return result15;
  };

  const processFunction17 = (property) => {
    const result17 = [];

    return result17;
  };

  const processFunction18 = (property) => {
    const result18 = [];

    return result18;
  };

  const processFunction19 = (property) => {
    const result19 = [];

    return result19;
  };

  const processFunction20 = (property) => {
    const result20 = [];

    return result20;
  };

  const processFunction21 = (property) => {
    const result21 = [];

    return result21;
  };

  const processFunction22 = (property) => {
    const result22 = [];

    return result22;
  };

  const processFunction23 = (property) => {
    const result23 = [];

    return result23;
  };

  const processFunction24 = (property) => {
    const result24 = [];

    return result24;
  };

  const processFunction25 = (property) => {
    const result25 = [];

    return result25;
  };

  const processFunction26 = (property) => {
    const result26 = [];

    return result26;
  };

  const processFunction27 = (property) => {
    const result27 = [];

    return result27;
  };

  const processFunction28 = (property) => {
    const result28 = [];

    return result28;
  };

  const processFunction29 = (property) => {
    const result29 = [];

    return result29;
  };

  const processFunction30 = (property) => {
    const result30 = [];

    return result30;
  };

  const processFunction31 = (property) => {
    const result31 = [];

    return result31;
  };

  const processFunction32 = (property) => {
    const result32 = [];

    return result32;
  };

  const processFunction33 = (property) => {
    const result33 = [];

    return result33;
  };


// ここまで-----------------------------------------------------------
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
                <div>
                  {result.map(({ property, value }) => (
                    <div
                      key={property}
                      className={`${value === 'ON' ? 'underline' : ''} ${value === '未使用' ? 'line-through' : ''}`}
                    >
                      {`${property}: ${value}`}
                    </div>
                  ))}
                </div>
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
