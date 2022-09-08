export function convertDateToUnix(date: Date) {
	return parseInt((new Date(date).getTime() / 1000).toFixed(0));
}

export function convertUnixToDate(unix_timestamp: number) {
	const a = new Date(unix_timestamp * 1000);
	const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	const year = a.getFullYear();
	// const month = months[a.getMonth()];
	const month  = a.getMonth();
	const date = a.getDate();

	return month + "/" + date + "/" + year;
}