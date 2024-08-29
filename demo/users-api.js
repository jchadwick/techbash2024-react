const UsersApiRoot = `http://localhost:3000`;

export const loadUsers = async () => {
    try {
        const resp = await fetch(`${UsersApiRoot}/users`)
        return (resp.status === 200) ? resp.json() : [];
    }
    catch (x) {
        if (x.message === 'Failed to fetch') {
            // API is probably not up yet, try again
            return await new Promise((resolve, reject) => {
                setTimeout(() => loadUsers().then(resolve).catch(reject), 1000);
            });
        }
        return [];
    }
}

export const loadUserById = (userId) =>
    fetch(`${UsersApiRoot}/users/${userId}`).then(x => x.json())

export const createUser = (user) =>
    fetch(`${UsersApiRoot}/users`, {
        method: 'POST',
        body: JSON.stringify(user)
    }).then(x => x.json())
