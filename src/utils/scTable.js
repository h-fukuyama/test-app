import React from 'react';
import { Link } from 'react-router-dom';

const ScTable = ({ id, call, back }) => {
    return (
        <table>
            <tr>
                <td>{id}</td>
                <td>ボタン</td>
                <td>呼出</td>
                <td>{call}</td>
                <td>
                    <Link to={`/scDetail/${id}`}>
                        <button className="detail-button">詳細表示</button>
                    </Link>
                </td>
            </tr>
            <tr>
                <td></td>
                <td>{id+100}</td>
                <td>呼戻</td>
                <td>{back}</td>
                <td>
                    <Link to={`/scDetail/${id}`}>
                        <button className="detail-button">詳細表示</button>
                    </Link>
                </td>
            </tr>
        </table>
    )
};

export default ScTable;