document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('registerForm').addEventListener('submit', function(event) {
        event.preventDefault();

        var email = document.getElementById('regEmail').value;
        var password = document.getElementById('regPassword').value;

        // Retrieve existing users from localStorage or initialize as empty array
        var users = JSON.parse(localStorage.getItem('users')) || [];

        // Check if the email is already registered
        var isRegistered = users.some(function(user) {
            return user.email === email;
        });

        if (isRegistered) {
            // Display error message if the email is already registered
            showAlert('danger', 'Email is already registered.');
        } else {
            // Add new user to the users array
            users.push({ email: email, password: password });

            // Save updated users array to localStorage
            localStorage.setItem('users', JSON.stringify(users));

            // Display success message
            showAlert('success', 'Registration successful! Redirecting to login page...');

            // Redirect to login page after a delay
            setTimeout(function() {
                window.location.href = 'login.html';
            }, 2000);
        }
    });
});

// Function to display Bootstrap alert
function showAlert(type, message) {
    // Create alert element
    var alertDiv = document.createElement('div');
    alertDiv.classList.add('alert', 'alert-' + type, 'alert-dismissible', 'fade', 'show');
    alertDiv.setAttribute('role', 'alert');
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn btn-close" data-bs-dismiss="alert" aria-label="Close">            <span aria-hidden="true">&times;</span>
        </button>
    `;

    // Append alert to container
    document.body.appendChild(alertDiv);

    // Automatically remove alert after 3 seconds
    setTimeout(function() {
        alertDiv.remove();
    }, 3000);
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault();

        var email = document.getElementById('loginEmail').value;
        var password = document.getElementById('loginPassword').value;

        // Retrieve users from localStorage
        var users = JSON.parse(localStorage.getItem('users')) || [];

        // Check if there is a matching user
        var user = users.find(function(user) {
            return user.email === email && user.password === password;
        });

        if (user) {
            // Login successful, redirect to home page
            window.location.href = 'index.html';
        } else {
            // Display error message for invalid credentials
            showAlert('danger', 'Invalid email or password.');
        }
    });
});

