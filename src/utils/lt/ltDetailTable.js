import React from 'react';
import { Link } from 'react-router-dom';

const daysOfWeek = ['日', '月', '火', '水', '木', '金', '土'];

export const LtDetailTable = ({ week, title }) => {
    const weekArray = week.split('').map(Number).slice(-7).reverse();

    return (
        <table align='center'>
            <tbody>
                <tr align='center'>
                    <td width="30%" textalign="center">名前</td>
                    <td width="70%" textalign="center" colSpan={7}>{title}</td>
                </tr>
                <tr align='center'>
                    <td width="30%" textalign="center">曜日</td>
                    {weekArray.map((value, index) => (
                        <td key={index} width="10%" textalign="center">{value === 1 ? daysOfWeek[index] : ''}</td>
                    ))}
                </tr>
            </tbody>
        </table>
    );
};
export const LtDetailTable2 = ({ id, id2, hour, minute, call }) => {
    return (
        <table align='center'>
            <tbody>
                <tr align='center'>
                    <td width="10%" textalign="center">{id2}</td>
                    <td width="30%" textalign="center">{hour}:{minute}</td>
                    <td width="50%" textalign="center">{call}</td>
                    <td width="10%">
                        <Link to={`/menu/${id}/${id2}`}>
                            <button className="detail-button">詳細表示</button>
                        </Link>
                    </td>
                </tr>
            </tbody>
        </table>
    );
};