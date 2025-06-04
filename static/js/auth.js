window.login = async function(username, password) {
    console.log(`trying to login with ${username}, ${password}`)
    window.loadView('home')

    const response = await fetch(window.LOGIN_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username, password })
    });

    const result = await response.json();
    if (!response.ok) {
        console.error("login failed:", result?.error || response.statusText);
        throw new Error(result?.details || result?.error || response.statusText);
    }
    
    window.userData.is_authenticated = true;
    window.loadView('home')
};


window.logout = async function() {
    const response = await fetch(window.LOGOUT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
    });

    const result = await response.json();
    if (!response.ok) {
        console.error("failed to logout:", response.status);
        throw new Error(result?.details || result?.error || response.statusText);
    };
    
    window.userData.is_authenticated = false;
};

window.get_user = async function() {
    const response = await fetch(window.GET_USER, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
    });

    if (!response.ok) {
        console.error("failed to get user:", response.status);
        window.userData.is_authenticated = false;
        return null;
    };

    try {
        const result = await response.json();

        if (result && typeof result.is_authenticated === 'boolean') {
            window.userData.is_authenticated = result.is_authenticated;
        }

        return result;
    } catch (err) {
        console.error("Failed to parse response JSON:", err);
        return null;
    }
};