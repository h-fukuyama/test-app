import { hexToBinary } from '../utils/calculate';

export const checkButton = (property, buttonCount, buttonName) => {
    const results = [];
    const binaryString = hexToBinary(property);
  
    for (let i = 0; i < buttonCount; i++) {
      const bitValue = binaryString[i];
      const buttonName = `ボタン${i + 1}`;
      const result = { property: buttonName, value: bitValue === '0' ? '許可' : '禁止' };
      results.push(result);
    }

    const deniedButtons = results.filter((result) => result.value === '禁止');
    
    if (results.every((result) => result.value === '許可')) {
      return [{ property: buttonName, value: '全て許可' }];
    } else if (results.every((result) => result.value === '禁止')) {
      return [{ property: buttonName, value: '全て禁止' }];
    }
  
    return deniedButtons;
  };