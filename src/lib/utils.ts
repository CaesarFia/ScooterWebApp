export function isValidEmail(email: unknown): boolean {
	return typeof email == "string" && /.+@.+/.test(email);
}


export function isValidPassword(password: unknown): boolean {
	return typeof password == "string" && password.length >= 6 && password.length <= 255;
}