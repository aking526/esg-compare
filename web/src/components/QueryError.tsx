import React from "react";

interface QueryErrorProps {
	message?: string;
}

const QueryError: React.FC<QueryErrorProps> = ({ message }) => {
	return (
		<div className="flex flex-row justify-center items-center text-3xl my-96">
			<h2 className="mx-3.5">{message}</h2>
		</div>
	);
};

export default QueryError;