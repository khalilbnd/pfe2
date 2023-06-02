<?php
session_start(); // Start the session

if(isset($_SESSION['email'])) { // If user is already logged in
    header("Location: dashboard.php"); // Redirect to dashboard page
}

if(isset($_POST['login'])) { // If login form is submitted
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Check if email and password are correct
    if($email == 'example@gmail.com' && $password == 'password123') {
        $_SESSION['email'] = $email; // Set session variable
        header("Location: dashboard.php"); // Redirect to dashboard page
    } else {
        echo "<script>alert('Invalid email or password');</script>"; // Show an alert message
    }
} else if (isset($_POST['signup'])) { // If signup form is submitted
    header("Location: signup.html"); // Redirect to signup page
    exit(); // Terminate the script
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="Login.css">
    <link href="https://fonts.googleapis.com/css?family=Space+Mono:700&display=swap" rel="stylesheet">

    <title>Login</title>
</head>

<body>
    <div class="Loginb">
        <div class="googlesignup">
            <button id="google">
                <img src="google.png" alt="google" id="G">
                <a href="#">Log in with Google</a>
            </button>
        </div>
        <div class="login">
            <form method="POST">
                <input type="email" name="email" placeholder="Enter your email address" required>
                <input type="password" name="password" placeholder="Enter your password" required>
                <button type="submit" name="login" id="Login">Login</button>
            </form>
        </div>
        <div class="signup">
            <form method="POST">
                <p id="Newaccount">Don't have an account?</p>
                <a href="Signup.html">Sign up</a>
            </form>
        </div>
        
        <div class="think">
            <h1>THINK&</h1>
            <h1>PLAN</h1>
            <h4>THAN BUILD</h4>
        </div>
    </div>
</body>

</html>
