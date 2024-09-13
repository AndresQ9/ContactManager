<?php
// Database connection details
$servername = "localhost";
$username = "root";
$password = "password";
$dbname = "your_database";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get the input data from the POST request
$data = json_decode(file_get_contents('php://input'), true);

$id = isset($data['id']) ? $data['id'] : null;
$name = $data['name'];
$nickname = $data['nickname'];
$phone = $data['phone'];
$email = $data['email'];

// Check if it's an update or insert
if ($id) {
    // Update existing contact
    $stmt = $conn->prepare("UPDATE contacts SET name=?, nickname=?, phone=?, email=? WHERE id=?");
    $stmt->bind_param("ssssi", $name, $nickname, $phone, $email, $id);
} else {
    // Insert new contact
    $stmt = $conn->prepare("INSERT INTO contacts (name, nickname, phone, email) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $name, $nickname, $phone, $email);
}

// Execute the statement and check if successful
if ($stmt->execute()) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => $stmt->error]);
}

// Close connections
$stmt->close();
$conn->close();
?>
