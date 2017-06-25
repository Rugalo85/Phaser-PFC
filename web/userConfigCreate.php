<?php 
    //Database config
    include("configDB.php");
    //Session
    include('userSession.php');

    //Get the values from the form
    $userName = $_SESSION['login_user'];
    $configName = $_POST['configName'];

    $player01Name = $_POST['player01Name'];
    $player01Speed = $_POST['player01Speed'];
    $player01Lives = $_POST['player01Lives'];
    $player01Skin = $_POST['player01Skin'];
    $player01Bullets = $_POST['player01Bullets'];
    $gainplayer01Lives = $_POST['gainplayer01Lives'];

    $player02Name = $_POST['player02Name'];
    $player02Speed = $_POST['player02Speed'];
    $player02Lives = $_POST['player02Lives'];
    $player02Skin = $_POST['player02Skin'];
    $player02Bullets = $_POST['player02Bullets'];
    $gainplayer02Lives = $_POST['gainplayer02Lives'];

    $enemy01Spacing = $_POST['enemy01Spacing'];
    $enemy01Speed = $_POST['enemy01Speed'];

    $enemy02Spacing = $_POST['enemy02Spacing'];
    $enemy02Speed = $_POST['enemy02Speed'];
    $enemy02BulletSpeed = $_POST['enemy02BulletSpeed'];
    $enemy02FiringDelay = $_POST['enemy02FiringDelay'];

    $enemy03Spacing = $_POST['enemy03Spacing'];
    $enemy03Speed = -180;
    $numEnemies03InWave = $_POST['numEnemies03InWave'];

    $enemy04Spacing = $_POST['enemy04Spacing'];
    $enemy04Speed = $_POST['enemy04Speed'];

    $enemiesToDefeat = $_POST['enemiesToDefeat'];
    $boss01Shields = $_POST['boss01Shields'];
    $boss01Speed = $_POST['boss01Speed'];
    $boss01BulletSpeed01 = $_POST['boss01BulletSpeed01'];
    $boss01BulletSpeed02 = $_POST['boss01BulletSpeed02'];
    $boss01BulletSpeed03 = $_POST['boss01BulletSpeed03'];
    $boss01FiringDelay01 = $_POST['boss01FiringDelay01'];
    $boss01FiringDelay02 = $_POST['boss01FiringDelay02'];
    $boss01FiringDelay03 = $_POST['boss01FiringDelay03'];

    //Players name check
    if ($player01Name == "" || $player01Name == null) {
        $player01Name = "Player01";
    }
    if ($player02Name == "" || $player02Name == null) {
        $player02Name = "Player02";
    }

    //Players lives check
    if ($player01Lives == "" || $player01Lives == null) {
        $player01Lives = 5;
    }
    if ($player02Lives == "" || $player02Lives == null) {
        $player02Lives = 5;
    }
    if ($gainplayer01Lives == "" || $gainplayer01Lives == null || $gainplayer01Lives == 0) {
        $gainplayer01Lives = 1250;
    }
    if ($gainplayer02Lives == "" || $gainplayer02Lives == null || $gainplayer02Lives == 0) {
        $gainplayer02Lives = 1250;
    }

    //Config name check
    if ($configName == "" || $configName == null) {
        $configName = "My config";
    }

    //Enemies check
    if ($enemy01Spacing == "" || $enemy01Spacing == null || $enemy01Spacing == 0) {
        $enemy01Spacing = 2000;
    }
    if ($enemy02Spacing == "" || $enemy02Spacing == null || $enemy02Spacing == 0) {
        $enemy02Spacing = 3000;
    }
    if ($enemy03Spacing == "" || $enemy03Spacing == null || $enemy03Spacing == 0) {
        $enemy03Spacing = 5000;
    }
    if ($enemy04Spacing == "" || $enemy04Spacing == null || $enemy04Spacing == 0) {
        $enemy04Spacing = 15000;
    }
    if ($enemy02FiringDelay == "" || $enemy02FiringDelay == null || $enemy02FiringDelay == 0) {
        $enemy02FiringDelay = 2500;
    }

    //Boss check
    if ($enemiesToDefeat == "" || $enemiesToDefeat == null || $enemiesToDefeat == 0) {
        $enemiesToDefeat = 20;
    }
    if ($boss01FiringDelay01 == "" || $boss01FiringDelay01 == null || $boss01FiringDelay01 == 0) {
        $boss01FiringDelay01 = 2000;
    }
    if ($boss01FiringDelay02 == "" || $boss01FiringDelay02 == null || $boss01FiringDelay02 == 0) {
        $boss01FiringDelay02 = 3000;
    }
    if ($boss01FiringDelay03 == "" || $boss01FiringDelay03 == null || $boss01FiringDelay03 == 0) {
        $boss01FiringDelay03 = 5000;
    }

    //Preparing the query
    $sendConfig = $db -> prepare("INSERT INTO configs (userName, configName, player01Name, player01Speed, player01Lives, player01Skin, player01Bullets, gainplayer01Lives, player02Name, player02Speed, player02Lives, player02Skin, player02Bullets, gainplayer02Lives, enemy01Spacing, enemy01Speed, enemy02Spacing, enemy02Speed, enemy02BulletSpeed, enemy02FiringDelay, enemy03Spacing, enemy03Speed, numEnemies03InWave, enemy04Spacing, enemy04Speed, enemiesToDefeat, boss01Shields, boss01Speed, boss01BulletSpeed01, boss01BulletSpeed02, boss01BulletSpeed03, boss01FiringDelay01, boss01FiringDelay02, boss01FiringDelay03) VALUES ('$userName', '$configName', '$player01Name', '$player01Speed', '$player01Lives', '$player01Skin', '$player01Bullets', '$gainplayer01Lives', '$player02Name', '$player02Speed', '$player02Lives', '$player02Skin', '$player02Bullets', '$gainplayer02Lives', '$enemy01Spacing', '$enemy01Speed', '$enemy02Spacing', '$enemy02Speed', '$enemy02BulletSpeed', '$enemy02FiringDelay', '$enemy03Spacing', '$enemy03Speed', '$numEnemies03InWave', '$enemy04Spacing', '$enemy04Speed', '$enemiesToDefeat', '$boss01Shields', '$boss01Speed', '$boss01BulletSpeed01', '$boss01BulletSpeed02', '$boss01BulletSpeed03', '$boss01FiringDelay01', '$boss01FiringDelay02', '$boss01FiringDelay03')");

    if ($sendConfig -> execute()) {
        echo "<script type='text/javascript'> alert('The configuration has been created succesfully.')</script>';";
        echo "<script type='text/javascript'> window.location.replace('userEditor.php')</script>';";
    } else {
        echo "<script type='text/javascript'> alert('There was a problem creating the configuration')</script>';";
        echo "<script type='text/javascript'> window.location.replace('userEditor.php')</script>';";
    }
    
    //Connection close
    $db = null;
?>