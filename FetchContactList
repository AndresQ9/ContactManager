<?php

require '../inc/db_connection.php';

// Function to handle and return JSON responses
function sendJsonResponse($statusCode, $message, $data = null) {
    header("Content-Type: application/json");
    http_response_code($statusCode);
    $response = ['status' => $statusCode, 'message' => $message];
    if ($data !== null) {
        $response['data'] = $data;
    }
    echo json_encode($response);
    exit();
}

// Check for database connection errors
if (!$conn) {
    sendJsonResponse(500, 'Database connection failed');
}

// Function to fetch the contact list from the database
function getContactList() {
    global $conn;

    // Prepare the SQL statement to prevent SQL injection
    $query = "SELECT * FROM contacts";
    
    if ($stmt = $conn->prepare($query)) {
        $stmt->execute();
        $result = $stmt->get_result();

        // Close the statement
        $stmt->close();

        if ($result->num_rows > 0) {
            $res = $result->fetch_all(MYSQLI_ASSOC);
            sendJsonResponse(200, 'Contact List Fetched Successfully', $res);
        } else {
            sendJsonResponse(404, 'No Contacts Found');
        }
    } else {
        sendJsonResponse(500, 'Internal Server Error');
    }
}

// Fetch and return the contact list
getContactList();

// Close the database connection
$conn->close();

?>
