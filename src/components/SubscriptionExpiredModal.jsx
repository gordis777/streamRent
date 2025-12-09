import React from 'react';
import { AlertTriangle, Clock, X } from 'lucide-react';
import { formatSubscriptionDate } from '../utils/subscriptionHelpers';

const SubscriptionExpiredModal = ({ expiredDate, onClose }) => {
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10000,
            padding: 'var(--spacing-lg)'
        }}>
            <div className="glass-card animate-slide-up" style={{
                maxWidth: '500px',
                width: '100%',
                padding: 'var(--spacing-2xl)',
                textAlign: 'center',
                position: 'relative'
            }}>
                {/* Close button */}
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: 'var(--spacing-md)',
                        right: 'var(--spacing-md)',
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--color-text-muted)',
                        cursor: 'pointer',
                        padding: 'var(--spacing-xs)',
                        borderRadius: 'var(--radius-sm)'
                    }}
                    className="hover-lift"
                >
                    <X size={24} />
                </button>

                {/* Icon */}
                <div style={{
                    width: '80px',
                    height: '80px',
                    margin: '0 auto var(--spacing-lg)',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <AlertTriangle size={40} />
                </div>

                {/* Title */}
                <h2 style={{
                    marginBottom: 'var(--spacing-md)',
                    fontSize: '1.75rem',
                    fontWeight: 700
                }}>
                    Suscripción Expirada
                </h2>

                {/* Message */}
                <p style={{
                    color: 'var(--color-text-muted)',
                    marginBottom: 'var(--spacing-lg)',
                    fontSize: '1.1rem',
                    lineHeight: 1.6
                }}>
                    Tu suscripción expiró el{' '}
                    <strong style={{ color: 'var(--color-danger)' }}>
                        {formatSubscriptionDate(expiredDate)}
                    </strong>
                </p>

                {/* Info box */}
                <div style={{
                    padding: 'var(--spacing-lg)',
                    background: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    borderRadius: 'var(--radius-md)',
                    marginBottom: 'var(--spacing-xl)'
                }}>
                    <div className="flex gap-md" style={{ alignItems: 'flex-start', textAlign: 'left' }}>
                        <Clock size={24} style={{ color: 'var(--color-danger)', flexShrink: 0, marginTop: '2px' }} />
                        <div>
                            <h3 style={{ fontSize: '1rem', marginBottom: 'var(--spacing-xs)' }}>
                                Acceso Denegado
                            </h3>
                            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', margin: 0 }}>
                                Para continuar usando el sistema, contacta al administrador para renovar tu suscripción.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <button
                    onClick={onClose}
                    className="btn btn-primary"
                    style={{
                        width: '100%',
                        padding: 'var(--spacing-md)',
                        fontSize: '1.1rem'
                    }}
                >
                    Entendido
                </button>
            </div>
        </div>
    );
};

export default SubscriptionExpiredModal;
