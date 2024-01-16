export const processBGMBand = (firstTwoDigits) => {
    if (firstTwoDigits >= '41' && firstTwoDigits <= '5A') {
      return String.fromCharCode(parseInt(firstTwoDigits, 16));
    } else if (firstTwoDigits >= '5B' && firstTwoDigits <= '74') {
      // UA~UZ
      return 'U' + String.fromCharCode(parseInt(firstTwoDigits, 16) - 26);
    } else if (firstTwoDigits >= '75' && firstTwoDigits <= '8E') {
      // ZA~ZZ
      return 'Z' + String.fromCharCode(parseInt(firstTwoDigits, 16) - 52);
    } else if (firstTwoDigits === 'FF') {
      // AUX
      return 'AUX';
    } else if (firstTwoDigits === '00') {
        // 未設定
        return '未設定';
    } else {
      // それ以外の場合は不明
      return '不明';
    }
  };