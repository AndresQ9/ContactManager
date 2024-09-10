
<?php

	$inData = getRequestInfo();

	$id = 0;
	$firstName = "";
	$lastName = "";


	$conn = new mysqli("localhost", "root", ":dQD:QR4/HMX", "contactmanager"); //need to change user and password when deployed
	if( $conn->connect_error )
	{
		returnWithError( $conn->connect_error );
	}
	else
	{

		$stmt = $conn->prepare("SELECT userName FROM users WHERE userName = ?");
		echo 'hi';
		return;
		$stmt->bind_param("s", $inData["userName"]);
		$stmt->execute();
		$result = $stmt->get_result();

		if($result ->num_rows ==0){
            $stmt = $conn->prepare("INSERT INTO users (userName, password) VALUES (?, ?)");
            $stmt->bind_param("ss", $inData["userName"], $inData["password"]);
            $stmt->execute();
            $result = $stmt->get_result();
            if( $row = $result->fetch_assoc()  )
            		{
            			returnWithInfo( $row['userId'] );
            		}
            else returnWithError("error occurred")
		}
		else
		{
			returnWithError("Username taken");
		}

		$stmt->close();
		$conn->close();
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
		$retValue = '{"id":0,"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}

	function returnWithInfo( $id )
	{
		$retValue = '{"id":' . $id . ',"error":""}';
		sendResultInfoAsJson( $retValue );
	}

?>
