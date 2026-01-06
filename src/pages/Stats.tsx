import React from 'react';
import { Trophy, TrendingUp, Calendar } from 'lucide-react';

const Stats = () => {
    return (
        <div style={{ animation: 'fadeIn 0.3s' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>成績・進捗</h2>

            {/* Rank Card */}
            <div className="card" style={{ background: 'linear-gradient(135deg, hsl(35, 90%, 50%) 0%, hsl(35, 90%, 40%) 100%)', color: 'white', textAlign: 'center', padding: '2rem' }}>
                <Trophy size={48} style={{ marginBottom: '1rem', opacity: 0.9 }} />
                <h3 style={{ margin: 0, fontSize: '1rem', opacity: 0.9 }}>現在のランク</h3>
                <p style={{ margin: '0.5rem 0', fontSize: '2rem', fontWeight: 'bold' }}>見習い Lv.1</p>
                <p style={{ fontSize: '0.875rem', opacity: 0.8 }}>次のランク「職長」まで 350 XP</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                <div className="card" style={{ textAlign: 'center', padding: '1.5rem 1rem' }}>
                    <TrendingUp size={24} color="hsl(var(--primary))" style={{ marginBottom: '0.5rem' }} />
                    <h4 style={{ margin: 0, fontSize: '0.875rem', color: 'hsl(var(--muted-foreground))' }}>学習日数</h4>
                    <p style={{ margin: '0.5rem 0 0', fontSize: '1.5rem', fontWeight: 600 }}>3日</p>
                </div>
                <div className="card" style={{ textAlign: 'center', padding: '1.5rem 1rem' }}>
                    <Calendar size={24} color="hsl(var(--secondary))" style={{ marginBottom: '0.5rem' }} />
                    <h4 style={{ margin: 0, fontSize: '0.875rem', color: 'hsl(var(--muted-foreground))' }}>連続記録</h4>
                    <p style={{ margin: '0.5rem 0 0', fontSize: '1.5rem', fontWeight: 600 }}>1日</p>
                </div>
            </div>

            <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>科目別習熟度</h3>
            <div className="card">
                <div style={{ marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                        <span>原価計算</span>
                        <span style={{ fontWeight: 600 }}>15%</span>
                    </div>
                    <div style={{ width: '100%', height: '8px', backgroundColor: 'hsl(var(--input))', borderRadius: '4px' }}>
                        <div style={{ width: '15%', height: '100%', backgroundColor: 'hsl(215 100% 30%)', borderRadius: '4px' }}></div>
                    </div>
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                        <span>財務分析</span>
                        <span style={{ fontWeight: 600 }}>0%</span>
                    </div>
                    <div style={{ width: '100%', height: '8px', backgroundColor: 'hsl(var(--input))', borderRadius: '4px' }}>
                        <div style={{ width: '0%', height: '100%', backgroundColor: 'hsl(150 80% 40%)', borderRadius: '4px' }}></div>
                    </div>
                </div>
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                        <span>財務諸表</span>
                        <span style={{ fontWeight: 600 }}>5%</span>
                    </div>
                    <div style={{ width: '100%', height: '8px', backgroundColor: 'hsl(var(--input))', borderRadius: '4px' }}>
                        <div style={{ width: '5%', height: '100%', backgroundColor: 'hsl(35 90% 50%)', borderRadius: '4px' }}></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Stats;
