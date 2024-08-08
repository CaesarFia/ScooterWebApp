export function isValidEmail(email: string): boolean {
	return /.+@.+/.test(email);
}


export function isValidPassword(password: string): boolean {
	return password.length >= 6 && password.length <= 255;
}

export function subtract(a: string, b: string): string {
	if (a[0] === '-' && b[0] === '-') {  // If both numbers are negative, subtract a from b
		return subtract(b.slice(1), a.slice(1));
	} else if (a[0] === '-') {  // If a is negative, add a to b and negate the result
		return '-' + add(a.slice(1), b);
	} else if (b[0] === '-') {  // If b is negative, add a to b
		return add(a, b.slice(1));
	}
	
	// If the number doesn't have a decimal point, add one
	if (a.indexOf('.') === -1) {
		a += '.';
	}

	if (b.indexOf('.') === -1) {
		b += '.';
	}

	// Get the number of decimal places in each number
	const aDecimals = a.length - a.indexOf('.') - 1;
	const bDecimals = b.length - b.indexOf('.') - 1;
	
	// Ensure that both numbers have the same number of decimal places
	if (aDecimals < bDecimals) {
		a += "0".repeat(bDecimals - aDecimals);
	} else {
		b += "0".repeat(aDecimals - bDecimals);
	}

	// Pad the numbers with zeros so they have the same length
	const maxLength = Math.max(a.length, b.length);
	a = a.padStart(maxLength, '0');
	b = b.padStart(maxLength, '0');

	// Loop through each character in the string
	// and subtract the two characters together
	// and return the result
	let result = '';
	let carry = 0;
	for (let i = a.length - 1; i >= 0; i--) {
		if (a[i] === '.') {
			result = '.' + result;
			continue;
		}
		let diff = Number(a[i]) - Number(b[i]) - carry;
		if (diff < 0) {
			diff += 10;
			carry = 1;
		} else {
			carry = 0;
		}
		result = diff + result;
	}

	return result;
}


export function add(a: string, b: string): string {
	if (a[0] === '-' && b[0] === '-') {
		return '-' + add(a.slice(1), b.slice(1));
	} else if (a[0] === '-') {
		return subtract(b, a.slice(1));
	} else if (b[0] === '-') {
		return subtract(a, b.slice(1));
	}

	// If the number doesn't have a decimal point, add one
	if (a.indexOf('.') === -1) {
		a += '.';
	}

	if (b.indexOf('.') === -1) {
		b += '.';
	}

	// Get the number of decimal places in each number
	const aDecimals = a.length - a.indexOf('.') - 1;
	const bDecimals = b.length - b.indexOf('.') - 1;
	
	// Ensure that both numbers have the same number of decimal places
	if (aDecimals < bDecimals) {
		a += "0".repeat(bDecimals - aDecimals);
	} else {
		b += "0".repeat(aDecimals - bDecimals);
	}

	// Pad the numbers with zeros so they have the same length
	const maxLength = Math.max(a.length, b.length);
	a = a.padStart(maxLength, '0');
	b = b.padStart(maxLength, '0');

	// Loop through each character in the string
	// and add the two characters together
	// and return the result
	let result = '';
	let carry = 0;
	for (let i = a.length - 1; i >= 0; i--) {
		if (a[i] === '.') {
			result = '.' + result;
			continue;
		}
		const sum = Number(a[i]) + Number(b[i]) + carry;
		result = (sum % 10) + result;
		carry = Math.floor(sum / 10);
	}

	return carry + result;
}


export function globeDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
	const R = 20925721.784777; // Radius of the Earth in feet 

	const lat1Rad = lat1 * Math.PI / 180;
	const lon1Rad = lon1 * Math.PI / 180;
	const lat2Rad = lat2 * Math.PI / 180;
	const lon2Rad = lon2 * Math.PI / 180;

	const dLat = lat2Rad - lat1Rad;
	const dLon = lon2Rad - lon1Rad;

	const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

	return R * c;
}
