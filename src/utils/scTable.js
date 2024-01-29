import React from 'react';

const ScTable = ({ id, call, back }) => {
    return (
        <table>
            <tr>
                <td>{id}</td>
                <td>ボタン</td>
                <td>呼出</td>
                <td>{call}</td>
                <td>詳細表示(id保持)</td>
            </tr>
            <tr>
                <td></td>
                <td>{id+100}</td>
                <td>呼戻</td>
                <td>{back}</td>
                <td>詳細表示(id保持)</td>
            </tr>
        </table>
    )
};

export default ScTable;