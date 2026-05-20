<?php
// checkout.php — receives order data from checkout.js via fetch()
// and saves it to the MySQL database

require_once 'db_connect.php';

// Only accept POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit;
}

// Read JSON body sent by checkout.js
$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid request.']);
    exit;
}

// Sanitize all incoming fields
$sku     = trim($input['sku']     ?? 'RBMETA004'); // Wayfarer is the product shown on the page
$qty     = max(1, intval($input['quantity'] ?? 1));
$email   = trim($input['email']   ?? '');
$name    = trim($input['name']    ?? '');
$country = trim($input['country'] ?? '');
$city    = trim($input['city']    ?? '');
$address = trim($input['address'] ?? '');
$zip     = trim($input['zip']     ?? '');
$phone   = trim($input['phone']   ?? '');

// Basic server-side validation
if (!$email || !$name || !$country || !$city || !$address || !$zip || !$phone) {
    echo json_encode(['success' => false, 'message' => 'All fields are required.']);
    exit;
}

// Look up the product
$stmt = $db->prepare("SELECT * FROM products WHERE sku = ?");
$stmt->execute([$sku]);
$product = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$product) {
    echo json_encode(['success' => false, 'message' => 'Product not found.']);
    exit;
}

// Check stock
if ($qty > $product['stock']) {
    echo json_encode([
        'success' => false,
        'message' => 'Sorry, only ' . $product['stock'] . ' units in stock.'
    ]);
    exit;
}

// Calculate total
$total = round($product['price'] * $qty, 2);

// Save order to database
$stmt = $db->prepare("
    INSERT INTO orders (sku, quantity, total, email, name, country, city, address, zip, phone)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
");
$stmt->execute([$sku, $qty, $total, $email, $name, $country, $city, $address, $zip, $phone]);

// Deduct stock
$db->prepare("UPDATE products SET stock = stock - ? WHERE sku = ?")->execute([$qty, $sku]);

// Return success
echo json_encode([
    'success' => true,
    'message' => 'Order placed successfully.',
    'order'   => [
        'id'      => $db->lastInsertId(),
        'product' => $product['name'],
        'qty'     => $qty,
        'total'   => number_format($total, 2),
    ]
]);
