<?php

// Helper function to get the JSON request body
function getRequestInfo()
{
    return json_decode(file_get_contents('php://input'), true);
}

// Helper function to send a JSON response with an error message
function returnWithError($err)
{
    $retValue = json_encode(["error" => $err]);
    sendResultInfoAsJson($retValue);
}

// Helper function to send JSON response
function sendResultInfoAsJson($obj)
{
    header('Content-type: application/json');
    echo $obj;
}

// Database connection
$servername = "localhost"; // Change if needed
$username = "root"; // Your database username
$password = "dylanswebsite"; // Your database password
$dbname = "contactmanager"; // Your database name

$conn = new mysqli($servername, $username, $password, $dbname);

// Check for connection errors
if ($conn->connect_error) 
{
    returnWithError($conn->connect_error);
    exit();
}

// Get the data from the JSON request
$inData = getRequestInfo();

$firstName = $inData["firstName"];
$lastName = $inData["lastName"];
$phone = $inData["phone"];
$email = $inData["email"];
$userId = $inData["userId"];  // Ensure that the userId is sent from the frontend

// Validate the input
if (empty($firstName) || empty($lastName) || empty($phone) || empty($email) || empty($userId))
{
    returnWithError("All fields are required.");
    exit();
}

// SQL query to insert a new contact
$sql = "INSERT INTO contacts (email, phone, firstName, lastName, userID) 
        VALUES (?, ?, ?, ?, ?)";

// Prepare statement to prevent SQL injection
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssssi", $email, $phone, $firstName, $lastName, $userId);

// Execute the query and check for errors
if ($stmt->execute()) 
{
    // Success response
    $response = json_encode(["error" => ""]);
    sendResultInfoAsJson($response);
}
else 
{
    // Error response
    returnWithError($stmt->error);
}

// Close the statement and connection
$stmt->close();
$conn->close();

?>
