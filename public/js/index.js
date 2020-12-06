const showSpinner = () => {
    spinner.className = 'show';
};

const hideSpinner = () => {
    spinner.className = spinner.className.replace('show', '');
};

const login = async () => {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    const url = '/api/users/login';
    let response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    });
    let result = await response.json();
    if (response.ok) {
        // redirecting to profile
        window.location.replace('/api/city/profile');
    } else {
        // Handle error
        alert(result.msg);
    }
};

const signup = async () => {
    const username = document.getElementById('reg-username').value;
    const password = document.getElementById('reg-password').value;
    const url = '/api/users/register';
    let response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    });
    let result = await response.json();
    if (response.ok) {
        alert('Account created, redirecting you to login now!');
        // redirect to login screen
        window.location.replace('/api/users/login-page');
    } else {
        // Handle error
        alert(result.msg);
    }
};

const logout = () => {
    window.location.replace('/api/users/logout');
};

const citySubmit = async () => {
    const cityName = document.getElementById('city').value;
    const URL = '/api/city/add';
    showSpinner();
    let response = await fetch(URL, {
        method: 'POST',
        body: JSON.stringify({ name: cityName }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    });
    let result = await response.json();
    if (response.ok) {
        // successful
        hideSpinner();
        alert('City added successfully');
    } else {
        // Handle error
        hideSpinner();
        alert(result.msg);
    }
};

const checkCity = async () => {
    const url = `/api/city/check/${document.getElementById('city').value}`;
    showSpinner();
    let response = await fetch(url, {
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    });
    let result = await response.json();
    if (response.ok) {
        console.log(result);
        hideSpinner();
        document.getElementById('isInRange').innerText =
            result === true ? 'Yes' : 'No';
    } else {
        // Handle error
        hideSpinner();
        alert(result.msg);
    }
};
