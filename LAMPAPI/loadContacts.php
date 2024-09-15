<?php
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);
	$inData = getRequestInfo();
	$userId = intval($inData["userId"]);
	$page = intval($inData["page"]);
	$offset = 10*($page - 1);
	$search = '%'.$inData["search"].'%';
	$searchCount = 0;
	$searchResults = '{ "contacts": [';

	$conn = new mysqli("localhost", "root", ":dQD:QR4/HMX", "contactmanager"); //need to change user and password when deployed
	if( $conn->connect_error ){
		returnWithError( $conn->connect_error );
	}
	else{
                            //if there's a search
        if( $inData["search"] != ""){
            $stmt = $conn->prepare("SELECT * FROM contacts WHERE userId = ? AND (firstname LIKE ? OR lastname LIKE ? OR email LIKE ? OR phone LIKE ?) Limit ? OFFSET ?");
            $stmt->bind_param("issssii", $userId, $search, $search, $search, $search, $limit, $offset);
            $stmt->execute();
            $result = $stmt->get_result();
            while($row = $result->fetch_assoc()){
                if( $searchCount > 0 ){
                    $searchResults .= ",";
                }
                $searchCount++;
                $searchResults .= '{ "id": "' . $row["contactID"] . '", "firstName": "' . $row["firstName"] . '", "lastName": "' . $row["lastName"] . '", "phone": "' . $row["phone"] . '", "email": "' . $row["email"] . '", "dateCreated": "' . $row["createdAt"] . '"}' ;
            }
            $searchResults .= '], "error": "" }';

            if( $searchCount == 0 ){
                returnWithError( "No Records Found" );
            }
            else returnWithInfo($searchResults);
        }
        //no search so load like normal
        else{
            $stmt = $conn->prepare(
            "SELECT * FROM contacts WHERE userId = ? ORDER BY firstname Limit ? OFFSET ?"
            );
            $limit = 10;
            $stmt->bind_param("iii", $userId, $limit, $offset);
            $stmt->execute();
            $result = $stmt->get_result();

            while($row = $result->fetch_assoc())
                    {
                        if( $searchCount > 0 )
                        {
                            $searchResults .= ",";
                        }
                        $searchCount++;
                        $searchResults .= '{ "id": "' . $row["contactID"] . '", "firstName": "' . $row["firstName"] . '", "lastName": "' . $row["lastName"] . '", "phone": "' . $row["phone"] . '", "email": "' . $row["email"] . '"}' ;
                    }
                $searchResults .= '], "error": "" }';

            if( $searchCount == 0 )
                    {
                        returnWithError( "No Records Found" );
                    }

            else returnWithInfo($searchResults);
        }
    }
    $stmt->close();
    $conn->close();

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

	function returnWithInfo( $result )
	{
		echo $result;
	}

?>
