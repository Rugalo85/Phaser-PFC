<?php 
  //Database config
  include("configDB.php");
  //Session
  session_start();

  if($_SERVER["REQUEST_METHOD"] == "POST") {
    //USERNAME and PASSWORD sent from form 
    $username = $_POST['username']; 
    $password = $_POST['password'];

    //Preparing the query
    $userLogin = $db -> prepare("SELECT * FROM users WHERE username = '$username'");
    $userLogin -> execute();

    while ($row = $userLogin->fetch(PDO::FETCH_ASSOC))  {
      //If password entered equals password hashed from the database then log in the user
      if(password_verify($password, $row["password"])) {
         $_SESSION['login_user'] = $username;
         header("location: userPanel.php");
      //Else alert the user with password error   
      } else {
        echo '<script type="text/javascript">alert("ERROR: The password is incorrect.");
        window.location.href="../index.php";</script>';
      }
    }
    //If username does not exist
    echo '<script type="text/javascript">alert("ERROR: The username does not exist.");
    window.location.href="../index.php";</script>';
  }

  //Connection close
  $db = null;
?>