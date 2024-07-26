export function isValidEmail(email: string): boolean {
	return /.+@.+/.test(email);
}


export function isValidPassword(password: string): boolean {
	return password.length >= 6 && password.length <= 255;
}