import Logging from "../utils/Logging";

export function authCheck(SERVER_AUTH: string) {
	if (SERVER_AUTH === "") {
		Logging.error("No user authentication. Do not try to modify the database!");
		process.exit(1);
	}
}
