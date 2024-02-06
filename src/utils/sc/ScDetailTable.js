import React from 'react';
import { useLocation  } from 'react-router-dom';


export const ScDetailTable1 = ({fileName, folder, volume, mixing, output, repeat, external, channel, params}) => {
    const location=useLocation();
    console.log(`ScDetailTable1でのlocation: ${location}`);
    const rowHeaders = ["前チャイム", "コメント①", "コメント②", "コメント③", "後チャイム"];
  
    return (
      <table align='center'>
          <tr text-align='center'>
            <td colSpan={5}><b>コメント再生</b></td>
          </tr>
          <tr>
            <td></td>
            <td>ファイル名</td>
            <td>格納フォルダ</td>
            <td>再生音量</td>
            <td>ミキシング</td>
          </tr>
          {rowHeaders.map((header, index) => (
            <tr key={index}>
              <td>{header}</td>
              <td>{fileName[index]}</td>
              <td>{folder[index]}</td>
              <td>{volume[index]}</td>
              <td>{mixing[index]}%</td>
            </tr>
          ))}
            <tr>
                <td colSpan={1}>出力先</td>
                <td></td>
                <td>{output[0]}</td>
                <td>{output[1]}</td>
                <td>{output[2]}</td>
            </tr>
            <tr>
                <td colSpan={1}>リピート感覚</td>
                <td colSpan={4}>{repeat}秒</td>
            </tr>
            <tr>
                <td colSpan={1}>外部出力</td>
                <td colSpan={4}>{external[0]}</td>
            </tr>
            {external[0] !== "利用しない" && (
                <>
                    <tr>
                        <td>出力先</td>
                        <td>{external[1]}</td>
                        <td colSpan={3}>(外部制御1~16)</td>
                    </tr>
                    <tr>
                        <td>動作</td>
                        <td colSpan={4}>{external[2]}</td>
                    </tr>
                    {external[2] !== "秒数指定" && (
                    <tr>
                        <td>秒数</td>
                        <td colSpan={3}>{external[3]}秒</td>
                        <td>(1~99秒)</td>
                    </tr>
                    )}
                </>
            )}
            <tr>
                <td>ch変更</td>
                <td colSpan={4}>{channel[0]}</td>
            </tr>
            {channel[0] !== "利用しない" && (
                <>
                    <tr>
                        <td>チャンネル</td>
                        <td colSpan={4}>{channel[1]}</td>
                    </tr>
                    <tr>
                        <td>呼び戻し</td>
                        <td colSpan={4}>{params}</td>
                    </tr>
                </>
            )}
        </table>
    )
};