  // １６進数を２進数に変換するヘルパー関数
  export const hexToBinary = (hexString) => {
    return (parseInt(hexString, 16).toString(2)).padStart(32, '0');
  };

  // 特定のビットがセットされているかを確認するヘルパー関数
  export const checkBit = (binaryString, position) => {
    return binaryString.charAt(binaryString.length - 1 - position) === '1';
  };

  //符号付16進数を10進数に変換するヘルパー関数
  export const hexToSignedDecimal = (hexString) => {
    return hexString > 0x7FFFFFFF ? hexString - 0x100000000 : hexString;
  }