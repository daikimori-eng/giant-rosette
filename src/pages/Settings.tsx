
import React, { useState, useEffect } from 'react';
import { ArrowLeft, CreditCard, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PLANS } from '../config/constants';
import { getSubscription, setSubscription, UserPlan, getRemainingAiCount } from '../utils/subscription';

export const Settings = () => {
    const [currentPlan, setCurrentPlan] = useState<UserPlan>('FREE');
    const [saveMessage, setSaveMessage] = useState('');

    useEffect(() => {
        setCurrentPlan(getSubscription());
    }, []);

    const handlePlanChange = (plan: UserPlan) => {
        setSubscription(plan);
        setCurrentPlan(plan);
        setSaveMessage('プランを変更しました');
        setTimeout(() => setSaveMessage(''), 3000);
    };

    // Inline CSS Styles
    const styles = {
        container: {
            minHeight: '100vh',
            backgroundColor: '#f8fafc', // slate-50
            paddingBottom: '5rem',
            fontFamily: 'sans-serif',
        },
        header: {
            backgroundColor: 'white',
            boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
            position: 'sticky' as const,
            top: 0,
            zIndex: 10,
        },
        headerContent: {
            maxWidth: '896px', // max-w-4xl
            margin: '0 auto',
            padding: '0 1rem',
            height: '3.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        main: {
            maxWidth: '896px',
            margin: '0 auto',
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column' as const,
            gap: '2rem',
        },
        statusCard: {
            backgroundColor: 'white',
            padding: '1.5rem',
            borderRadius: '0.75rem',
            boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
            border: '1px solid #e2e8f0', // slate-200
            maxWidth: '28rem',
            margin: '0 auto',
            width: '100%',
        },
        grid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', // Responsive grid
            gap: '1.5rem',
        },
        planButton: (isSelected: boolean, type: UserPlan) => {
            let borderColor = '#e2e8f0'; // slate-200
            let bg = 'white';
            let transform = 'none';
            let boxShadow = 'none';

            if (isSelected) {
                transform = 'translateY(-4px)';
                if (type === 'PREMIUM') {
                    borderColor = '#fbbf24'; // amber-400
                    bg = 'linear-gradient(to bottom, #fffbeb, #ffffff)'; // amber-50 to white
                    boxShadow = '0 10px 15px -3px rgba(251, 191, 36, 0.3)';
                } else if (type === 'BASIC') {
                    borderColor = '#3b82f6'; // blue-500
                    bg = '#eff6ff'; // blue-50
                    boxShadow = '0 10px 15px -3px rgba(59, 130, 246, 0.3)';
                } else {
                    borderColor = '#475569'; // slate-600
                    bg = '#f1f5f9'; // slate-100
                    boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
                }
            }

            return {
                textAlign: 'left' as const,
                borderRadius: '1rem',
                border: `2px solid ${borderColor}`,
                transition: 'all 0.3s ease',
                position: 'relative' as const,
                display: 'flex',
                flexDirection: 'column' as const,
                height: '100%',
                overflow: 'hidden',
                cursor: 'pointer',
                background: bg,
                transform: transform,
                boxShadow: boxShadow,
                padding: 0, // Reset padding for internal layout
            };
        },
        cardHeader: (type: UserPlan, isSelected: boolean) => {
            let bg = '#f8fafc'; // slate-50
            let borderBottom = '1px solid #f1f5f9'; // slate-100

            if (isSelected) {
                if (type === 'PREMIUM') {
                    bg = 'rgba(254, 243, 199, 0.5)'; // amber-100/50
                    borderBottom = '1px solid #fde68a'; // amber-200
                } else if (type === 'BASIC') {
                    bg = 'rgba(219, 234, 254, 0.5)'; // blue-100/50
                    borderBottom = '1px solid #bfdbfe'; // blue-200
                } else {
                    bg = '#e2e8f0'; // slate-200
                }
            }
            return {
                padding: '1.5rem',
                backgroundColor: bg,
                borderBottom: borderBottom,
            };
        }
    };

    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <div style={styles.headerContent}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Link to="/" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0.5rem', borderRadius: '9999px', color: '#475569', textDecoration: 'none' }}>
                            <ArrowLeft size={20} />
                        </Link>
                        <h1 style={{ fontWeight: 'bold', color: '#1e293b', fontSize: '1.125rem', margin: 0 }}>設定</h1>
                    </div>
                </div>
            </header>

            <main style={styles.main}>

                {/* Current Status */}
                <section style={styles.statusCard}>
                    <h2 style={{ fontWeight: 'bold', color: '#1e293b', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1rem' }}>
                        <CreditCard size={20} color="#4f46e5" />
                        現在のプラン状況
                    </h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0', borderBottom: '1px solid #f8fafc' }}>
                            <span style={{ fontSize: '0.875rem', color: '#64748b' }}>契約プラン</span>
                            <span style={{ fontWeight: 'bold', fontSize: '1.125rem', color: '#4f46e5' }}>{PLANS[currentPlan].name}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0' }}>
                            <span style={{ fontSize: '0.875rem', color: '#64748b' }}>AI添削残り回数</span>
                            <span style={{ fontWeight: 'bold', fontSize: '1.125rem', color: '#1e293b' }}>{getRemainingAiCount()}</span>
                        </div>
                    </div>
                </section>

                {/* Plan Selection */}
                <section>
                    <h2 style={{ fontWeight: 'bold', fontSize: '1.25rem', color: '#1e293b', marginBottom: '1.5rem', textAlign: 'center' }}>
                        プラン変更 (デモ用)
                    </h2>

                    <div style={styles.grid}>
                        {(Object.keys(PLANS) as UserPlan[]).map((planKey) => {
                            const plan = PLANS[planKey];
                            const isSelected = currentPlan === planKey;
                            const buttonStyle = styles.planButton(isSelected, planKey);
                            const headerStyle = styles.cardHeader(planKey, isSelected);

                            const titleColor = isSelected && planKey === 'PREMIUM' ? '#78350f' : isSelected && planKey === 'BASIC' ? '#1e3a8a' : '#1e293b';
                            const priceColor = isSelected && planKey === 'PREMIUM' ? '#b45309' : isSelected && planKey === 'BASIC' ? '#1d4ed8' : '#334155';

                            return (
                                <button
                                    key={plan.id}
                                    onClick={() => handlePlanChange(planKey)}
                                    style={buttonStyle as React.CSSProperties}
                                >
                                    {/* Header Section */}
                                    <div style={headerStyle}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                                            <h3 style={{ fontWeight: 'bold', fontSize: '1.25rem', color: titleColor, margin: 0, lineHeight: 1.2 }}>
                                                {plan.name.split('(')[0]}
                                                <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'normal', opacity: 0.8, marginTop: '0.25rem' }}>
                                                    {planKey === 'BASIC' ? '買い切り' : planKey === 'PREMIUM' ? '月額サブスク' : '無料'}
                                                </span>
                                            </h3>
                                            {isSelected && (
                                                <div style={{
                                                    padding: '0.25rem',
                                                    borderRadius: '9999px',
                                                    backgroundColor: planKey === 'PREMIUM' ? '#f59e0b' : planKey === 'BASIC' ? '#3b82f6' : '#475569',
                                                    color: 'white',
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                                                }}>
                                                    <Check size={16} />
                                                </div>
                                            )}
                                        </div>
                                        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', marginTop: '0.75rem', color: priceColor }}>
                                            {plan.price === 0 ? '¥0' : `¥${plan.price.toLocaleString()}`}
                                            <span style={{ fontSize: '0.875rem', fontWeight: 'normal', opacity: 0.7, marginLeft: '0.25rem' }}>
                                                {planKey === 'PREMIUM' ? '/ 月' : ''}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Features Section */}
                                    <div style={{ padding: '1.5rem', flexGrow: 1 }}>
                                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                            {plan.features.map((feature, i) => (
                                                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', fontSize: '0.875rem' }}>
                                                    <div style={{ marginTop: '0.125rem' }}>
                                                        <Check size={16} color={isSelected ? (planKey === 'PREMIUM' ? '#d97706' : planKey === 'BASIC' ? '#2563eb' : '#475569') : '#cbd5e1'} />
                                                    </div>
                                                    <span style={{ fontWeight: isSelected ? 500 : 400, color: isSelected ? '#334155' : '#64748b' }}>
                                                        {feature}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Select Label (Visual only for unselected) */}
                                    {!isSelected && (
                                        <div style={{ padding: '1rem', paddingTop: 0, textAlign: 'center' }}>
                                            <span style={{ fontSize: '0.875rem', fontWeight: 'bold', color: '#4f46e5' }}>このプランを選択</span>
                                        </div>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </section>

                {/* Notification */}
                {saveMessage && (
                    <div style={{
                        position: 'fixed',
                        bottom: '2.5rem',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        backgroundColor: '#1e293b',
                        color: 'white',
                        fontSize: '0.875rem',
                        padding: '0.75rem 1.5rem',
                        borderRadius: '9999px',
                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        zIndex: 50,
                        animation: 'fadeIn 0.3s ease-out'
                    }}>
                        <Check size={16} color="#4ade80" />
                        {saveMessage}
                    </div>
                )}

            </main>
        </div>
    );
};

export default Settings;
