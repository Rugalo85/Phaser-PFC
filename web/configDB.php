<?php 
	try {
		//Connection starts
		$db = new PDO("mysql:host=localhost;dbname=zephyrus", "zephyrus", "Pr0j3ct");
	    $db->setAttribute(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY, TRUE);
		return($db);
	} catch (PDOException $e) {
		//Connection check
		print "<p>Error: Connection with the database failed.</p>\n";
		print "<p>Error: " . $e->getMessage() . "</p>\n";
		exit();
	}
?>