<?php

// Retrieve the JSON payload
    $inData = json_decode(file_get_contents('php://input'), true);

    // Extract the userId from the payload
    $userId = $inData['userId'] ?? null;

    if ($userId) {
        // Use $userId in your SQL query or any other logic
        // For example, saving contact information to the database
        $firstName = $inData['firstName'] ?? '';
        $lastName = $inData['lastName'] ?? '';
        $phone = $inData['phone'] ?? '';
        $email = $inData['email'] ?? '';

        // Connect to the database
        $conn = new mysqli("localhost", "root", ":dQD:QR4/HMX", "contactmanager");
        if ($conn->connect_error) {
            die(json_encode(['error' => $conn->connect_error]));
        }

        // Prepare and execute your SQL query
        $stmt = $conn->prepare("INSERT INTO contacts (firstName, lastName, phone, email, userId) VALUES (?, ?, ?, ?, ?)");
        $stmt->bind_param("ssssi", $firstName, $lastName, $phone, $email, $userId);
        $success = $stmt->execute();

        if ($success) {
            echo json_encode(['error' => '']);
        } else {
            echo json_encode(['error' => 'Failed to save contact']);
        }

        $stmt->close();
        $conn->close();
    } else {
        echo json_encode(['error' => 'User ID not provided']);
    }
?>
