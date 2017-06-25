<?php
  //Database config
  include("configDB.php");
  //Session
  include('userSession.php');

  //Config ID and logged USER
  $idConfig = $_POST['deleteId'];
  $userName = $_SESSION['login_user'];

  //Preparing the query
  $configDelete = $db -> prepare("DELETE FROM configs WHERE id = '$idConfig'");

  if ($configDelete -> execute()) {
    echo "<script type='text/javascript'> alert('The configuration has been deleted succesfully.')</script>;";
    echo "<script type='text/javascript'> window.location.replace('userPanel.php')</script>;";
  } else {
    echo "<script type='text/javascript'> alert('There was a problem deleting the configuration.')</script>;";
    echo "<script type='text/javascript'> window.location.replace('userPanel.php')</script>;";
  }



  //Connection close
  $db = null;
?> 
