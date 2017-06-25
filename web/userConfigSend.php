<?php 
    //Database config
    include("configDB.php");
    //Session
    include('userSession.php');

    //Config ID and logged USER
    $idConfig = $_POST['createId'];
    $userName = $_SESSION['login_user'];
    $userLower = strtolower($userName);

    if (!empty($userName)) {
        //Get the config from database
        $configGet = $db -> prepare("SELECT * FROM configs WHERE id = '$idConfig'");
        $configGet -> execute();

        //Variable to store an array
        $config = array();

        //Insert the rows into the array
        while ($row = $configGet->fetch(PDO::FETCH_ASSOC)) {
            $config[] = $row;
        }

        //Convert them into json
        json_encode($config);

        //Save it to a json file
        $json_data = str_replace(array('[', ']'), '', htmlspecialchars(json_encode($config), ENT_NOQUOTES));
        
        //IF the folder doesn't exist, make it
        if (!is_dir('../assets/json/userConfigs/'.$userLower)) {
          mkdir('../assets/json/userConfigs/'.$userLower);
        }

        //Save the config as a JSON file
        file_put_contents('../assets/json/userConfigs/'.$userLower.'/userConfig.json', $json_data);
    }

	header('Location: ../game.html');

    //Connection close
    $db = null;
?>