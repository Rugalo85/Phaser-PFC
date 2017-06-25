<?php 
    //Database config
    include("configDB.php");

    //Get the score from the game
    $score01 = $_POST['scorePlayer01'];
    $score02 = $_POST['scorePlayer02'];
    $playerName01 = $_POST['nameVariable01'];
    $playerName02 = $_POST['nameVariable02'];
    
    //Preparing the query
    $scoreInsert01 = $db -> prepare("INSERT INTO scores (playerScore, playerName) VALUES ('$score01', '$playerName01');");
    $scoreInsert01 -> execute();

    if ($playerName02 != "" || $playerName02 != null) {
        $scoreInsert02 = $db -> prepare("INSERT INTO scores (playerScore, playerName) VALUES ('$score02', '$playerName02');");
        $scoreInsert02 -> execute();
    }

    //PLAYERSCORE * 1 TO CONVERT TO INT AND ORDER IT
    $scoreGet = $db -> prepare('SELECT playerName, (playerScore * 1) AS playerScore FROM scores ORDER BY playerScore DESC LIMIT 10');
    $scoreGet -> execute();

    //Variable to store an array
    $data = array();

    //Insert the rows into the array
    while ($row = $scoreGet->fetch(PDO::FETCH_ASSOC)) {
        $data[] = $row;
    }

    //Convert them into json
    json_encode($data);

    //Save it to a json file 
    $json_data = json_encode($data);
    file_put_contents('../assets/json/scores.json', $json_data);

    //Connection close
    $db = null;
?>