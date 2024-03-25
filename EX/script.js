document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    var regUsername = document.getElementById('regUsername').value;
    var regPassword = document.getElementById('regPassword').value;
  
    // Retrieve user data from local storage
    var users = JSON.parse(localStorage.getItem('users')) || [];
  
    // Check if username already exists
    var existingUser = users.find(function(user) {
      return user.username === regUsername;
    });
  
    if (existingUser) {
      // Show registration failure alert
      document.getElementById('registrationAlerts').innerHTML = `
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
          Username already exists. Please choose a different one.
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      `;
    } else {
      // Save new user to local storage
      users.push({ username: regUsername, password: regPassword });
      localStorage.setItem('users', JSON.stringify(users));
      // Show registration success alert
      document.getElementById('registrationAlerts').innerHTML = `
        <div class="alert alert-success alert-dismissible fade show" role="alert">
          Registration successful! You can now log in.
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      `;
      // Optionally redirect to login page
    }
  });
  
  document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
  
    // Retrieve user data from local storage
    var users = JSON.parse(localStorage.getItem('users')) || [];
  
    // Check if user exists
    var user = users.find(function(user) {
      return user.username === username && user.password === password;
    });
  
    if (user) {
      // Show login success alert
      document.getElementById('loginAlerts').innerHTML = `
        <div class="alert alert-success alert-dismissible fade show" role="alert">
          Login successful!
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      `;
      // Redirect to home page or do something else
    } else {
      // Show login failure alert
      document.getElementById('loginAlerts').innerHTML = `
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
          Invalid username or password.
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      `;
    }
  });
  