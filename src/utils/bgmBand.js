export const processBGMBand = (firstTwoDigits) => {
    if (firstTwoDigits >= '41' && firstTwoDigits <= '5A') {
      return String.fromCharCode(parseInt(firstTwoDigits, 16) - 0x40);
    } else if (firstTwoDigits >= '5B' && firstTwoDigits <= '74') {
      // UA~UZ
      return 'U' + String.fromCharCode(parseInt(firstTwoDigits, 16) - 0x5A);
    } else if (firstTwoDigits >= '75' && firstTwoDigits <= '8E') {
      // ZA~ZZ
      return 'Z' + String.fromCharCode(parseInt(firstTwoDigits, 16) - 0x74);
    } else if (firstTwoDigits === 'FF') {
      // AUX
      return 'AUX';
    } else {
      // それ以外の場合は不明
      return '不明';
    }
  };