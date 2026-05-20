<?php
// Connect to MySQL database (replaces old SQLite inline connection)
require_once 'db_connect.php';

// Display current data from MySQL
$result = $db->query("SELECT * FROM countries ORDER BY country_name");

echo "<h3>Delivery Countries:</h3>";
echo "<table border='1' cellpadding='10'>";
echo "<tr><th>Country</th><th>Code</th><th>Delivery Days</th><th>Shipping Cost</th><th>Active</th></tr>";

foreach ($result as $row) {
    echo "<tr>";
    echo "<td>" . htmlspecialchars($row['country_name']) . "</td>";
    echo "<td>" . htmlspecialchars($row['country_code']) . "</td>";
    echo "<td>" . $row['delivery_time_days'] . "</td>";
    echo "<td>$" . number_format($row['shipping_cost'], 2) . "</td>";
    echo "<td>" . ($row['is_active'] ? 'Yes' : 'No') . "</td>";
    echo "</tr>";
}
echo "</table>";
