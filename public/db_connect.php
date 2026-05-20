<?php
// ============================================================
//  db_connect.php — MySQL database connection for rayban_meta
//  XAMPP default settings: localhost, root, no password
//  Uses PDO to match all existing PHP files ($db variable)
// ============================================================

define('DB_HOST', 'localhost');
define('DB_NAME', 'rayban_meta');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_CHARSET', 'utf8mb4');

$dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=" . DB_CHARSET;

$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,   // throw exceptions on error
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,         // return arrays by default
    PDO::ATTR_EMULATE_PREPARES   => false,                    // use real prepared statements
];

try {
    $db = new PDO($dsn, DB_USER, DB_PASS, $options);
} catch (PDOException $e) {
    // Show a clean error — never expose $e->getMessage() in production
    die("Database connection failed. Please check your XAMPP MySQL service is running.");
}
