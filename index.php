<?php
  //Database config
  include("web/configDB.php");
  //Session
	session_start();
?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Zephyrus WEB</title>
    <link href="css/bootstrap.css" rel="stylesheet">
    <link href="css/custom.css" rel="stylesheet">
    <link rel="icon" href="assets/web/favicon.png" type="image/png">
  </head>

  <body>
    <!--NAVBAR-->
    <nav class="navbar navbar-fixed-top myNavbar" style="background-color: darkgrey;">
      <div class="container-fluid">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#"><b>ZEPHYRUS PROJECT</b></a>
        </div>
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul class="nav navbar-nav navbar-right">
            <?php
              //Current logged user info
              if (isset($_SESSION['login_user'])) {
                echo ("<li><a href='web/userPanel.php'>Logged as <b>".$_SESSION['login_user']."</b></a></li>");
                echo ("<li><a href='web/userLogout.php'><b>LOGOUT?</b></a></li>");
              } else {
                echo ("<li><a href='#'>Logged as <b>GUEST</b></a></li>");
                echo ("<li><a href='#signup' data-toggle='modal' data-target='.bs-modal-sm'><b>LOGIN?</b></a></li>");
              }
            ?>
          </ul>
        </div>
      </div>
    </nav>
    <!--///NAVBAR-->

    <!--BODY-->
    <div class="col-md-12">
      <div class="row">
        <!--LEFT-->
        <div class="col-sm-6 left">
          <div class="container">
            <a href="#" class="ship" data-toggle="modal" data-target="#startGameModal"><img src="assets/web/ship.png" class="image" style="width:100%"></a>
            <div class="middle">
              <a href="#" data-toggle="modal" data-target="#startGameModal"><div class="text">PLAY</div></a>
            </div>
          </div>
        </div>
        <!--///LEFT-->

        <!--RIGHT-->
        <div class="col-sm-6 right">
          <div class="container">
            <?php
              //If user is logged in, go straigth to the user panel
              if (isset($_SESSION['login_user'])) {
              	echo ("<a href='web/userPanel.php' class='ship'><img src='assets/web/book.png' class='image' style='width:100%''></a>
			            <div class='middle'>
			               <a href='web/userPanel.php'><div class='text'>EDITOR</div></a>
			             </div>");
              //If not, show the LOG-IN/SIGNUP modal  
              } else {
              	echo ("<a href='#signup' data-toggle='modal' data-target='.bs-modal-sm' class='ship'><img src='assets/web/book.png' class='image' style='width:100%''></a>
			             <div class='middle'>
			               <a href='#signup' data-toggle='modal' data-target='.bs-modal-sm'><div class='text'>EDITOR</div></a>
			             </div>");
              }
            ?>
          </div>
        </div>
        <!--///RIGHT-->
      </div>
    </div>
    <!--///BODY-->

    <!--SELECT DIFFICULTY-->
    <div class="modal fade" id="startGameModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel"><b>Select game difficulty (only one)</b></h5>
          </div>
          <div class="modal-body">

            <form action='web/userConfigSend.php' method='POST' onsubmit="return getDifficulty()">

              <div class="form-group">
                <label class="col-md-4 control-label">Default configs</label>  
                <div class="col-md-6">
                  <select name="difficultySelect" id="difficultySelect" class="form-control">
                    <option value="easyMode">Easy</option>
                    <option value="normalMode" selected>Normal</option>
                    <option value="hardMode">Hard</option>
                    <option value="infernoMode">Inferno</option>
                  </select>
                </div>
              </div>

              <br>
              <br>

              <?php
              //Current logged user info
              if (isset($_SESSION['login_user'])) {
                //Get the logged user
                $userName = $_SESSION['login_user'];
                $userLower = strtolower($userName);

                //Preparing the query
                $getConfigs = $db -> prepare("SELECT * FROM configs WHERE username = '$userName'");
                $getConfigs -> execute();

                //Count the rows
                $numberRows = $db->prepare("SELECT COUNT(*) FROM configs WHERE username = '$userName'");
                $numberRows->execute();
                $num_rows = $numberRows->fetchColumn();

                if ($num_rows == 0) { 
                  echo "<br>
                  <div class='form-group'>
                        <label class='col-md-12 control-label'>There are no custom configurations yet!!</label>";
                } else if ($num_rows > 0) {

                  echo"<div class='form-group'>
                      <label class='col-md-4 control-label'>Custom configs</label>  
                      <div class='col-md-6'>
                      <input type='hidden' name='customGame' id='customGame' value='".$userLower."'>
                      <select name='createId' id='createId' class='form-control'>";

                  while ($row = $getConfigs->fetch(PDO::FETCH_ASSOC)) {
                    echo "<option value='".$row["id"]."'>".$row["configName"]."</option>";
                  }

                  echo "</select>
                      </div>
                    </div>";
                  }
                }
              ?>

              <br>
              <div class="modal-footer">
                <button type='submit' class='btn btn-up' id='submit-button style='float:right;'>Submit</button> 
                <button type="button" class="btn btn-down" data-dismiss="modal">Close</button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
    <!--//////SELECT DIFFICULTY-->

    <!--LOG-IN/SIGN-IN MODAL-->
    <div class="modal fade bs-modal-sm" id="myModal" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-sm">
        <div class="modal-content">
          <br>
          <div class="bs-example bs-example-tabs">
            <ul id="myTab" class="nav nav-tabs">
              <li class="active"><a href="#signin" data-toggle="tab">Sign In</a></li>
              <li class=""><a href="#signup" data-toggle="tab">Register</a></li>
            </ul>
          </div>
          <div class="modal-body">
            <div id="myTabContent" class="tab-content">
              <!-- SIGN IN FORM -->
              <div class="tab-pane fade active in" id="signin">
                <form class="form-horizontal" action="web/userLogin.php" method="POST" autocomplete="off">
                <fieldset>
                  <!--USERNAME-->
                  <div class="control-group">
                    <label class="control-label" for="username">Username:</label>
                    <div class="controls">
                      <input id="username" name="username" type="text" class="form-control" placeholder="Username" class="input-medium" required>
                    </div>
                  </div>
                  <!--PASSWORD-->
                  <div class="control-group">
                    <label class="control-label" for="password">Password:</label>
                    <div class="controls">
                      <input id="password" name="password" class="form-control" type="password" placeholder="********" class="input-medium" required>
                    </div>
                  </div>
                  <!-- BUTTONS -->
                  <div class="control-group">
                    <label class="control-label" for="signin"></label>
                    <div class="controls">
                      <button id="signin" name="signin" class="btn btn-up" onclick="">Sign In</button>
                    </div>
                  </div>
                </fieldset>
                </form>
              </div>
              <!--///SIGN IN FORM -->

              <!--SIGN UP FORM-->
              <div class="tab-pane fade" id="signup">
                <form class="form-horizontal col-sm-12" action="web/userCreate.php" method="POST" autocomplete="off">
                  <!--USERNAME-->
                  <div class="form-group">
                    <label>Name</label>
                    <input class="form-control name" name="username" placeholder="Username" data-placement="right" data-trigger="manual" data-content="3-12 characters (only letters)" type="text" maxlength="12" minlength="3" required>
                  </div>
                  <!--EMAIL-->
                  <div class="form-group">
                    <label>E-Mail</label>
                    <input class="form-control email" name="email" placeholder="email@email.com" data-placement="right" data-trigger="manual" data-content="Must be a valid e-mail address (user@mail.com)" type="text" required>
                  </div>
                  <!--PASSWORD-->
                  <div class="form-group">
                    <label>Password<p style="font-size:0.7em">(6-20 characters, at least 1 uppercase and 1 number)</p></label>
                    <input type="password" class="form-control pass" name="password" id="txtNewPassword" placeholder="******" data-placement="right" data-trigger="manual" data-content="6-12 characters (Minimum one number and one uppercase)" maxlength="20" minlength="6" required></input>
                  </div>
                  <!--RE-PASSWORD-->
                  <div class="form-group">
                    <label>Re-type password</label>
                    <input type="password"  class="form-control pass" name="repassword" id="txtConfirmPassword" placeholder="******" data-placement="right" data-trigger="manual" maxlength="12" minlength="6" required></input>
                  </div>
                  <div class="registrationFormAlert" id="divCheckPasswordMatch"></div>
                  <div id="cloneDiv"></div>
                  <!--BUTTONS-->
                  <div class="form-group">
                    <button type="submit" class="btn btn-up" id="submit-button">Register</button> 
                    <button type="reset" class="btn btn-mid">Reset</button>
                    <button type="button" class="btn btn-down" data-dismiss="modal">Close</button>
                    <p class="help-block pull-left text-danger hide" id="form-error">&nbsp; Check the fields, the form is not valid. </p>
                  </div>
                </form>
              </div>
              <!--///SIGN UP FORM-->
            </div>
          </div>

          <div class="modal-footer">
            <center></center>
          </div>
        </div>
      </div>
    </div>
    <!--///MODAL-->

    <!--///NAVBAR FOOTER-->
    <nav class="navbar navbar-fixed-bottom myNavbar" style="background-color: lightgrey;">
      <div class="container-fluid">
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <a class="navbar-brand" href="#" style="float:right; color:#686868;" ><b>ZEPHYRUS EDITOR</b></a>
        </div>
      </div>
    </nav>

    <!--///SCRIPT-->
    <script src="js/jquery.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/custom.js"></script>

  </body>
</html>