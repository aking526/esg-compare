import Logging from "./Logging";

export function keyCheck(SERVER_KEY: string) {
	if (SERVER_KEY === "") {
		Logging.error("No user authentication. Do not try to modify the database!");
		process.exit(1);
	}
}
