import { hexToBinary } from '../utils/calculate';

export const checkButton = (property, buttonCount, buttonDisplayName) => {
  const results = [];
  // console.log(property);
  const binaryString = hexToBinary(property);

  for (let i = 0; i < buttonCount; i++) {
    const bitValue = binaryString[i];
    const touchButtonName = `ボタン${i + 1}`;
    const result = { property: touchButtonName, value: bitValue === '0' ? '許可' : '禁止' };
    results.push(result);
  }
  const deniedButtons = results.filter((result) => result.value === '禁止');
  if (results.every((result) => result.value === '許可')) {
    return [{ property: buttonDisplayName, value: '全て許可' }];
  } else if (results.every((result) => result.value === '禁止')) {
    return [{ property: buttonDisplayName, value: '全て禁止' }];
  }

  return deniedButtons;
};


export const channelMask = (property, prefix) => {
  if (property) {
    const binaryArray = property.split('').map((hexDigit) => {
      const binaryDigit = parseInt(hexDigit, 16).toString(2).padStart(4, '0');
      return binaryDigit;
    });

    const binaryString = binaryArray.join('');
    const groupedResults = {};

    for (let i = 0; i < 100; i++) {
      const bitValue = binaryString[i];
      const buttonName = `${i + 1}`;
      const result = { property: buttonName, value: bitValue === '0' ? 'OFF' : 'ON' };

      if (!groupedResults[result.value]) {
        groupedResults[result.value] = [];
      }

      groupedResults[result.value].push(result);
    }

    let resultEntries = []; // 初期値を空の配列に設定

    if (Object.keys(groupedResults).length === 1 && 'ON' in groupedResults) {
      resultEntries = [{ property: `${prefix}チャンネルマスク`, value: '全てON' }];
    } else if (Object.keys(groupedResults).length === 1 && 'OFF' in groupedResults) {
      resultEntries = [{ property: `${prefix}チャンネルマスク`, value: '全てOFF' }];
    } else {
      resultEntries = Object.entries(groupedResults)
        .filter(([value]) => value === 'ON')
        .map(([value, buttons]) => ({
          property: `${prefix}チャンネルマスク(ONのみ表示): `,
          value: `${buttons.map((button) => button.property).join(', ')}`
        }));
    }

    console.log(resultEntries);
    return resultEntries;
  } else {
    return [{ property: `${prefix}チャンネルマスク:`, value: '不明' }];
  }
};
