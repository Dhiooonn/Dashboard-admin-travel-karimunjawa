
-- Seed Data

-- =========================
-- USERS
-- =========================
INSERT INTO users (name, email, password, role)
VALUES
('Admin Karimunjawa', 'admin@karimunjawa.com', 'admin123', 'admin')
ON CONFLICT (email) DO NOTHING;

-- =========================
-- CUSTOMERS
-- =========================
INSERT INTO customers (name, email, phone, address)
VALUES
('Budi Santoso', 'budi@example.com', '081234567890', 'Semarang'),
('Siti Aminah', 'siti@example.com', '081298765432', 'Jepara'),
('Rizky Pratama', 'rizky@example.com', '082112223333', 'Jakarta')
ON CONFLICT (email) DO NOTHING;

-- =========================
-- PACKAGES
-- =========================
INSERT INTO packages (title, description, price, duration, destination, image, is_active)
VALUES
('Island Hopping', 'Explore beautiful small islands around Karimunjawa.', 750000, '1 Day', 'Karimunjawa', 'island-hopping.jpg', TRUE),
('Snorkeling Adventure', 'Snorkeling trip with guide and equipment.', 500000, '1 Day', 'Karimunjawa', 'snorkeling.jpg', TRUE),
('Private Sunset Tour', 'Enjoy a private sunset experience.', 1200000, '1 Day', 'Karimunjawa', 'sunset-tour.jpg', TRUE)
ON CONFLICT DO NOTHING;

-- =========================
-- BOOKINGS
-- =========================
INSERT INTO bookings (customer_id, package_id, travel_date, guests, total_price, status, payment_status, notes)
VALUES
(1, 1, '2026-04-10', 2, 1500000, 'confirmed', 'paid', 'Honeymoon trip'),
(2, 2, '2026-04-15', 4, 2000000, 'pending', 'unpaid', 'Family vacation'),
(3, 3, '2026-04-20', 3, 3600000, 'confirmed', 'partial', 'Private group booking')
ON CONFLICT DO NOTHING;

-- =========================
-- PAYMENTS
-- =========================
INSERT INTO payments (booking_id, amount, method, status, paid_at)
VALUES
(1, 1500000, 'bank_transfer', 'paid', CURRENT_TIMESTAMP),
(3, 1000000, 'e_wallet', 'partial', CURRENT_TIMESTAMP)
ON CONFLICT DO NOTHING;