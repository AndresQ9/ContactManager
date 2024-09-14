<?php

// Get the userId from the session or cookie (depending on how you're storing it)
$userId = $_COOKIE['userId'] ?? null;  // Assuming userId is stored in a cookie

if ($userId) {
        $response = [
            'userId' => $userId,
            'error' => ''
        ];
    } else {
        $response = [
            'userId' => null,
            'error' => 'User not logged in'
            die(json_encode(["error" => "ERROR: User not logged in."]));
        ];
    }

// Get the raw POST data
$input = file_get_contents("php://input");
$data = json_decode($input, true);

// Check if decoding JSON worked
if (!$data) {
    die(json_encode(["error" => "ERROR: Invalid input data."]));
}

// Extract the values from the decoded JSON
$first_name = $data['firstName'];
$last_name = $data['lastName'];
$phone = $data['phone'];
$email = $data['email'];

// Database connection
$conn = mysqli_connect("localhost", "root", "dylanswebsite", "contactmanager");

// Check connection
if ($conn === false) {
    die(json_encode(["error" => "ERROR: Could not connect. " . mysqli_connect_error()]));
}

// Validate that all required fields are filled out
if (!$first_name || !$last_name || !$phone || !$email) {
    die(json_encode(["error" => "ERROR: Please fill out all required fields."]));
}

// Prepared statement to prevent SQL injection
$sql = "INSERT INTO contacts (firstName, lastName, phone, email, userID) VALUES (?, ?, ?, ?, ?)";

// Prepare the statement
if ($stmt = mysqli_prepare($conn, $sql)) {

    // Bind the parameters to the prepared statement
    mysqli_stmt_bind_param($stmt, "ssssi", $first_name, $last_name, $phone, $email, $userId);
    
    // Execute the prepared statement
    if (mysqli_stmt_execute($stmt)) {
        echo json_encode(["message" => "Contact added successfully!"]);
    } else {
        echo json_encode(["error" => "ERROR: Could not execute query. " . mysqli_error($conn)]);
    }

    // Close the statement
    mysqli_stmt_close($stmt);
} else {
    echo json_encode(["error" => "ERROR: Could not prepare query. " . mysqli_error($conn)]);
}

// Close connection
mysqli_close($conn);

?>
