<?php
// Set database information
$servername = "localhost:8888";
$username = "root";
$password = "";
$dbname = "user";

// Create connection
$conn = mysqli_connect($servername, $username, $password);

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

// Create database
$sql = "CREATE DATABASE IF NOT EXISTS $dbname";
if (mysqli_query($conn, $sql)) {
    // Select database
    mysqli_select_db($conn, $dbname);
    
    // Create table
    $sql = "CREATE TABLE IF NOT EXISTS users (
        id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        fullname VARCHAR(30) NOT NULL,
        email VARCHAR(50) NOT NULL,
        password VARCHAR(30) NOT NULL
    )";
    if (mysqli_query($conn, $sql)) {
        // Check if form submitted
        if ($_SERVER["REQUEST_METHOD"] == "POST") {
            // Get form data
            $fullname = $_POST["username"];
            $email = $_POST["email"];
            $password = $_POST["password"];
            
            // Insert data into table
            $sql = "INSERT INTO users (fullname, email, password)
                VALUES ('$fullname', '$email', '$password')";
            if (mysqli_query($conn, $sql)) {
                echo "New user created successfully";
            } else {
                echo "Error: " . $sql . "<br>" . mysqli_error($conn);
            }
        }
    } else {
        echo "Error creating table: " . mysqli_error($conn);
    }
} else {
    echo "Error creating database: " . mysqli_error($conn);
}

// Close connection
mysqli_close($conn);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="Signup.css">
    <link href="https://fonts.googleapis.com/css?family=Space+Mono:700&display=swap" rel="stylesheet">
</head>
<body>
    <video id="video-background" autoplay loop muted>
        <source src="bgsi.mp4" type="video/mp4">
      </video>
    
    <div>
        <div class="formulaire">
            <form>
                <label for="username">Fullname:</label>
                <input type="text" id="username" name="username"><br><br>
                
                <label for="email">Email:</label>
                <input type="email" id="email" name="email"><br><br>
                
                <label for="password">Password:</label>
                <input type="password" id="password" name="password"><br><br>
                
                <label for="repeat-password">Repeat Password:</label>
                <input type="password" id="repeat-password" name="repeat-password"><br><br>
                
                <input type="submit" value="Submit">
              </form>
              
        </div>
    </div>
</body>
</html>