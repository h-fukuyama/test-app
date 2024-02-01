import React from 'react';

export const ScDetailTable1 = ({/* 引数 */}) => {
    return (
        <table align='center'>
            <tr text-align='center'>
                <td colSpan={4}>コメント再生</td>
            </tr>
            <tr>
                <td></td>
                <td></td>
                <td>再生音量</td>
                <td>ミキシング</td>
            </tr>
            <tr>
                <td>前チャイム</td>
                <td>ファイル名(変数)</td>
                <td>再生音量値(変数)</td>
                <td>ミキシング(変数)</td>
            </tr>
            <tr>
                <td>コメント①</td>
                <td>ファイル名(変数)</td>
                <td>再生音量値(変数)</td>
                <td>ミキシング(変数)</td>
            </tr>
            <tr>
                <td>コメント②</td>
                <td>ファイル名(変数)</td>
                <td>再生音量値(変数)</td>
                <td>ミキシング(変数)</td>
            </tr>
            <tr>
                <td>コメント③</td>
                <td>ファイル名(変数)</td>
                <td>再生音量値(変数)</td>
                <td>ミキシング(変数)</td>
            </tr>
            <tr>
                <td>後チャイム</td>
                <td>ファイル名(変数)</td>
                <td>再生音量値(変数)</td>
                <td>ミキシング(変数)</td>
            </tr>
            <tr>
                <td>出力先</td>
                <td>エリア１(変数)</td>
                <td>エリア２(変数)</td>
                <td>インカム３(変数)</td>
            </tr>
            <tr>
                <td colSpan={1}>外部出力</td>
                <td colSpan={3}>利用する/利用しない(変数)</td>
            </tr>
            <tr>
                <td>出力先</td>
                <td>出力先(変数)</td>
                <td colSpan={2}>(外部制御1~16)</td>
            </tr>
            <tr>
                <td>動作</td>
                <td colSpan={3}>動作(変数)</td>
            </tr>
            <tr>
                <td>秒数</td>
                <td colSpan={2}>秒数(変数)</td>
                <td>(1~99秒)</td>
            </tr>
            <tr>
                <td>ch変更</td>
                <td colSpan={3}>利用する/しない</td>
            </tr>
            <tr>
                <td>チャンネル</td>
                <td colSpan={3}>チャンネル名(変数)</td>
            </tr>
            <tr>
                <td>呼び戻し</td>
                <td colSpan={3}>利用する/しない(変数)</td>
            </tr>
        </table>
    )
};