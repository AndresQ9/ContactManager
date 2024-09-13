<?php
header('Content-Type: application/json');

// Database connection parameters
$host = 'localhost'; // Your database host
$db = 'your_database'; // Your database name
$user = 'your_user'; // Your database username
$pass = 'your_password'; // Your database password

// Create database connection
$mysqli = new mysqli("localhost", "root", "dylanswebsite", "contactmanager");

// Check connection
if ($mysqli->connect_error) {
    die(json_encode(['success' => false, 'message' => 'Database connection failed: ' . $mysqli->connect_error]));
}

// Get POST data
$data = json_decode(file_get_contents('php://input'), true);

if ($data) {
    $name = $mysqli->real_escape_string($data['name']);
    $nickname = $mysqli->real_escape_string($data['nickname']);
    $phone = $mysqli->real_escape_string($data['phone']);
    $email = $mysqli->real_escape_string($data['email']);
    $id = isset($data['id']) ? intval($data['id']) : null;

    if ($id) {
        // Update existing contact
        $query = "UPDATE contacts SET name='$name', nickname='$nickname', phone='$phone', email='$email' WHERE id=$id";
    } else {
        // Insert new contact
        $query = "INSERT INTO contacts (name, nickname, phone, email) VALUES ('$name', '$nickname', '$phone', '$email')";
    }

    if ($mysqli->query($query)) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error: ' . $mysqli->error]);
    }

    $mysqli->close();
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid input']);
}
?>
