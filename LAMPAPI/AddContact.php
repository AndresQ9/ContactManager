<?php
	$inData = json_decode(file_get_contents('php://input'), true);

	$name = $inData["name"];
	$userId = $inData["userId"];
	$email = $inData["email"];
	$phone = $inData["phone"];

	$conn = new mysqli("localhost", "root", "dylanswebsite", "contactmanager"); //need to change user and password when deployed
	if ($conn->connect_error)
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		$stmt = $conn->prepare("INSERT into Contacts (UserId,ContactName,Email,Phone) VALUES(?,?,?,?)"); //TODO test
		$stmt->bind_param("ssss", $userId, $name, $email, $phone);
		$stmt->execute();
		$stmt->close();
		$conn->close();
		returnWithError("");
	}

	function returnWithError( $err )
	{
		$retValue = '{"error":"' . $err . '"}';
		header('Content-type: application/json');
		echo $retValue;
	}

?>
