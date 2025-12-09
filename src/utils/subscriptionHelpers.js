/**
 * Subscription Helper Functions
 * Utilities for managing user subscriptions and expiration dates
 */

/**
 * Calculate subscription end date based on start date and duration
 * @param {Date|string} startDate - Start date of subscription
 * @param {number} durationMonths - Duration in months (1, 3, 6, 12)
 * @returns {Date} End date of subscription
 */
export const calculateEndDate = (startDate, durationMonths) => {
    const start = new Date(startDate);
    const end = new Date(start);
    end.setMonth(end.getMonth() + durationMonths);
    return end;
};

/**
 * Get number of days remaining in subscription
 * @param {Date|string} endDate - End date of subscription
 * @returns {number} Days remaining (negative if expired)
 */
export const getDaysRemaining = (endDate) => {
    const now = new Date();
    const end = new Date(endDate);
    const diffTime = end - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
};

/**
 * Check if subscription is currently active
 * @param {Date|string} endDate - End date of subscription
 * @returns {boolean} True if active, false if expired
 */
export const isSubscriptionActive = (endDate) => {
    if (!endDate) return false;
    const now = new Date();
    const end = new Date(endDate);
    return end > now;
};

/**
 * Get subscription status with color indicator
 * @param {Date|string} endDate - End date of subscription
 * @returns {object} Status object with state, color, and message
 */
export const getSubscriptionStatus = (endDate) => {
    if (!endDate) {
        return {
            state: 'expired',
            color: 'red',
            message: 'Sin suscripción'
        };
    }

    const daysRemaining = getDaysRemaining(endDate);

    if (daysRemaining < 0) {
        return {
            state: 'expired',
            color: 'red',
            message: 'Suscripción expirada'
        };
    } else if (daysRemaining <= 7) {
        return {
            state: 'critical',
            color: 'red',
            message: `Expira en ${daysRemaining} día${daysRemaining !== 1 ? 's' : ''}`
        };
    } else if (daysRemaining <= 30) {
        return {
            state: 'warning',
            color: 'orange',
            message: `${daysRemaining} días restantes`
        };
    } else {
        return {
            state: 'active',
            color: 'green',
            message: `${daysRemaining} días restantes`
        };
    }
};

/**
 * Format date for display
 * @param {Date|string} date - Date to format
 * @returns {string} Formatted date string
 */
export const formatSubscriptionDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('es-MX', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

/**
 * Get subscription duration options for select dropdown
 * @returns {Array} Array of duration options
 */
export const getSubscriptionDurationOptions = () => [
    { value: 1, label: '1 mes' },
    { value: 3, label: '3 meses' },
    { value: 6, label: '6 meses' },
    { value: 12, label: '1 año' }
];
