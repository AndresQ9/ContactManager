<?php
	$inData = getRequestInfo();
	
	$contact = $inData["contact"];
	$userId = $inData["userId"];
	$email = $inData["email"]
	$phone = $inData["phone"]

	$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331"); //TODO
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$stmt = $conn->prepare("INSERT into Contacts (UserId,Name,Email,Phone) VALUES(?,?,?,?)"); //TODO date created can possibly be automatically created through database?
		$stmt->bind_param("ssss", $userId, $contact, $email, $phone);
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