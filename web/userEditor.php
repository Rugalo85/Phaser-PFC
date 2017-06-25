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
    <title>Editor</title>
    <link href="../css/bootstrap.min.css" rel="stylesheet">
    <link href="../css/custom.css" rel="stylesheet">
    <link rel="icon" href="../assets/web/favicon.png" type="image/png">
  </head>

  <body>
    <!--HEADER-->
    <div class="jumbotron text-center">
      <h1><b>E</b>ditor</h1>
      <br>
      <h4><i><b>Note:</b> If you leave blank any field, the default value will be applied.</i></h4>
      <br>
      <button class="btn btn-mid" onclick="location.href = 'userPanel.php';">Go back</button>
    </div>
    <!--///HEADER-->

    <div class="container">
      <div class="row">
        <!--TABS-->
        <section>
            <div class="wizard">
                <div class="wizard-inner">
                    <div class="connecting-line"></div>
                    <ul class="nav nav-tabs" role="tablist">
                        <li role="presentation" class="active">
                            <a href="#step1" data-toggle="tab" aria-controls="step1" role="tab" title="Players">
                                <span class="round-tab">
                                    <i class="glyphicon glyphicon-user"></i>
                                </span>
                            </a>
                        </li>

                        <li role="presentation" class="disabled">
                            <a href="#step2" data-toggle="tab" aria-controls="step2" role="tab" title="Enemies">
                                <span class="round-tab">
                                    <i class="glyphicon glyphicon-pawn"></i>
                                </span>
                            </a>
                        </li>
                        <li role="presentation" class="disabled">
                            <a href="#step3" data-toggle="tab" aria-controls="step3" role="tab" title="Boss">
                                <span class="round-tab">
                                    <i class="glyphicon glyphicon-king"></i>
                                </span>
                            </a>
                        </li>

                        <li role="presentation" class="disabled">
                            <a href="#complete" data-toggle="tab" aria-controls="complete" role="tab" title="Done!">
                                <span class="round-tab">
                                    <i class="glyphicon glyphicon-ok"></i>
                                </span>
                            </a>
                        </li>
                    </ul>
                </div>
        <!--///TABS-->

                <form role="form" action="userConfigCreate.php" method="POST">
                    <div class="tab-content">

                        <!--PLAYERS-->
                        <div class="tab-pane active" role="tabpanel" id="step1">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
                              <legend>Player 01</legend>
                              <!-- Text NAME-->
                              <div class="form-group">
                                <label class="col-md-4 control-label" for="player01Name">Name</label>  
                                <div class="col-md-8">
                                  <input id="player01Name" name="player01Name" placeholder="Player 01" class="form-control input-md" type="text" maxlength="8">
                                </div>
                              </div>

                              <!-- Number LIVES-->
                              <div class="form-group">
                                <label class="col-md-4 control-label" for="player01Lives">Lives</label>  
                                <div class="col-md-8">
                                  <input id="player01Lives" name="player01Lives" placeholder="5" class="form-control input-md" type="number" min="1" max="99" maxlength="2">
                                </div>
                              </div>

                              <!-- Number SPEED-->
                              <div class="form-group">
                                <label class="col-md-4 control-label" for="player01Speed">Speed</label>  
                                <div class="col-md-8">
                                  <select id="player01Speed" name="player01Speed" class="form-control">
                                    <option value="6">Slow</option>
                                    <option value="7" selected>Standard</option>
                                    <option value="10">Fast</option>
                                    <option value="13">Very Fast</option>
                                  </select>
                                </div>
                              </div>

                              <!-- Select BULLETS -->
                              <div class="form-group">
                                <label class="col-md-4 control-label" for="player01Bullets">Bullets type</label>
                                <div class="col-md-8">
                                  <select id="player01Bullets" name="player01Bullets" class="form-control">
                                    <option value="0">Standard</option>
                                    <option value="1">Triple Shot</option>
                                    <option value="2">Quick Shot</option>
                                    <option value="3">Quad Shot</option>
                                  </select>
                                </div>
                              </div>
                  
                              <!-- Select SKIN-->
                              <div class="form-group">
                                <label class="col-md-4 control-label" for="player01Skin">Skin</label>  
                                <div class="col-md-8">
                                  <select id="player01Skin" name="player01Skin" class="form-control">
                                      <option value="blue">Blue</option>
                                      <option value="green">Green</option>
                                      <option value="yellow">Yellow</option>
                                  </select>
                                </div>
                              </div>

                              <!-- Number POINTS X LIVES-->
                              <div class="form-group">
                                <label class="col-md-4 control-label" for="gainplayer01Lives">Points/Lives</label>  
                                <div class="col-md-8">
                                  <input id="gainplayer01Lives" name="gainplayer01Lives" placeholder="Points needed to gain a life" class="form-control input-md" type="number">
                                </div>
                              </div>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
                              <legend>Player 02</legend>
                              <!-- Text NAME-->
                              <div class="form-group">
                                <label class="col-md-4 control-label" for="player02Name">Name</label>  
                                <div class="col-md-8">
                                  <input id="player02Name" name="player02Name" placeholder="Player 02" class="form-control input-md" type="text" maxlength="9">
                                </div>
                              </div>

                              <!-- Number LIVES-->
                              <div class="form-group">
                                <label class="col-md-4 control-label" for="player02Lives">Lives</label>  
                                <div class="col-md-8">
                                  <input id="player02Lives" name="player02Lives" placeholder="5" class="form-control input-md" type="number" min="1" max="99" maxlength="2">
                                </div>
                              </div>

                              <!-- Number SPEED-->
                              <div class="form-group">
                                <label class="col-md-4 control-label" for="player02Speed">Speed</label>  
                                <div class="col-md-8">
                                  <select id="player02Speed" name="player02Speed" class="form-control">
                                    <option value="6">Slow</option>
                                    <option value="7" selected>Standard</option>
                                    <option value="10">Fast</option>
                                    <option value="13">Very Fast</option>
                                  </select>
                                </div>
                              </div>

                              <!-- Select BULLETS-->
                              <div class="form-group">
                                <label class="col-md-4 control-label" for="player02Bullets">Bullets type</label>
                                <div class="col-md-8">
                                  <select id="player02Bullets" name="player02Bullets" class="form-control">
                                    <option value="0">Standard</option>
                                    <option value="1">Triple Shot</option>
                                    <option value="2">Quick Shot</option>
                                    <option value="3">Quad Shot</option>
                                  </select>
                                </div>
                              </div>

                              <!-- Select SKIN-->
                              <div class="form-group">
                                <label class="col-md-4 control-label" for="player02Skin">Skin</label>  
                                <div class="col-md-8">
                                  <select id="player02Skin" name="player02Skin" class="form-control">
                                      <option value="red">Red</option>
                                      <option value="violet">Violet</option>
                                      <option value="brown">Brown</option>
                                  </select>
                                </div>
                              </div>

                              <!-- Number POINTS X LIVES-->
                              <div class="form-group">
                                <label class="col-md-4 control-label" for="gainplayer02Lives">Points/Lives</label>  
                                <div class="col-md-8">
                                  <input id="gainplayer02Lives" name="gainplayer02Lives" placeholder="Points needed to gain a life" class="form-control input-md" type="number">
                                </div>
                              </div>
                            </div>
                          </div>

                          <!-- BUTTONS-->
                          <ul class="list-inline pull-right" style="padding-top:1em;">
                            <li><button type="button" class="btn btn-down next-step">Skip</button></li>
                            <li><button type="button" class="btn btn-up next-step">Save and continue</button></li>
                          </ul>
                          <!--///PLAYERS-->
                        </div>

                        <!--ENEMIES-->
                        <div class="tab-pane" role="tabpanel" id="step2">
                            <div class="row">
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
                                <!--Enemy01-->
                                <legend>Enemies 01</legend>
                                <!--Time between waves-->
                                <div class="form-group">
                                  <label class="col-md-4 control-label" for="enemy01Spacing">Time (ms)</label>  
                                  <div class="col-md-8">
                                    <input id="enemy01Spacing" name="enemy01Spacing" placeholder="Time between waves" class="form-control input-md" type="number" maxlength="8">
                                  </div>
                                </div>
                                <!-- Speed -->
                                <div class="form-group">
                                  <label class="col-md-4 control-label" for="enemy01Speed">Speed</label>  
                                  <div class="col-md-8">
                                    <select id="enemy01Speed" name="enemy01Speed" class="form-control">
                                      <option value="-20">Slow</option>
                                      <option value="-200" selected>Standard</option>
                                      <option value="-300">Fast</option>
                                      <option value="-500">Very Fast</option>
                                    </select>
                                  </div>
                                </div>
                              </div>

                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
                                <!--Enemy02-->
                                <legend>Enemies 02</legend>
                                <!--Time between waves-->
                                <div class="form-group">
                                  <label class="col-md-4 control-label" for="enemy02Spacing">Time (ms)</label>  
                                  <div class="col-md-8">
                                    <input id="enemy02Spacing" name="enemy02Spacing" placeholder="Time between waves" class="form-control input-md" type="number" maxlength="8">
                                  </div>
                                </div>
                                <!-- Speed -->
                                <div class="form-group">
                                  <label class="col-md-4 control-label" for="enemy02Speed">Speed</label>  
                                  <div class="col-md-8">
                                    <select id="enemy02Speed" name="enemy02Speed" class="form-control">
                                      <option value="-200">Slow</option>
                                      <option value="-300" selected>Standard</option>
                                      <option value="-400">Fast</option>
                                      <option value="-500">Very Fast</option>
                                    </select>
                                  </div>
                                </div>
                                <!--Firing delay-->
                                <div class="form-group">
                                  <label class="col-md-4 control-label" for="enemy02FiringDelay">Firing (ms)</label>  
                                  <div class="col-md-8">
                                    <input id="enemy02FiringDelay" name="enemy02FiringDelay" placeholder="Time between shots" class="form-control input-md" type="number" maxlength="8">
                                  </div>
                                </div>
                                <!-- Bullet Speed -->
                                <div class="form-group">
                                  <label class="col-md-4 control-label" for="enemy02BulletSpeed">Bullet speed</label>  
                                  <div class="col-md-8">
                                    <select id="enemy02BulletSpeed" name="enemy02BulletSpeed" class="form-control">
                                      <option value="300">Slow</option>
                                      <option value="400" selected>Standard</option>
                                      <option value="500">Fast</option>
                                      <option value="600">Very Fast</option>
                                    </select>
                                  </div>
                                </div>

                              </div>
                            </div>

                            <div class="row">
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
                                <!--Enemy03-->
                                <legend>Enemies 03</legend>
                                <!--Time between waves-->
                                <div class="form-group">
                                  <label class="col-md-4 control-label" for="enemy03Spacing">Time (ms)</label>  
                                  <div class="col-md-8">
                                    <input id="enemy03Spacing" name="enemy03Spacing" placeholder="Time between waves" class="form-control input-md" type="number" maxlength="8">
                                  </div>
                                </div>
                                <!-- Number of ships -->
                                <div class="form-group">
                                  <label class="col-md-4 control-label" for="numEnemies03InWave">Nº ships</label>  
                                  <div class="col-md-8">
                                    <select id="numEnemies03InWave" name="numEnemies03InWave" class="form-control">
                                      <option value="5">5</option>
                                      <option value="10" selected>7</option>
                                      <option value="15">10</option>
                                      <option value="20">15</option>
                                    </select>
                                  </div>
                                </div>
                              </div>

                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
                                <!--Enemy04-->
                                <legend>Enemies 04</legend>
                                <!--Time between waves-->
                                <div class="form-group">
                                  <label class="col-md-4 control-label" for="enemy04Spacing">Time (ms)</label>  
                                  <div class="col-md-8">
                                    <input id="enemy04Spacing" name="enemy04Spacing" placeholder="Time between waves" class="form-control input-md" type="number" maxlength="8">
                                  </div>
                                </div>
                                <!-- Speed -->
                                <div class="form-group">
                                  <label class="col-md-4 control-label" for="enemy04Speed">Speed</label>  
                                  <div class="col-md-8">
                                    <select id="enemy04Speed" name="enemy04Speed" class="form-control">
                                      <option value="-200">Slow</option>
                                      <option value="-450" selected>Standard</option>
                                      <option value="-550">Fast</option>
                                      <option value="-700">Very Fast</option>
                                    </select>
                                  </div>
                                </div>

                              </div>
                            </div>

                            <ul class="list-inline pull-right" style="padding-top:1em;">
                                <li><button type="button" class="btn btn-down prev-step">Previous</button></li>
                                <li><button type="button" class="btn btn-down next-step">Skip</button></li>
                                <li><button type="button" class="btn btn-up next-step">Save and continue</button></li>
                            </ul>
                        </div>
                        <!--///ENEMIES-->

                        <!--BOSS-->
                        <div class="tab-pane" role="tabpanel" id="step3">
                          <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <legend>Boss</legend>
                              <!-- Text ENEMIES TO DEFEAT-->
                              <div class="form-group">
                                <label class="col-md-4 control-label" for="enemiesToDefeat">Number of enemies</label>  
                                <div class="col-md-8">
                                  <input id="enemiesToDefeat" name="enemiesToDefeat" placeholder="Nº of defeated enemies needed to appear" class="form-control input-md" type="number" maxlength="8">
                                </div>
                              </div>

                              <!-- Number SHIELDS-->
                              <div class="form-group">
                                <label class="col-md-4 control-label" for="boss01Shields">Shields</label>  
                                <div class="col-md-8">
                                 <select id="boss01Shields" name="boss01Shields" class="form-control">
                                      <option value="1500">Low</option>
                                      <option value="5000" selected>Medium</option>
                                      <option value="7500">Heavy</option>
                                      <option value="10000">Fortress mode</option>
                                    </select>
                                </div>
                              </div>

                              <!-- Number SPEED-->
                              <div class="form-group">
                                <label class="col-md-4 control-label" for="boss01Speed">Speed</label>  
                                <div class="col-md-8">
                                  <select id="boss01Speed" name="boss01Speed" class="form-control">
                                    <option value="50">Slow</option>
                                    <option value="100" selected>Standard</option>
                                    <option value="150">Fast</option>
                                    <option value="300">Very Fast</option>
                                  </select>
                                </div>
                              </div>

                              <!-- Select BULLETS SPEED 01-->
                              <div class="form-group">
                                <label class="col-md-4 control-label" for="boss01BulletSpeed01">Mini turret speed</label>
                                <div class="col-md-8">
                                  <select id="boss01BulletSpeed01" name="boss01BulletSpeed01" class="form-control">
                                    <option value="200">Slow</option>
                                    <option value="300" selected>Standard</option>
                                    <option value="400">Fast</option>
                                    <option value="700">Very Fast</option>
                                  </select>
                                </div>
                              </div>

                              <!-- Select MINI TURRET DELAY-->
                              <div class="form-group">
                                <label class="col-md-4 control-label" for="boss01FiringDelay01">Mini turret delay</label>  
                                <div class="col-md-8">
                                  <input id="boss01FiringDelay01" name="boss01FiringDelay01" placeholder="2000" class="form-control input-md" type="number" maxlength="8">
                                </div>
                              </div>

                              <!-- Select BULLETS SPEED 02-->
                              <div class="form-group">
                                <label class="col-md-4 control-label" for="boss01BulletSpeed02">Large turret speed</label>  
                                <div class="col-md-8">
                                  <select id="boss01BulletSpeed02" name="boss01BulletSpeed02" class="form-control">
                                    <option value="300">Slow</option>
                                    <option value="400" selected>Standard</option>
                                    <option value="500">Fast</option>
                                    <option value="800">Very Fast</option>
                                  </select>
                                </div>
                              </div>

                              <!-- Select LARGE TURRET DELAY-->
                              <div class="form-group">
                                <label class="col-md-4 control-label" for="boss01FiringDelay02">Large turret delay</label>  
                                <div class="col-md-8">
                                  <input id="boss01FiringDelay02" name="boss01FiringDelay02" placeholder="3000" class="form-control input-md" type="number" maxlength="8">
                                </div>
                              </div>

                              <!-- Select BULLETS SPEED 03-->
                              <div class="form-group">
                                <label class="col-md-4 control-label" for="boss01BulletSpeed03">Laser speed</label>  
                                <div class="col-md-8">
                                  <select id="boss01BulletSpeed03" name="boss01BulletSpeed03" class="form-control">
                                    <option value="400">Slow</option>
                                    <option value="600" selected>Standard</option>
                                    <option value="700">Fast</option>
                                    <option value="900">Very Fast</option>
                                  </select>
                                </div>
                              </div>

                              <!-- Select LARGE TURRET DELAY-->
                              <div class="form-group">
                                <label class="col-md-4 control-label" for="boss01FiringDelay03">Laser delay</label>  
                                <div class="col-md-8">
                                  <input id="boss01FiringDelay03" name="boss01FiringDelay03" placeholder="5000" class="form-control input-md" type="number" maxlength="8">
                                </div>
                              </div>
                            </div>
                          </div>

                          <ul class="list-inline pull-right" style="padding-top:1em;">
                              <li><button type="button" class="btn btn-down prev-step">Previous</button></li>
                              <li><button type="button" class="btn btn-down next-step">Skip</button></li>
                              <li><button type="button" class="btn btn-up btn-info-full next-step">Save and continue</button></li>
                          </ul>
                        </div>
                        <!--///GAME-->

                        <!--COMPLETED-->
                        <div class="tab-pane" role="tabpanel" id="complete">
                            <h3>Complete</h3>
                            <p>Enter the name of the configuration</p>
                            <div class="col-md-8">
                              <input id="configName" name="configName" placeholder="My config" class="form-control input-md" type="text" maxlength="15" required>
                            </div>
                            <button type="submit" class="btn btn-up btn-info-full next-step">Save and continue</button>
                        </div>
                        <!--///COMPLETED-->

                        
                        <div class="clearfix"></div>
                    </div>
                </form>
            </div>
        </section>
       </div>
    </div>

    <script src="../js/jquery.min.js"></script>
    <script src="../js/bootstrap.min.js"></script>
    <script src="../js/custom.js"></script>
    
  </body>
</html>