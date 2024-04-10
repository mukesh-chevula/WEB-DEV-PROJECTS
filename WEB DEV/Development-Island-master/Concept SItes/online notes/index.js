/*
  AJAX call for the signup form
  - Once form is submitted
    - Prevent default PHP processing
    - Collect user inputs
    - Send them to signup.php using AJAX
      - AJAX call successful: Show error/success message
      - AJAX call fails: Show AJAX call error
*/
$("#signupForm").submit(function(event) {
    event.preventDefault();
    var dataToPost = $(this).serializeArray();
    $.ajax({
        url: "signup.php",
        type: "POST",
        data: dataToPost,
        success: function(data) {
            if (data) {
                $("#signupMessage").html(data);
            }
        },
        error: function(xhr) {
            var msg = "<p>Request Status: " + xhr.status + " Status Text: " + xhr.statusText + "  " + xhr.responseText + "</p>";
            var errorMsg = "<div class='alert alert-danger'>" +
                "<p>An error occured. Here are the details:</p>" +
                msg +
                "<p>Please try again later.</p></div>";

            $("#signupMessage").html(errorMsg);
        }
    });
});

/*
  AJAX call for the login form
  - Once form is submitted
    - Prevent default PHP processing
    - Collect user inputs
    - Send them to login.php using AJAX
      - AJAX call successful
        - PHP files returns success and redirect user to notes page
        - Otherwise show error message
      - AJAX call fails: Show AJAX call error
*/
$("#loginForm").submit(function(event) {
    event.preventDefault();
    var dataToPost = $(this).serializeArray();
    $.ajax({
        url: "login.php",
        type: "POST",
        data: dataToPost,
        success: function(data) {
            if (data == "success") {
                window.location = "mynotes.php";
            } else {
                $("#loginMessage").html(data);
            }
        },
        error: function(xhr) {
            var msg = "<p>Request Status: " + xhr.status + " Status Text: " + xhr.statusText + "  " + xhr.responseText + "</p>";
            var errorMsg = "<div class='alert alert-danger'>" +
                "<p>An error occured. Here are the details:</p>" +
                msg +
                "<p>Please try again later.</p></div>";

            $("#signupMessage").html(errorMsg);
        }
    });
});

/*
  AJAX call for the forgot password form
  - Once form is submitted
    - Prevent default PHP processing
    - Collect user inputs
    - Send them to login.php using AJAX
      - AJAX call successful: Show error/success message
      - AJAX call fails: Show AJAX call error
*/
$("#forgotPassForm").submit(function(event) {
    event.preventDefault();
    var dataToPost = $(this).serializeArray();
    $.ajax({
        url: "forgotpassword.php",
        type: "POST",
        data: dataToPost,
        success: function(data) {
            $("#forgotPassMessage").html(data);
        },
        error: function(xhr) {
            var msg = "<p>Request Status: " + xhr.status + " Status Text: " + xhr.statusText + "  " + xhr.responseText + "</p>";
            var errorMsg = "<div class='alert alert-danger'>" +
                "<p>An error occured. Here are the details:</p>" +
                msg +
                "<p>Please try again later.</p></div>";

            $("#signupMessage").html(errorMsg);
        }
    });
});