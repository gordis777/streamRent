-- =====================================================
-- Add User Subscription/Membership Fields
-- =====================================================
-- This migration adds subscription tracking to users.
-- ALL users (including admins) will have subscription limits.
-- Users with expired subscriptions cannot access the system.
-- =====================================================

-- Add subscription fields to users table
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS subscription_start_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
ADD COLUMN IF NOT EXISTS subscription_duration_months INTEGER DEFAULT 1,
ADD COLUMN IF NOT EXISTS subscription_end_date TIMESTAMP WITH TIME ZONE;

-- Create function to calculate subscription end date
CREATE OR REPLACE FUNCTION calculate_subscription_end_date(
    start_date TIMESTAMP WITH TIME ZONE,
    duration_months INTEGER
) RETURNS TIMESTAMP WITH TIME ZONE AS $$
BEGIN
    RETURN start_date + (duration_months || ' months')::INTERVAL;
END;
$$ LANGUAGE plpgsql;

-- Update existing users with default subscription (1 year from now)
UPDATE users 
SET 
    subscription_start_date = NOW(),
    subscription_duration_months = 12,
    subscription_end_date = calculate_subscription_end_date(NOW(), 12)
WHERE subscription_end_date IS NULL;

-- Create trigger to auto-calculate end date on insert/update
CREATE OR REPLACE FUNCTION update_subscription_end_date()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.subscription_start_date IS NOT NULL AND NEW.subscription_duration_months IS NOT NULL THEN
        NEW.subscription_end_date := calculate_subscription_end_date(
            NEW.subscription_start_date, 
            NEW.subscription_duration_months
        );
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_update_subscription_end_date ON users;
CREATE TRIGGER trigger_update_subscription_end_date
    BEFORE INSERT OR UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_subscription_end_date();

-- Verify the changes
DO $$
BEGIN
    RAISE NOTICE '✅ Subscription fields added to users table';
    RAISE NOTICE '📅 Fields: subscription_start_date, subscription_duration_months, subscription_end_date';
    RAISE NOTICE '🔄 Auto-trigger created to calculate end dates';
    RAISE NOTICE '👥 Existing users updated with 12-month subscription';
END $$;
