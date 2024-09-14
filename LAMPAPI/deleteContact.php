<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Retrieve the JSON payload
$inData = json_decode(file_get_contents('php://input'), true);

// Extract the userId and contactId from the payload
$userId = $inData['userId'] ?? null;
$contactId = $inData['contactId'] ?? null;

if ($userId && $contactId) {
    // Connect to the database
    $conn = new mysqli("localhost", "root", ":dQD:QR4/HMX", "contactmanager");
    if ($conn->connect_error) {
        die(json_encode(['error' => $conn->connect_error]));
    }

    // Prepare and execute your SQL query to delete the contact
    $stmt = $conn->prepare("DELETE FROM contacts WHERE contactID = ? AND userId = ?");
    $stmt->bind_param("ii", $contactId, $userId);
    $success = $stmt->execute();

    if ($success) {
        echo json_encode(['error' => '']);  // No error
    } else {
        echo json_encode(['error' => 'Failed to delete contact']);
    }

    $stmt->close();
    $conn->close();
} else {
    echo json_encode(['error' => 'User ID or Contact ID not provided']);
}
?>
