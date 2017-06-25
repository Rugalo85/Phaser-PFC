<?php
  //Session
  include('userSession.php');
?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Control Panel</title>
    <link href="../css/bootstrap.css" rel="stylesheet">
    <link href="../css/custom.css" rel="stylesheet">
    <link rel="icon" href="../assets/web/favicon.png" type="image/png">
  </head>

  <body style="background-color:lightgrey">
    <div class="jumbotron text-center" style="background-color:#eee; padding-bottom: 1em"> 
      <h1><b>U</b>ser <b>C</b>ontrol <b>P</b>anel</h1>
      <?php
        echo ("<h2>Welcome <b>".$_SESSION['login_user']."</b>!</h2>");
        echo ("<h4>Aren't you ".$_SESSION['login_user']."? <b><a href='userLogout.php'>LOGOUT!</a></b></h2> ");
      ?>
      <br>
      <button name="submit" class="btn btn-mid" onclick="location.href = '../index.php';" >Back to the home screen</button>
    </div>

    <div class="container">

      <div class="row">
          <div class="col-xs-12 hover" style="background-color:#eee">
            <h4><b>EDITOR</b></h4>
            <p>Go to the game editor and generate new configurations to apply to the game: lives, bullets, enemies, difficulty...</p>
          </div>
          <div class='col-xs-12' style='text-align:right;background-color:#bfbfbf;padding-top:0.5em; padding-bottom:0.5em;'>
              <button type='submit' class='btn btn-up' style='display: inline;' onclick="window.location='userEditor.php';">Go to the editor</button>
          </div>
      </div>

      <div style="margin-top:20px"> </div>

      <div class="row">
          <div class="col-xs-12" style="background-color:#eee">
            <h4><b>LIST OF CONFIGURATIONS</b></h4>
            <p>Select one configuration from below to apply to the game.</p>
          </div>
      </div>

      <div style='margin-top:20px'> </div>

      <?php
        //Database config
        include('configDB.php');

        //Get the logged user
        $userName = $_SESSION['login_user'];

        //Preparing the query
        $getConfigs = $db -> prepare("SELECT * FROM configs WHERE username = '$userName'");
        $getConfigs -> execute();

        //Count the rows
        $numberRows = $db->prepare("SELECT COUNT(*) FROM configs WHERE username = '$userName'");
        $numberRows->execute();
        $num_rows = $numberRows->fetchColumn();

        //If there are no configs
        if ($num_rows == 0) { 
           echo "
              <div class='row' style='background-color:#eee'>

                <div class='col-xs-12' style='background-color:#c6c6c6'>
                  <h4><b>THERE ARE NO CONFIGURATIONS YET</b></h4>
                </div>

              <div class='col-xs-12' style='background-color:#eee'>
                  <p>Go to the editor if you want to enter a new configuration.</p>
              </div>

              </div>
              <div style='margin-top:20px'> </div>";
        //Else show configs
        } else if ($num_rows > 0) {
          while ($row = $getConfigs->fetch(PDO::FETCH_ASSOC)) {
              echo "
              <div class='row' style='background-color:#eee;text-align:center;'>
                
                <div class='col-xs-12' style='background-color:#c6c6c6'>
                  <h4><b>".$row["configName"]."</b> (".$row["time"].")</h4>
                </div>

                <div class='col-xs-12 col-sm-6 col-md-6 col-lg-2 col-xl-2' style='background-color:#eee'>
                  <h5><u><b>PLAYER01</b></u></h5>
                  <p><b>Name:</b> ".$row["player01Name"]."</p>
                  <p><b>Speed:</b> ".$row["player01Speed"]."</p>
                  <p><b>Lives:</b> ".$row["player01Lives"]."</p>
                  <p><b>Skin:</b> ".$row["player01Skin"]."</p>
                  <p><b>Bullets:</b> ".$row["player01Bullets"]."</p>
                  <p><b>Gain lives:</b> ".$row["gainplayer01Lives"]."</p>
                </div>

                <div class='col-xs-12 col-sm-6 col-md-6 col-lg-2 col-xl-2' style='background-color:#eee'>
                  <h5><u><b>PLAYER02</b></u></h5>
                  <p><b>Name:</b> ".$row["player02Name"]."</p>
                  <p><b>Speed:</b> ".$row["player02Speed"]."</p>
                  <p><b>Lives:</b> ".$row["player02Lives"]."</p>
                  <p><b>Skin:</b> ".$row["player02Skin"]."</p>
                  <p><b>Bullets:</b> ".$row["player02Bullets"]."</p>
                  <p><b>Gain lives:</b> ".$row["gainplayer02Lives"]."</p>
                </div>

                <div class='col-xs-12 col-sm-6 col-md-6 col-lg-3 col-xl-2' style='background-color:#eee'>
                  <h5><u><b>ENEMIES</b></u></h5>
                  <p><b>01 spacing:</b> ".$row["enemy01Spacing"]."</p>
                  <p><b>01 speed:</b> ".$row["enemy01Speed"]."</p>
                  <p><b>02 spacing:</b> ".$row["enemy02Spacing"]."</p>
                  <p><b>02 speed:</b> ".$row["enemy02Speed"]."</p>
                  <p><b>02 shot speed:</b> ".$row["enemy02BulletSpeed"]."</p>
                  <p><b>02 shot delay:</b> ".$row["enemy02FiringDelay"]."</p>
                </div>

                <div class='col-xs-12 col-sm-6 col-md-6 col-lg-3 col-xl-2' style='background-color:#eee'>
                  <h5><u><b>ENEMIES</b></u></h5>
                  <p><b>03 spacing:</b> ".$row["enemy03Spacing"]."</p>
                  <p><b>03 speed:</b> ".$row["enemy03Speed"]."</p>
                  <p><b>03 amount:</b> ".$row["numEnemies03InWave"]."</p>
                  <p><b>04 spacing:</b> ".$row["enemy04Spacing"]."</p>
                  <p><b>04 speed:</b> ".$row["enemy04Speed"]."</p>
                  <p><b>defeat enemies:</b> ".$row["enemiesToDefeat"]."</p>
                </div>

                <div class='col-xs-12 col-sm-6 col-md-6 col-lg-2 col-xl-2' style='background-color:#eee'>
                  <h5><u><b>BOSS</b></u></h5>
                  <p><b>Shields:</b> ".$row["boss01Shields"]."</p>
                  <p><b>Speed:</b> ".$row["boss01Speed"]."</p>
                  <p><b>Weapon 01:</b> ".$row["boss01BulletSpeed01"]." / ".$row["boss01FiringDelay01"]."</p>
                  <p><b>Weapon 02:</b> ".$row["boss01BulletSpeed02"]." / ".$row["boss01FiringDelay02"]."</p>
                  <p><b>Weapon 03:</b> ".$row["boss01BulletSpeed03"]." / ".$row["boss01FiringDelay03"]."</p>
                </div>

                <div class='col-xs-12' style='text-align:right;background-color:#bfbfbf;padding-top:0.5em; padding-bottom:0.5em;'>
                  <form method='POST' action='userConfigDelete.php' onsubmit='return confirm(\"Do you want to delete this config?\");' style='display: inline;'>
                    <input type='hidden' name='deleteId' value=".$row["id"].">
                    <button type='submit' class='btn btn-up' id='submit-button' style='display: inline;'>Delete</button> 
                  </form>
                </div>

              </div>

              <div style='margin-top:20px'> </div>";
          } 
        }
        //Connection close
        $db = null;
      ?>

    </div>

    <script src="../js/jquery.min.js"></script>
    <script src="../js/bootstrap.min.js"></script>
    <script src="../js/custom.js"></script>

  </body>
</html>