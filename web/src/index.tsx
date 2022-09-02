import React from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider,  } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import './index.css';
import App from './App';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			refetchOnMount: false,
			refetchOnReconnect: false,
			retry: false,
			staleTime: 5*60*1000
		}
	}
});

ReactDOM.render(
	<QueryClientProvider client={queryClient}>
		<App />
		<ReactQueryDevtools />
	</QueryClientProvider>,
	document.getElementById("root") as HTMLElement
);
