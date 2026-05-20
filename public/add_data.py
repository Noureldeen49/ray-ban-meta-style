import sqlite3

# Connect to existing database
conn = sqlite3.connect('products.db')
cursor = conn.cursor()

# Additional products to add
new_products = [
    ('RBMETA003', 'Ray-Ban Meta Aviator', 299.99, 8),
    ('RBMETA004', 'Ray-Ban Meta Wayfarer', 269.99, 15),
    ('RBMETA005', 'Ray-Ban Meta Round', 259.99, 6),
    ('RBMETA006', 'Ray-Ban Meta Clubmaster', 289.99, 10),
    ('RBMETA007', 'Ray-Ban Meta Cat Eye', 279.99, 4),
]

# Insert new products
cursor.executemany('INSERT OR IGNORE INTO products (sku, name, price, stock) VALUES (?, ?, ?, ?)', new_products)

# Add some sample orders
sample_orders = [
    ('RBMETA001', 2, 499.98),
    ('RBMETA002', 1, 279.99),
    ('RBMETA001', 1, 249.99),
]

cursor.executemany('INSERT INTO orders (sku, quantity, total) VALUES (?, ?, ?)', sample_orders)

conn.commit()

# Show current data
print("Products in database:")
cursor.execute("SELECT * FROM products")
products = cursor.fetchall()
for product in products:
    print(f"SKU: {product[0]}, Name: {product[1]}, Price: ${product[2]}, Stock: {product[3]}")

print("\nOrders in database:")
cursor.execute("SELECT o.id, p.name, o.quantity, o.total, o.order_date FROM orders o JOIN products p ON o.sku = p.sku")
orders = cursor.fetchall()
for order in orders:
    print(f"Order #{order[0]}: {order[1]} x{order[2]} = ${order[3]} ({order[4]})")

conn.close()

print("\nDatabase updated successfully!")