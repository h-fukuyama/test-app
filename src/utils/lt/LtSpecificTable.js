import React from 'react';

export const LtSpecificTable0 = ({fileName, folder, volume, mixing, output, external, channel, hour, minute }) => {
  const rowHeaders = ["前チャイム", "コメント①", "コメント②", "コメント③", "後チャイム"];

  return (
    <table align='center'>
      <tbody>
      <tr textalign='center'>
        <td colSpan={1}>時刻</td>
        <td colSpan={4}><b>{hour}:{minute}</b></td>
      </tr>
      <tr textalign='center'>
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
        </>
      )}
      </tbody>
    </table>
  )
};

export const LtSpecificTable1 = ({title, power, hour, minute}) => {
    return (
      <table align='center'>
        <tbody>
        <tr textalign='center'>
            <td>時刻</td>
            <td ><b>{hour}:{minute}</b></td>
        </tr>
        <tr textalign='center'>
          <td>機能</td>
          <td><b>{title}</b></td>
        </tr>
        <tr>
          <td>動作</td>
          <td>{power}</td>
        </tr>
        </tbody>
      </table>
    )
};

export const LtSpecificTable2 = ({channel, external, hour, minute}) => {
  return (
    <table align='center'>
      <tbody>
        <tr textalign='center'>
            <td>時刻</td>
            <td ><b>{hour}:{minute}</b></td>
        </tr>
        <tr textalign='center'>
          <td colSpan={2}><b>チャンネル変更</b></td>
        </tr>
        <tr>
          <td>チャンネル</td>
          <td>{channel}</td>
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
        </tbody>
      </table>
  )
};

export const LtSpecificTable3 = ({external2, hour, minute}) => {
    return (
      <table align='center'>
        <tbody>
            <tr textalign='center'>
                <td>時刻</td>
                <td colSpan={2}><b>{hour}:{minute}</b></td>
            </tr>  
          <tr textalign='center'>
            <td colSpan={3}><b>外部制御</b></td>
          </tr>
          <tr>
            <td>出力先</td>
            <td>{external2[0]}</td>
            <td>(外部制御1~16)</td>
        </tr>
        <tr>
            <td>動作</td>
            <td colSpan={2}>{external2[1]}</td>
        </tr>
        {external2[1] !== "秒数指定" && (
        <tr>
            <td>秒数</td>
            <td>{external2[2]}秒</td>
            <td>(1~99秒)</td>
        </tr>
        )}
        </tbody>
      </table>
    )
};