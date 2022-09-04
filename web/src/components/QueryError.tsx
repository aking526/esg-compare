import React from "react";
import { Error } from "@mui/icons-material";

interface QueryErrorProps {
	message?: string;
}

const QueryError: React.FC<QueryErrorProps> = ({ message }) => {
	return (
		<div className="flex flex-row justify-center items-center text-3xl my-96">
			<h2 className="mx-5">{message}</h2>
			<Error />
		</div>
	);
};

export default QueryError;