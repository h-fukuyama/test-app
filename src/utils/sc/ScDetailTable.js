import React from 'react';

export const ScDetailTable1 = ({fileName, folder, volume, mixing}) => {
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
            <tr>
                <td>前チャイム</td>
                <td>{fileName[0]}</td>
                <td>{folder[0]}</td>
                <td>{volume[0]}</td>
                <td>{mixing[0]}%</td>
            </tr>
            <tr>
                <td>コメント①</td>
                <td>{fileName[1]}</td>
                <td>{folder[1]}</td>
                <td>{volume[1]}</td>
                <td>{mixing[1]}%</td>
            </tr>
            <tr>
                <td>コメント②</td>
                <td>{fileName[2]}</td>
                <td>{folder[2]}</td>
                <td>{volume[2]}</td>
                <td>{mixing[2]}%</td>
            </tr>
            <tr>
                <td>コメント③</td>
                <td>{fileName[3]}</td>
                <td>{folder[3]}</td>
                <td>{volume[3]}</td>
                <td>{mixing[3]}%</td>
            </tr>
            <tr>
                <td>後チャイム</td>
                <td>{fileName[4]}</td>
                <td>{folder[4]}</td>
                <td>{volume[4]}</td>
                <td>{mixing[4]}%</td>
            </tr>
            <tr>
                <td>出力先</td>
                <td></td>
                <td>エリア１(変数)</td>
                <td>エリア２(変数)</td>
                <td>インカム３(変数)</td>
            </tr>
            <tr>
                <td colSpan={1}>外部出力</td>
                <td colSpan={4}>利用する/利用しない(変数)</td>
            </tr>
            <tr>
                <td>出力先</td>
                <td>出力先(変数)</td>
                <td colSpan={3}>(外部制御1~16)</td>
            </tr>
            <tr>
                <td>動作</td>
                <td colSpan={4}>動作(変数)</td>
            </tr>
            <tr>
                <td>秒数</td>
                <td colSpan={3}>秒数(変数)</td>
                <td>(1~99秒)</td>
            </tr>
            <tr>
                <td>ch変更</td>
                <td colSpan={4}>利用する/しない</td>
            </tr>
            <tr>
                <td>チャンネル</td>
                <td colSpan={4}>チャンネル名(変数)</td>
            </tr>
            <tr>
                <td>呼び戻し</td>
                <td colSpan={4}>利用する/しない(変数)</td>
            </tr>
        </table>
    )
};