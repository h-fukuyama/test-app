import React from 'react';

const ScTable = (/* 引数はid, call(呼出), back(呼戻) が必要? */) => {
    return (
        <table>
            <tr>
                <td>id(変数)</td>
                <td>ボタン</td>
                <td>呼出</td>
                <td>call(変数)</td>
                <td>詳細表示(id保持)</td>
            </tr>
            <tr>
                <td></td>
                <td>id+100</td>
                <td>呼戻</td>
                <td>back(変数)</td>
                <td>詳細表示(id保持)</td>
            </tr>
        </table>
    )
};

export default ScTable;