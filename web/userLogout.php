<?php
	//Session
   session_start();
   
   //Remove user from session and redirect to the INDEX.PHP
   if(session_destroy()) {
      header("Location: ../index.php");
   }
?>