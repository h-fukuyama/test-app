import React from 'react';
import { Link } from 'react-router-dom';

const ScTable = ({ id, call, back }) => {
    return (
        <table align='center'>
            <tr text-align='center'>
                <td width="100px" textAlign="center">{id}</td>
                <td width="100px">ボタン</td>
                <td width="100px">呼出</td>
                <td width="600px"><b>{call}</b></td>
                <td width="150px" rowSpan={2}>
                    <Link to={`/scDetail/${id}`}>
                        <button className="detail-button">詳細表示</button>
                    </Link>
                </td>
            </tr>
            <tr>
                <td></td>
                <td>{id+100}</td>
                <td>呼戻</td>
                <td><b>{back}</b></td>
            </tr>
        </table>
    )
};

export default ScTable;