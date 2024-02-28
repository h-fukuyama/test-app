import { processBGMBand } from "../bgmBand";
import { replaceValue, replaceVolume, generateOutput } from "../sc/scComponentFunction";

export const replaceEQ = (value) => {
    switch (value) {
      case 0:
        return "低域";
      case 1:
        return "中域";
      case 2:
        return "高域";  
      default:
        return value; // 何も該当しない場合は元の値をそのまま返す
    }
  };

  export const eqSetting = (value) => {
    switch (value) {
      case '00':
        return "マニュアル";
      case '01':
        return "POPS";
      case '02':
        return "ROCK";
      case '03':
        return "JAZZ/FUSION";
      case '04':
        return "VOCAL";
      case '05':
        return "CLUB/DANCE";
      case '06':
        return "CAFE";
      case '07':
        return "LOUNGE";
      case '08':
        return "CLASSIC";  
      case '09':
        return "HEALING";
      case '0A':
        return "イージーリスニング/インスト";            
      default:
        return value; // 何も該当しない場合は元の値をそのまま返す
    }
  };

  export const getActionResult = (menu, i) => {
    switch (menu[i]) {
      case '01':
        const firstElement = `電源${replaceValue(menu[i + 33])}`;
        const secondElement = menu[i + 448] !== undefined ? `電源${replaceValue(menu[i + 448])}` : "";
        return [firstElement, secondElement];
        
      case '02':
        const firstElement2 = `チャンネル変更 ${processBGMBand(menu[i + 37])}${parseInt(menu[i + 38], 16)}`;
        const secondElement2 = "ユーザ設定不可";
        return [firstElement2, secondElement2];
      
      case '03':
        const firstElement3 = `BGM/CMカット ${generateOutput(menu[i + 46])}`;
        const secondElement3 = `BGM/CMカット ${generateOutput(menu[i + 494])}`;
        return [firstElement3, secondElement3];
      
      case '04':
        const firstElement4 = `ワンタッチボタン${parseInt(menu[i + 47], 16)} ${replaceValue(menu[i + 48])}`;
        const secondElement4 = menu[i + 448] !== undefined ? `ワンタッチボタン${parseInt(menu[i + 448], 16)} ${replaceValue(menu[i + 496])}` : "";
        return [firstElement4, secondElement4];
      
      case '05':
        const firstElement5 = `外部制御${parseInt(menu[i + 49], 16)} ${replaceValue(menu[i + 50])}`;
        const secondElement5 = menu[i + 448] !== undefined ? `外部制御${parseInt(menu[i + 448], 16)} ${replaceValue(menu[i + 498])}` : "";
        return [firstElement5, secondElement5];
      
      case '06':
        const firstElement6 = `ボリューム ${replaceVolume(menu[i + 53])}`;
        const secondElement6 = menu[i + 448] !== undefined ? `ボリューム ${replaceVolume(menu[i + 501])}` : "";
        return [firstElement6, secondElement6];
      
      case '07':
        const firstElement7 = `AUX ${replaceValue(menu[i + 55])}`;
        const secondElement7 = menu[i + 448] !== undefined ? `AUX ${replaceValue(menu[i + 503])}` : "";
        return [firstElement7, secondElement7];
      
      default:
        return [menu[i], menu[i + 22400]];
    }
  };