import React from 'react';
import { Link } from 'react-router-dom';

const daysOfWeek = ['日', '月', '火', '水', '木', '金', '土'];

const LtMainTable = ({ power, id, week, title }) => {
    return (
        <table align='center'>
            <tbody>
                <tr align='center'>
                    <td width="10%" textalign="center">{power}</td>
                    <td width="10%" textalign="center">{id}.</td>
                    {week.map((value, index) => (
                        <td key={index} width="10%" textalign="center">{value === 1 ? daysOfWeek[index] : ''}</td>
                    ))}
                    <td width="20%"><b>{title}</b></td>
                    <td width="10%">
                        <Link to={`/lt/${id}`}>
                            <button className="detail-button">詳細表示</button>
                        </Link>
                    </td>
                </tr>
            </tbody>
        </table>
    );
};

export default LtMainTable;
