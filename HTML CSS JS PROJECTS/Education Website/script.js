document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('registerForm').addEventListener('submit', function(event) {
        event.preventDefault();

        var email = document.getElementById('regEmail').value;
        var password = document.getElementById('regPassword').value;

        var users = JSON.parse(localStorage.getItem('users')) || [];

        var isRegistered = users.some(function(user) {
            return user.email === email;
        });

        if (isRegistered) {
            showAlert('danger', 'Email is already registered.');
        } else {
            users.push({ email: email, password: password });

            localStorage.setItem('users', JSON.stringify(users));

            showAlert('success', 'Registration successful! Redirecting to login page...');

            setTimeout(function() {
                window.location.href = 'login.html';
            }, 2000);
        }
    });
});

function showAlert(type, message) {
    var alertDiv = document.createElement('div');
    alertDiv.classList.add('alert', 'alert-' + type, 'alert-dismissible', 'fade', 'show');
    alertDiv.setAttribute('role', 'alert');
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn btn-close" data-bs-dismiss="alert" aria-label="Close">            <span aria-hidden="true">&times;</span>
        </button>
    `;

    document.body.appendChild(alertDiv);

    setTimeout(function() {
        alertDiv.remove();
    }, 3000);
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault();

        var email = document.getElementById('loginEmail').value;
        var password = document.getElementById('loginPassword').value;

        var users = JSON.parse(localStorage.getItem('users')) || [];

        var user = users.find(function(user) {
            return user.email === email && user.password === password;
        });

        if (user) {
            window.location.href = 'index.html';
        } else {
            showAlert('danger', 'Invalid email or password.');
        }
    });
});

