<?php

// Allow cross-origin requests from specific domains
header('Access-Control-Allow-Origin:*');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

// Include the file containing the function
include('getContactList.php');

// Get the request method
$requestMethod = $_SERVER["REQUEST_METHOD"];

// Handle the request
if ($requestMethod === "GET") {
    try {
        // Call the function to get customer data
        $customerList = getCustomerList();
        
        // Check if the function returned valid JSON
        if (json_last_error() === JSON_ERROR_NONE) {
            echo $customerList;
        } else {
            throw new Exception("Invalid JSON data");
        }
    } catch (Exception $e) {
        // Handle exceptions and errors
        $data = [
            'status' => 500,
            'message' => 'Internal Server Error: ' . $e->getMessage()
        ];
        header("HTTP/1.1 500 Internal Server Error");
        echo json_encode($data);
    }
} else {
    // Handle method not allowed
    $data = [
        'status' => 405,
        'message' => $requestMethod . ' Method Not Allowed'
    ];
    header("HTTP/1.1 405 Method Not Allowed");
    echo json_encode($data);
}

?>
