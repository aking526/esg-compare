import React from "react";
import { Link } from "react-router-dom";
import { ICompanyData } from "../../types/ICompanyData";
import DataRefToText from "../../mods/DataRefToText";
import { make2dArray } from "../../utils/makeArray";
import StylingProps from "../../types/StylingProps";

interface TableProps {
	heading: string[];
	body: string[][];
	metric: string;
}

const Table: React.FC<TableProps> = ({ heading, body, metric }) => {
	return (
		<table>
			<thead>
				<tr>
					{heading.map((head, idx) => {
						const isGreen = head === DataRefToText[metric] ? "text-green-600" : "";
						return <th key={idx} className={`pt-2 p-2 bg-slate-100 sticky top-0 ${isGreen}`}>{head}</th>
					})}
				</tr>
			</thead>
			<tbody>
				{body.map((row, idx) => <TableRow key={idx} row={row} styles="pt-2 px-2" />)}
			</tbody>
		</table>
	);
};

interface TableRowProps extends StylingProps {
	row: string[];
}

const TableRow: React.FC<TableRowProps> = ({ row, styles }) => {
	return (
		<tr>
			{row.map((val: string, idx: number) => {
				if (idx == 2) return;
				if (idx === 1) return <td key={idx} className={`${styles} text-blue-900 text-center`}><Link to={`/company/${row[2]}`}>{val}</Link></td>;
				return <td key={idx} className="text-center">{val}</td>;
			})}
		</tr>
	);
};

interface RankingsProps {
	rankings: ICompanyData[];
	metric: string;
	start: number;
	reverse: boolean;
}

const RankingsTable: React.FC<RankingsProps> = ({ rankings, metric, start, reverse }) => {
	const tableHeading: string[] = ["Rank", "Company", "Total Score", "Environment Score", "Social Score", "Governance Score"];
	const getFrom: string[] = ["name", "ticker", "total_score", "environment_score", "social_score", "governance_score"];
	const tableBody: string[][] = make2dArray(getFrom.length, rankings.length, "");

	const checkIn = (d: string) => {
		for (let k = 0; k < getFrom.length; k++) {
			if (String(getFrom[k]) === d) return true;
		}
		return false;
	};

	for (let i = 0; i < rankings.length; i++) {
		const curr = rankings[i];
		tableBody[i][0] = String(start+i+1);
		for (const d in curr) {
			if (!checkIn(d)) continue;
			let j = getFrom.indexOf(d);
			tableBody[i][j+1] = curr[d];
		}
	}

	if (reverse) tableBody.reverse();

	return (
		<div id="#rankings" className="relative mt-2 ml-10 mr-5 px-5 pb-3 rounded-xl border-none shadow-light overflow-y-auto h-rankings-table-h">
			<Table heading={tableHeading} body={tableBody} metric={metric}/>
		</div>
	);
};

export default RankingsTable;