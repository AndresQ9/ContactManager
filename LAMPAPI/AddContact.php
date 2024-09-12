<?php
	$inData = getRequestInfo();
	
	$name = $inData["name"];
	$userId = $inData["userId"];
	$email = $inData["email"];
	$phone = $inData["phone"];

	$conn = new mysqli("localhost", "root", ":dQD:QR4/HMX", "contactmanager"); //need to change user and password when deployed
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$stmt = $conn->prepare("INSERT into Contacts (UserId,ContactName,Email,Phone) VALUES(?,?,?,?)"); //TODO date created can possibly be automatically created through database?
		$stmt->bind_param("ssss", $userId, $name, $email, $phone);
		$stmt->execute();
		$stmt->close();
		$conn->close();
		returnWithError("");
	}

	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}
	
	function returnWithError( $err )
	{
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
?>
