-- ============================================
-- SOLO EJECUTA ESTO - Agregar Política DELETE
-- ============================================

DROP POLICY IF EXISTS "Users can delete users" ON users;

CREATE POLICY "Users can delete users" ON users
    FOR DELETE USING (true);
