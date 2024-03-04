import React from 'react';

export const MenuDetailTable0 = ({fileName, folder, volume, mixing, output, repeat, external, channel, params}) => {
  const rowHeaders = ["前チャイム", "コメント①", "コメント②", "コメント③", "後チャイム"];

  return (
    <table align='center'>
      <tbody>
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
      </tbody>
    </table>
  )
};

export const MenuDetailTable1 = ({channel, external}) => {
  return (
    <table align='center'>
      <tbody>
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

export const MenuDetailTable2 = ({action, cm, bgm, minute}) => {
  return (
    <table align='center'>
      <tbody>
        <tr textalign='center'>
          <td colSpan={4}><b>BGM/CMカット</b></td>
        </tr>
        <tr>
          <td>動作</td>
          <td colSpan={3}>{action}</td>
        </tr>
        <tr>
          <td></td>
          <td>店内<br />(エリア1)</td>
          <td>事務所<br />(エリア2)</td>
          <td>インカム<br />(エリア3)</td>
        </tr>
        <tr>
          <td>BGM</td>
          {bgm.slice(0, 3).map((value, index) => (
          <td key={index}>{value ? '☑' : ''}</td>
        ))}
        </tr>
        <tr>
          <td>CM</td>
          {cm.map((value, index) => (
          <td key={index}>{value ? '☑' : <td></td>}</td>
        ))}
        </tr>
        <tr>
          <td>分指定再生</td>
          {minute.map((value, index) => (
          <td key={index}>{value ? '☑' : <td></td>}</td>
        ))}
        </tr>
      </tbody>
    </table>
  )
};


export const MenuDetailTable3 = ({external3}) => {
    return (
      <table align='center'>
        <tbody>
          <tr textalign='center'>
            <td colSpan={3}><b>外部制御</b></td>
          </tr>
          <tr>
            <td>出力先</td>
            <td>{external3[0]}</td>
            <td>(外部制御1~16)</td>
        </tr>
        <tr>
            <td>動作</td>
            <td colSpan={2}>{external3[1]}</td>
        </tr>
        {external3[1] !== "秒数指定" && (
        <tr>
            <td>秒数</td>
            <td>{external3[2]}秒</td>
            <td>(1~99秒)</td>
        </tr>
        )}
        </tbody>
      </table>
    )
};

export const MenuDetailTable4 = ({subject, control, volume}) => {
    return (
      <table align='center'>
        <tbody>
          <tr textalign='center'>
            <td colSpan={3}><b>音量制御</b></td>
          </tr>
          <tr>
            <td>対象</td>
            <td colSpan={2}>{subject}</td>
        </tr>
        <tr>
            <td>制御</td>
            <td colSpan={2}>{control}</td>
        </tr>
        {control !== "秒数指定" && (
        <tr>
            <td>秒数</td>
            <td>{volume}秒</td>
            <td>(1~99秒)</td>
        </tr>
        )}
        </tbody>
        </table>
    )
};

export const MenuDetailTable5 = ({title, power}) => {
    return (
      <table align='center'>
        <tbody>
          <tr textalign='center'>
            <td colSpan={3}><b>{title}</b></td>
          </tr>
          <tr>
            <td>動作</td>
            <td colSpan={2}>{power}</td>
        </tr>
        </tbody>
        </table>
    )
};