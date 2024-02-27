import React, { useEffect } from 'react';
import { useFileContext } from '../context/FileContext';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import useFileContent from '../utils/useFileContent';
import { hexToBinary, checkBit, hexToSignedDecimal } from '../utils/calculate';
import { replaceEQ, eqSetting } from '../utils/menu/menuComponentFunction';
import { oneTouch } from '../utils/checkButton';

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
    const menuPropertyFunctions = [
      processFunction1, processFunction2, processFunction3, processFunction4, processFunction5, processFunction6, processFunction7, processFunction8, processFunction9, processFunction10,
      processFunction11, processFunction12, processFunction13, processFunction14, processFunction15, processFunction16, processFunction17
    ];

    const results = [];

    for (let i = 0; i < 17 ; i++) {
      const property = menu[i];
      if(property){
        const func = menuPropertyFunctions[i];
      
        const result = func(property);

        results.push(result);
      }
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
    const buttonStatus = binary.slice(0, 14).split('').map(bit => (bit === '0' ? '停止中' : '起動中'));
  
    if (buttonStatus.every(status => status === '停止中')) {
      return [{ property: 'ワンタッチボタン', value: '全て停止中' }];
    }
  
    if (buttonStatus.every(status => status === '起動中')) {
      return [{ property: 'ワンタッチボタン', value: '全て起動中' }];
    }
  
    const activeButtons = buttonStatus.reduce((acc, status, index) => {
      if (status === '起動中') {
        acc.push(index + 1);
      }
      return acc;
    }, []);
    return [{ property: '起動中のワンタッチボタン', value: activeButtons.join(',') }];
  };
  
  const processFunction3 = (property) => {
    if(property){
      const result3 = [];
      return result3;
    }
  };
  const processFunction4 = (property) => {
    const result4 = [{ property: '店内イコライザ', value: "" }];
    const hexPairs = property.match(/.{1,2}/g);
    hexPairs.map((element, index) => {
      if ( index >= 0 && index <= 2) {
        return result4.push({ property: replaceEQ(index), value: hexToSignedDecimal(element) });
      } else {
        return result4.push({ property: '種別', value: eqSetting(element)});
      }
    })
    return result4;
  };
  const processFunction5 = (property) => {
    const result5 = [{ property: '事務所イコライザ', value: "" }];
    const hexPairs = property.match(/.{1,2}/g);
    hexPairs.map((element, index) => {
      if ( index >= 0 && index <= 2) {
        return result5.push({ property: replaceEQ(index), value: hexToSignedDecimal(element) });
      } else {
        return result5.push({ property: '種別', value: eqSetting(element)});
      }
    })
    return result5;
  };
  const processFunction6 = (property) => {
    const result6 = [{ property: 'インカムイコライザ', value: "" }];
    const hexPairs = property.match(/.{1,2}/g);
    hexPairs.map((element, index) => {
      if ( index >= 0 && index <= 2) {
        return result6.push({ property: replaceEQ(index), value: hexToSignedDecimal(element) });
      } else {
        return result6.push({ property: '種別', value: eqSetting(element)});
      }
    })
    return result6;
  };
  const processFunction7 = (property) => {
    return [{property: 'LCDコントラスト', value: parseInt(property,10)}];
  };
  const processFunction8 = (property) => {
    return [{property: 'LCD明るさ', value: parseInt(property,10)}];
  };
  const processFunction9 = (property) => {
    return [{property: 'LCDエコモード明るさ', value: parseInt(property,10)}];
  };
  const processFunction10 = (property) => {
    return [{property: 'LCDエコモード移行時間', value: `${parseInt(property, 10)}分`}];
  };
  const processFunction11 = (property) => {
    return oneTouch(property,'ローカルタイマーON番号');
  };
  const processFunction12 = (property) => {
    return [{property: 'AUX入力レベル', value: hexToSignedDecimal(property)}];
  };
  const processFunction13 = (property) => {
    return [{property: 'マイク入力レベル', value: hexToSignedDecimal(property)}];
  };
  const processFunction14 = (property) => {
    return [{property: 'ライン入力レベル', value: hexToSignedDecimal(property)}];
  };
  const processFunction15 = (property) => {
    return [{property: 'AUTO~AUX終了の無音時間', value: `${parseInt(property, 16)}秒`}];
  };
  const processFunction16 = (property) => {
    return oneTouch(property,'ワンタッチボタン自動ON/OFF時間有効');
  };
  const processFunction17 = (property) => {
    return [{property: '時刻自動補正時間', value: `${parseInt(property, 16)}分`}];
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
