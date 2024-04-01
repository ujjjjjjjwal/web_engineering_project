const loginFormContainer = document.getElementById('loginFormContainer');
const registerFormContainer = document.getElementById('registerFormContainer');
const marksTable = document.getElementById('marksTable');
const marks = document.getElementById('marks');
const showRegisterFormBtn = document.getElementById('showRegisterFormBtn');
const showLoginFormBtn = document.getElementById('showLoginFormBtn');

loginFormContainer.style.display = 'block';

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Here you can implement your authentication logic
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        displayMarks(username);
    } else {
        alert('Invalid username or password. Please try again.');
    }
});

document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const newUsername = document.getElementById('newUsername').value;
    const newPassword = document.getElementById('newPassword').value;

    // Check if the username already exists
    if (users.some(user => user.username === newUsername)) {
        alert('Username already exists. Please choose a different username.');
    } else {
        // Add new user to the users array
        users.push({ username: newUsername, password: newPassword });
        // Add new user with empty marks array to marksData object
        marksData[newUsername] = [];
        alert('Registration successful. You can now log in with your new credentials.');
        // Switch back to login form
        switchToLoginForm();
    }
});

showRegisterFormBtn.addEventListener('click', function() {
    switchToRegisterForm();
});

showLoginFormBtn.addEventListener('click', function() {
    switchToLoginForm();
});

function displayMarks(username) {
    const userMarks = marksData[username];
    if (!userMarks || userMarks.length === 0) {
        marks.innerHTML = `<tr><td colspan="2">You have not been graded for any exam yet</td></tr>`;
    } else {
        let tableHtml = `
            <tr>
                <th>Subject</th>
                <th>Mark</th>
            </tr>
        `;
        userMarks.forEach(mark => {
            if (mark.mark < 22) {
                tableHtml += `<tr style="background-color: red;">`;
            } else if(mark.mark>22 && mark.mark<54) {
                tableHtml += `<tr style="background-color: yellow;">`;
            }
            else {
                tableHtml += `<tr style="background-color: green;">`;
            }
            tableHtml += `<td>${mark.subject}</td><td>${mark.mark}</td></tr>`;
        });
        marks.innerHTML = tableHtml;
    }
    loginFormContainer.style.display = 'none';
    marksTable.style.display = 'block';
}

function switchToRegisterForm() {
    loginFormContainer.style.display = 'none';
    registerFormContainer.style.display = 'block';
}

function switchToLoginForm() {
    registerFormContainer.style.display = 'none';
    loginFormContainer.style.display = 'block';
}

function logout() {
    marksTable.style.display = 'none';
    switchToLoginForm();
}
