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