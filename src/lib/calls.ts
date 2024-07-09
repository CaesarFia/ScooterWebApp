const APIS = '/api/scooters'
const APIT = '/api/transactions'
const APIU = '/api/users'

export async function addScooter(latitude: number, longitude: number, battery: number) {
    try {
        const response = await fetch(APIS, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ latitude, longitude, battery })
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
export async function getScooter() {
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
export async function updateScooter(scooterId: string, latitude: number, longitude: number, battery: number, needRepairs: boolean, checkedOut: boolean) {
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
export async function addUser(firstname: string, lastname: string, email: string, passwordHash: string, isAdmin: boolean | null) {
    try {
        const response = await fetch(APIU, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ firstname, lastname, email, passwordHash, isAdmin })
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
        console.error('Error fetching scooters:', error);
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
        console.error('Error fetching scooters:', error);
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
        console.error('Error fetching scooters:', error);
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
        console.error('Error fetching scooters:', error);
        return { success: false };
    }
}
export async function deleteTransaction(transactionId: string) {
    try {
        const response = await fetch(APIT, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ transactionId })
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
export async function updateTransaction(amount: number, transactionId: string) {
    try {
        const response = await fetch(APIT, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount, transactionId })
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