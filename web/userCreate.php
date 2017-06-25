<?php 
  //Database config
  include("configDB.php");

  //Get the data from the HTML form
  $username = $_POST['username']; 
  $email = $_POST['email']; 
  $password = $_POST['password']; 
  $repassword = $_POST['repassword']; 
  //Hashing the password
  $hashed_password = password_hash($password, PASSWORD_DEFAULT);

  //Preparing the query
  $checkUsername = $db -> prepare("SELECT * FROM users WHERE username = '$username'");
  $checkUsername -> execute();

  //Preparing the query
  $checkEmail = $db -> prepare("SELECT * FROM users WHERE email = '$email'");
  $checkEmail -> execute();

  //Checks and info validation
  //Username
  if ($usernameExists = $checkUsername->fetch(PDO::FETCH_ASSOC)) {
    echo "<script type='text/javascript'> alert('ERROR: The username already exists.')</script> "; 
    echo "<script type='text/javascript'> window.history.back();</script>'; "; 

  //Email format
  } else if (!filter_var($email, FILTER_VALIDATE_EMAIL) === true) {
    echo "<script type='text/javascript'> alert('ERROR: The email has a wrong format.')</script> "; 
    echo "<script type='text/javascript'> window.history.back();</script>'; ";

  //Email exists
  } else if ($emailExists = $checkEmail->fetch(PDO::FETCH_ASSOC)) {
    echo "<script type='text/javascript'> alert('ERROR: The email address already exists.')</script> "; 
    echo "<script type='text/javascript'> window.history.back();</script>'; ";

  //Password
  } else if ($password != $repassword) {
    echo "<script type='text/javascript'> alert('ERROR: Passwords don't match.')</script> "; 
    echo "<script type='text/javascript'> window.history.back();</script>'; "; 

  //If everything is OK, insert data into database
  } else {
    $dataInsert = $db -> prepare("INSERT INTO users (username, email, password) VALUES ('$username', '$email', '$hashed_password')");
    $dataInsert -> execute();

    echo "<script type='text/javascript'> alert('User was createad succesfully.')</script>"; 
    echo "<script type='text/javascript'> window.history.back();</script>"; 
  }

  //Connection close
  $db = null;
?>