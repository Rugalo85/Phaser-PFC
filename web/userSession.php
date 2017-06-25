<?php 
  //Database config
  include("configDB.php");
  //Session
  session_start();
  
  //Retrieve the user logged in, either if is a guest or a registered user
  $user_check = $_SESSION['login_user'];
  
  //If is not logged in, redierct to the INDEX.PHP
  if(!isset($_SESSION['login_user'])) {
    header("Location: ../index.php");
  } 
?>