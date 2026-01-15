-- ============================================
-- ADMIN USERS TABLE
-- Run this in Supabase Dashboard SQL Editor
-- ============================================

-- Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'admin',
  is_active BOOLEAN DEFAULT TRUE
);

-- Enable RLS
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Policy for admin users
DROP POLICY IF EXISTS "Allow all admin_users operations" ON admin_users;
CREATE POLICY "Allow all admin_users operations" ON admin_users FOR ALL USING (TRUE) WITH CHECK (TRUE);

-- Insert admin user
INSERT INTO admin_users (email, name, role, is_active) VALUES
('admin@admin.tz', 'Admin User', 'super_admin', TRUE)
ON CONFLICT (email) DO NOTHING;

-- ============================================
-- IMPORTANT: Create Auth User in Supabase Dashboard
-- ============================================
-- Go to: https://supabase.com/dashboard/project/gpbpxgllblhrxokulcsl/auth/users
-- Click "Add user" -> "Create new user"
-- Email: admin@admin.tz
-- Password: (your choice - make it strong!)
-- Check "Auto Confirm User"
-- ============================================
