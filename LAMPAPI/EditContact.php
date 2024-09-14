<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

	$inData = getRequestInfo();

	$contactId = $inData["contactId"];
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
		$stmt = $conn->prepare("UPDATE Contacts SET ContactName = ?, Email = ?, Phone = ? WHERE id = ? AND UserId = ?"); //TODO test
		$stmt->bind_param("sssii", $name, $email, $phone, $contactId, $userId);
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
