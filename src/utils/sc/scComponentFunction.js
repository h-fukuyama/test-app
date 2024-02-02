import { processBGMBand } from "../bgmBand";

export const replaceValue = (value) => {
    switch (value) {
      case '00':
        return "ON⇔OFF";
      case '01':
        return "ON";
      case '02':
        return "OFF";
      case '03' :
        return "ワンショット";
      case '04' :
        return "数値の指定";    
      default:
        return value; // 何も該当しない場合は元の値をそのまま返す
    }
};

export const generateOutput = (input) => {
    const settingValue = {
        '00': 'カット⇔解除',
        '01': 'カット',
        '02': '解除',
    }[input] || '不明';
    return settingValue;
};

export const replaceVolume = (value) => {
    switch (value) {
      case '00':
        return "数値の指定";
      case '01':
        return "アップ";
      case '02':
        return "ダウン";  
      default:
        return value; // 何も該当しない場合は元の値をそのまま返す
    }
};

export const mapFolderValue = (value) => {
  switch (value) {
    case '00':
      return '未設定';
    case '30':
      return 'センタCM';
    case '31':
      return 'オリジナル録音';
    case '32':
      return '取り込み音源';
    // 他にも条件があれば追加
    default:
      return value; // マッチしない場合は元の値を返す
  }
};

export const BinaryConverter = ( input ) => {
  const binaryString = (+input).toString(2);
  const reversedBinaryArray = binaryString.split('').reverse();

  const output = reversedBinaryArray.map((bit, index) => {
    if (bit === '1') {
      switch (index) {
        case 0:
          return '店内';
        case 1:
          return '事務所';
        case 2:
          return 'インカム';
        // 他のビットに対する処理も追加
        default:
          return '';
      }
    }
    return '';
  });

  return output;
}

export const replaceControl = (value) => {
  switch (value) {
    case '03':
      return "ワンショット";
    case '04':
      return "秒数指定";
    case '05':
      return "再生中";  
    default:
      return value; // 何も該当しない場合は元の値をそのまま返す
  }
};

export const getActionResult1 = (sc, i) => {
    switch (sc[i]) {
      case '01':
        return [
          `電源${replaceValue(sc[i + 33])}`,
          `電源${replaceValue(sc[i + 22433])}`,
        ];
      case '02':
        return [
          `チャンネル変更 ${processBGMBand(sc[i + 37])}${parseInt(sc[i + 38], 16)}`,
          "ユーザ設定不可",
        ];
      case '03':
        return [`BGM/CMカット ${generateOutput(sc[i + 46])}`, `BGM/CMカット ${generateOutput(sc[i + 22446])}`];
      case '04':
        return [
          `ワンタッチボタン${parseInt(sc[i + 47], 16)} ${replaceValue(sc[i + 48])}`,
          `ワンタッチボタン${parseInt(sc[i + 22447], 16)} ${replaceValue(sc[i + 22448])}`,
        ];
      case '05':
        return [
          `外部制御${parseInt(sc[i + 49], 16)} ${replaceValue(sc[i + 50])}`,
          `外部制御${parseInt(sc[i + 22449], 16)} ${replaceValue(sc[i + 22450])}`,
        ];
      case '06':
        return [`ボリューム ${replaceVolume(sc[i + 53])}`, `ボリューム ${replaceVolume(sc[i + 22453])}`];
      case '07':
        return [`AUX ${replaceValue(sc[i + 55])}`, `AUX ${replaceValue(sc[i + 22455])}`];
      default:
        return [sc[i], sc[i + 22400]];
    }
  };

  export const getActionResult2 = (sc, i) => {
    switch (sc[i]) {
      case '01':
        const firstElement = `電源${replaceValue(sc[i + 33])}`;
        const secondElement = sc[i + 448] !== undefined ? `電源${replaceValue(sc[i + 448])}` : "";
        return [firstElement, secondElement];
        
      case '02':
        const firstElement2 = `チャンネル変更 ${processBGMBand(sc[i + 37])}${parseInt(sc[i + 38], 16)}`;
        const secondElement2 = "ユーザ設定不可";
        return [firstElement2, secondElement2];
      
      case '03':
        const firstElement3 = `BGM/CMカット ${generateOutput(sc[i + 46])}`;
        const secondElement3 = `BGM/CMカット ${generateOutput(sc[i + 494])}`;
        return [firstElement3, secondElement3];
      
      case '04':
        const firstElement4 = `ワンタッチボタン${parseInt(sc[i + 47], 16)} ${replaceValue(sc[i + 48])}`;
        const secondElement4 = sc[i + 448] !== undefined ? `ワンタッチボタン${parseInt(sc[i + 448], 16)} ${replaceValue(sc[i + 496])}` : "";
        return [firstElement4, secondElement4];
      
      case '05':
        const firstElement5 = `外部制御${parseInt(sc[i + 49], 16)} ${replaceValue(sc[i + 50])}`;
        const secondElement5 = sc[i + 448] !== undefined ? `外部制御${parseInt(sc[i + 448], 16)} ${replaceValue(sc[i + 498])}` : "";
        return [firstElement5, secondElement5];
      
      case '06':
        const firstElement6 = `ボリューム ${replaceVolume(sc[i + 53])}`;
        const secondElement6 = sc[i + 448] !== undefined ? `ボリューム ${replaceVolume(sc[i + 501])}` : "";
        return [firstElement6, secondElement6];
      
      case '07':
        const firstElement7 = `AUX ${replaceValue(sc[i + 55])}`;
        const secondElement7 = sc[i + 448] !== undefined ? `AUX ${replaceValue(sc[i + 503])}` : "";
        return [firstElement7, secondElement7];
      
      default:
        return [sc[i], sc[i + 22400]];
    }
  };
  