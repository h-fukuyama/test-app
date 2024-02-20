import React, { useEffect } from 'react';
import { useFileContext } from '../context/FileContext';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import useFileContent from '../utils/useFileContent';
import { hexToBinary, checkBit, hexToSignedDecimal } from '../utils/calculate';
import { replaceEQ, eqSetting } from '../utils/menu/menuComponentFunction';

const MenuComponent = () => {
  const { file } = useFileContext(); //fileとsetFileContextを取得
  const { fileContent } = useFileContent(file); //fileのファイルの内容を読み込む
  const navigate = useNavigate();

  useEffect(() => {
    if (!file) {
      navigate('/reset');
    }
  }, [file, navigate]);

  const MenuProcessor = ({ menu }) => {
    console.log(menu);
    const menuPropertyFunctions = [
      processFunction1, processFunction2, processFunction3, processFunction4, processFunction5, processFunction6, processFunction7, processFunction8, processFunction9, processFunction10,
      processFunction11, processFunction12, processFunction13, processFunction14, processFunction15, processFunction16, processFunction17
    ];

    const results = [];

    for (let i = 0; i < 4 ; i++) {
      const property = menu[i];
      const func = menuPropertyFunctions[i];

      const result = func(property);

      results.push(result);
    }
    return results;
  };

  // ここから１行ずつのルール定義に入る------------------------
  const processFunction1 = (property) => {
    const result1 = [];
    const binaryString = hexToBinary(property);

    const bitDefinitions = [
      { bit: 0, property: 'AUX(ONで「手動」)' },
      { bit: 1, property: 'チャンネルロック' },
      { bit: 2, property: 'ACアウトレット(ONで「連動」)' },
    ];

    bitDefinitions.forEach(({ bit, property }) => {
      const isBitSet = checkBit(binaryString, bit);
      result1.push({ property, value: isBitSet ? 'ON' : 'OFF' });
    });

    return result1;
  };
  const processFunction2 = (property) => {
    const binary = parseInt(property, 16).toString(2).padStart(16, '0');
    const buttonStatus = [];
    for ( let i = 0; i < 14; i++ ){
      const mode = binary[i] === '0' ? '停止中' : '起動中';
      buttonStatus.push(mode);
    }
    if(buttonStatus.every(status => status === '停止中')) {
      return [{property:'ワンタッチボタン', value:'全て停止中'}];
    } else if(buttonStatus.every(status => status === '起動中')) {
      return [{property:'ワンタッチボタン', value: '全て起動中'}];
    } else {
      const activeButtons = buttonStatus.reduce((acc, status, index) => {
        if (status === '起動中') {
          acc.push(index + 1);
        }
        return acc;
      }, []);
      return [{property: '起動中のワンタッチボタン', value: activeButtons.join(',')}];
    }
  };
  const processFunction3 = (property) => { //一旦無視
    // const hexPairs = property?.match(/.{1,2}/g);
    // let prevDecimal = parseInt(hexPairs[0],16);
    // let isAscending = true;
    // for ( let i = 1; i < hexPairs.length; i++ ) {
    //   const currentDecimal = parseInt(hexPairs[i], 16);
    //   if (currentDecimal < prevDecimal) {
    //     isAscending = false; // 昇順でない場合フラグをfalseにして終了
    //     break;
    //   }
    //   prevDecimal = currentDecimal; // 前の数字を更新
    // }
    
    // if (!isAscending) {
    // }
    return [];
  };
  const processFunction4 = (property) => {
    console.log(property);
    const result4 = [{ property: '店内イコライザ', value: "" }];
    const hexPairs = property.match(/.{1,2}/g);
    hexPairs.map((element, index) => {
      if ( index >= 0 && index <= 2) {
        return result4.push({ property: replaceEQ(index), value: hexToSignedDecimal(element) });
      } else {
        return result4.push({ property: '種別', value: eqSetting(element)});
      }
    })
    console.log(result4);
    return result4;
  };
  const processFunction5 = (property) => {
    return [];
  };
  const processFunction6 = (property) => {
    return [];
  };
  const processFunction7 = (property) => {
    return [];
  };
  const processFunction8 = (property) => {
    return [];
  };
  const processFunction9 = (property) => {
    return [];
  };
  const processFunction10 = (property) => {
    return [];
  };
  const processFunction11 = (property) => {
    return [];
  };
  const processFunction12 = (property) => {
    return [];
  };
  const processFunction13 = (property) => {
    return [];
  };
  const processFunction14 = (property) => {
    return [];
  };
  const processFunction15 = (property) => {
    return [];
  };
  const processFunction16 = (property) => {
    return [];
  };
  const processFunction17 = (property) => {
    return [];
  };

  const results_all = MenuProcessor({ menu: fileContent?.if_config?.menu || [] });

  return (
    <div>
      {file && (
        <div>
          <Header />
          <h2>Menu Page</h2>
          <p>File Name: {file.name}</p>
          {fileContent && fileContent.if_config ? (
            <div>
              {results_all.map((result, index) => (
                <div key={index}>
                  <h4>{`Result ${index + 1}`}</h4>
                  <div>
                    {result.map(({ property, value }) => (
                      <div
                        key={property}
                        className={`${value === 'ON' ? 'underline' : ''} ${value === '未使用' ? 'line-through' : ''}`}
                        style={{ marginBottom: '0.5em' }}
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
      {!file && (
        <p>Resetting...</p>
      )}
    </div>
  );
};

export default MenuComponent;
