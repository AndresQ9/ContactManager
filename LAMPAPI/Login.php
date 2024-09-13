
<?php

	$inData = getRequestInfo();

	$conn = new mysqli("localhost", "root", "dylanswebsite", "contactmanager"); //need to change user and password when deployed
	if( $conn->connect_error )
	{

		returnWithError( $conn->connect_error );
	}
	else
	{

		$stmt = $conn->prepare("SELECT userId FROM users WHERE userName=? AND password =?");

		$stmt->bind_param("ss", $inData["userName"], $inData["password"]);
		$stmt->execute();
		$result = $stmt->get_result();

		if( $row = $result->fetch_assoc()  )
		{
			returnWithInfo( $row['userId'] );
		}
		else
		{
			returnWithError("No Records Found");
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
		$retValue = '{"id":0,"firstName":"","lastName":"","error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
	function returnWithInfo( $id )
	{
		$retValue = '{"id":' . $id . ',"error":""}';
		sendResultInfoAsJson( $retValue );
	}

?>
