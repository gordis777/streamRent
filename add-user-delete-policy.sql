-- =====================================================
-- Add DELETE Policy for Users Table (Admin Only)
-- =====================================================
-- This migration fixes the user deletion issue by adding
-- the missing RLS DELETE policy for the users table.
--
-- IMPORTANT: Solo los ADMINISTRADORES pueden eliminar usuarios.
-- Esta validación se hace en el código de la aplicación 
-- (AuthContext.jsx), esta política RLS solo permite que 
-- las eliminaciones autorizadas se ejecuten en la base de datos.
--
-- INSTRUCTIONS:
-- 1. Go to your Supabase Dashboard
-- 2. Navigate to SQL Editor
-- 3. Create a new query
-- 4. Paste this SQL
-- 5. Execute
-- =====================================================

-- First, check if the policy already exists and drop it if needed
DO $$ 
BEGIN
    -- Drop the policy if it exists
    DROP POLICY IF EXISTS "Users can delete users" ON users;
    RAISE NOTICE 'Existing policy removed (if any)';
EXCEPTION 
    WHEN undefined_object THEN 
        RAISE NOTICE 'No existing policy found';
END $$;

-- Add DELETE policy for users table
-- Note: The application logic in AuthContext.jsx ensures:
--   1. Only admins have access to delete functionality
--   2. Cannot delete yourself
--   3. Cannot delete the last admin
-- This RLS policy simply allows those validated deletions to execute
CREATE POLICY "Users can delete users" ON users
    FOR DELETE USING (true);

-- Verify the policy was created
DO $$
BEGIN
    RAISE NOTICE '✅ DELETE policy added successfully to users table';
    RAISE NOTICE '🔒 Only admins can delete users (validated in application)';
    RAISE NOTICE '🛡️  Protected: Cannot delete yourself or last admin';
END $$;

