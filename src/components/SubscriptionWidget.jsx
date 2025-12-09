import React from 'react';
import { Calendar, Clock, AlertCircle } from 'lucide-react';
import {
    getDaysRemaining,
    getSubscriptionStatus,
    formatSubscriptionDate
} from '../utils/subscriptionHelpers';

const SubscriptionWidget = ({ subscriptionEndDate }) => {
    if (!subscriptionEndDate) {
        return null;
    }

    const daysRemaining = getDaysRemaining(subscriptionEndDate);
    const status = getSubscriptionStatus(subscriptionEndDate);

    // Calculate progress percentage (assuming 1 month = 30 days for visual purposes)
    const totalDays = 30;
    const progress = daysRemaining > 0 ? Math.min((daysRemaining / totalDays) * 100, 100) : 0;

    // Color based on status
    const getColor = () => {
        if (status.state === 'active') return '#10b981';
        if (status.state === 'warning') return '#f59e0b';
        return '#ef4444';
    };

    const color = getColor();

    return (
        <div className="glass-card" style={{
            padding: 'var(--spacing-lg)',
            marginBottom: 'var(--spacing-xl)',
            border: `2px solid ${color}20`
        }}>
            <div className="flex-between" style={{ marginBottom: 'var(--spacing-md)' }}>
                <div className="flex gap-md" style={{ alignItems: 'center' }}>
                    <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        background: `linear-gradient(135deg, ${color}, ${color}dd)`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        {status.state === 'expired' || status.state === 'critical' ? (
                            <AlertCircle size={20} />
                        ) : (
                            <Calendar size={20} />
                        )}
                    </div>
                    <div>
                        <h3 style={{
                            fontSize: '1.1rem',
                            fontWeight: 700,
                            marginBottom: 'var(--spacing-2xs)'
                        }}>
                            Estado de Suscripción
                        </h3>
                        <p style={{
                            color: 'var(--color-text-muted)',
                            fontSize: '0.875rem',
                            margin: 0
                        }}>
                            {status.message}
                        </p>
                    </div>
                </div>

                {/* Days remaining badge */}
                <div style={{
                    padding: 'var(--spacing-sm) var(--spacing-md)',
                    borderRadius: 'var(--radius-md)',
                    background: `${color}20`,
                    border: `1px solid ${color}40`,
                    textAlign: 'center'
                }}>
                    <div style={{
                        fontSize: '1.75rem',
                        fontWeight: 700,
                        color: color,
                        lineHeight: 1
                    }}>
                        {daysRemaining < 0 ? 0 : daysRemaining}
                    </div>
                    <div style={{
                        fontSize: '0.75rem',
                        color: 'var(--color-text-muted)',
                        marginTop: 'var(--spacing-2xs)'
                    }}>
                        días
                    </div>
                </div>
            </div>

            {/* Progress bar */}
            <div style={{
                width: '100%',
                height: '8px',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: 'var(--radius-full)',
                overflow: 'hidden',
                marginBottom: 'var(--spacing-md)'
            }}>
                <div style={{
                    width: `${progress}%`,
                    height: '100%',
                    background: `linear-gradient(90deg, ${color}, ${color}dd)`,
                    borderRadius: 'var(--radius-full)',
                    transition: 'width 0.3s ease'
                }} />
            </div>

            {/* Expiration date */}
            <div className="flex gap-sm" style={{
                alignItems: 'center',
                fontSize: '0.875rem',
                color: 'var(--color-text-muted)'
            }}>
                <Clock size={16} />
                <span>
                    Vence el: <strong style={{ color: color }}>
                        {formatSubscriptionDate(subscriptionEndDate)}
                    </strong>
                </span>
            </div>

            {/* Warning message for expiring soon */}
            {(status.state === 'warning' || status.state === 'critical') && (
                <div style={{
                    marginTop: 'var(--spacing-md)',
                    padding: 'var(--spacing-md)',
                    background: `${color}10`,
                    border: `1px solid ${color}30`,
                    borderRadius: 'var(--radius-md)',
                    fontSize: '0.875rem'
                }}>
                    <strong>⚠️ Renovación Próxima:</strong> Contacta al administrador para renovar tu suscripción.
                </div>
            )}
        </div>
    );
};

export default SubscriptionWidget;
