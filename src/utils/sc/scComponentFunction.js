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

export const getActionResult = (sc, i) => {
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