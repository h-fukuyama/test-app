import React from 'react';
import { Link  } from 'react-router-dom';

export const MenuTable = ({ id, call }) => {
    return (
        <table align='center'>
            <tbody>
            <tr align='center'>
                <td width="100px" textalign="center">{id}.</td>
                <td width="100px">ボタン{id}</td>
                <td width="500px"><b>{call}</b></td>
                <td width="150px">
                    <Link to={`/menu/${id}`}>
                        <button className="detail-button">詳細表示</button>
                    </Link>
                </td>
            </tr>
            </tbody>
        </table>
    )
};