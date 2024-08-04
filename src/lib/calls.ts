import type { UserType } from "./db/schema";

const APIS = '/api/scooters'
const APIT = '/api/transactions'
const APIU = '/api/users'

export async function addScooter(latitude: number, longitude: number, battery: number, needRepairs: boolean | undefined) {
    try {
        const response = await fetch(APIS, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ latitude, longitude, battery, needRepairs: needRepairs ? true : false, checkedOut: false })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching scooters:', error);
        return { success: false };
    }
}

export async function deleteScooter(scooterId: string) {
    try {
        const response = await fetch(APIS, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ scooterId })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching scooters:', error);
        return { success: false };
    }
}

export async function getScooters() {
    try {
        const response = await fetch(APIS, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching scooters:', error);
        return { success: false };
    }
}

export async function updateScooter(scooterId: string, latitude: number | null, longitude: number | null, battery: number | null, needRepairs: boolean | null, checkedOut: boolean | null) {
    try {
        const response = await fetch(APIS, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ scooterId, latitude, longitude, battery, needRepairs, checkedOut })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching scooters:', error);
        return { success: false };
    }
}

export async function addUser(firstname: string, lastname: string, email: string, passwordHash: string, role: UserType) {
    try {
        const response = await fetch(APIU, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ firstname, lastname, email, passwordHash, role })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching users:', error);
        return { success: false };
    }
}

export async function deleteUser(userId: string) {
    try {
        const response = await fetch(APIU, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching users:', error);
        return { success: false };
    }
}

export async function getUser() {
    try {
        const response = await fetch(APIU, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching users:', error);
        return { success: false };
    }
}

export async function addTransaction(customerId: string, scooterId: string) {
    try {
        const response = await fetch(APIT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ customerId, scooterId })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching transactions:', error);
        return { success: false };
    }
}

export async function getTransactions() {
    try {
        const response = await fetch(APIT, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching transactions:', error);
        return { success: false };
    }
}
