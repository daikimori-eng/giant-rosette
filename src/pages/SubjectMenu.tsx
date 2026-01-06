import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Lock, PenTool, BookA, ChevronLeft } from 'lucide-react';
import { canUseAi } from '../utils/subscription';

const SubjectMenu: React.FC = () => {
    const { subjectId } = useParams();

    // Check if user can use AI features (Basic plan disallows it, Free/Premium allows)
    // Wait, the "Lock" was for Premium only?
    // The previous logic locked "Essay" if !isPremium.
    // The new requirement says:
    // Free: 5 trials. Basic: No AI. Premium: Unlimited.
    // So "Essay" mode itself should be accessible for Free users too (up to 5 times).
    // It should only be locked if the plan is 'Basic' (No AI)? 
    // Or maybe accessible but shows error inside?
    // The user said "Basic (Buy-out): No AI Grading". 
    // "Free: 5 trials".
    // So Essay mode is NOT locked for Free.
    // It is ONLY locked (or effectively disabled) for Basic if checks fail?
    // Actually, "Essay Mode" = "AI Grading Mode" basically.
    // But we can let them access it and see the limit inside Quiz.
    // However, the visual indication "Locked" in previous code was useful.
    // Let's check permissions.

    // Actually, the request was:
    // Basic: No AI
    // Free: 5 times
    // Premium: Unlimited

    // If I am Basic, I literally bought the "No AI" version. So maybe I shouldn't even see Essay?
    // Or I should see it locked?
    // But Free users should see it UNLOCKED.

    // Let's use `canUseAi()` logic.
    // `canUseAi()` returns { allowed: false, reason: 'plan_not_supported' } for Basic.
    // So if reason is plan_not_supported, we might want to lock it or show it differently.
    // If reason is limit_reached (Free user who used up 5 times), they can still access but get prompted to upgrade inside?

    const aiCheck = canUseAi();
    const isBasic = aiCheck.reason === 'plan_not_supported';

    // If Basic, show locked (or separate UI).
    // If Free or Premium, show Unlocked.

    // Wait, the previous code showed "Locked" if !isPremium.
    // Now "isPremium" meant "Paid" in the old context.
    // In new context, Free users SHOULD leverage Essay (for trial).
    // So only Basic users (who opted out of AI) might see it locked, OR we just let everyone in and handle it in Quiz.
    // The User said "AI review available 5 times for free".
    // So Free users MUST be able to click "Essay".

    const showEssay = !isBasic;

    // Simple mapping for display title
    const titles: Record<string, string> = {
        'cost-accounting': '原価計算',
        'financial-analysis': '財務分析',
        'financial-statements': '財務諸表'
    };

    const title = titles[subjectId || ''] || '科目';

    return (
        <div style={{ animation: 'fadeIn 0.3s ease-out' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                <Link to="/" style={{ color: 'hsl(var(--muted-foreground))', display: 'flex', alignItems: 'center' }}>
                    <ChevronLeft /> 戻る
                </Link>
                <h2 style={{ margin: 0, fontSize: '1.25rem' }}>{title}対策</h2>
            </div>

            <div style={{ display: 'grid', gap: '1rem' }}>
                {/* Vocabulary Mode (Always Free) */}
                <Link to={`/quiz/${subjectId}/vocabulary`} style={{ textDecoration: 'none' }}>
                    <div className="card" style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: '2rem',
                        textAlign: 'center',
                        cursor: 'pointer',
                        border: '2px solid hsl(var(--primary))',
                        backgroundColor: 'hsl(210 40% 98%)'
                    }}>
                        <BookA size={48} color="hsl(var(--primary))" style={{ marginBottom: '1rem' }} />
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>語句問題</h3>
                        <p style={{ color: 'hsl(var(--muted-foreground))', fontSize: '0.9rem' }}>
                            基本的な用語の意味や定義を答える問題です。
                        </p>
                    </div>
                </Link>

                {/* Essay Mode */}
                {showEssay ? (
                    <Link to={`/quiz/${subjectId}/essay`} style={{ textDecoration: 'none' }}>
                        <div className="card" style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            padding: '2rem',
                            textAlign: 'center',
                            cursor: 'pointer',
                            border: '2px solid hsl(var(--secondary))',
                            backgroundColor: 'hsl(40 50% 98%)'
                        }}>
                            <PenTool size={48} color="hsl(var(--secondary))" style={{ marginBottom: '1rem' }} />
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>論述問題 (AI添削)</h3>
                            <p style={{ color: 'hsl(var(--muted-foreground))', fontSize: '0.9rem' }}>
                                キーワード記述対策・AIによる採点機能付き。<br />
                                <span style={{ fontSize: '0.8em', color: 'hsl(var(--primary))' }}>※無料お試し可</span>
                            </p>
                        </div>
                    </Link>
                ) : (
                    <div className="card" style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: '2rem',
                        textAlign: 'center',
                        cursor: 'not-allowed',
                        opacity: 0.7,
                        position: 'relative'
                    }}>
                        <div style={{
                            position: 'absolute',
                            top: '1rem',
                            right: '1rem',
                            background: 'hsl(var(--muted))',
                            color: 'white',
                            padding: '0.25rem 0.5rem',
                            borderRadius: '4px',
                            fontSize: '0.75rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.25rem'
                        }}>
                            <Lock size={12} /> OFF
                        </div>
                        <PenTool size={48} color="hsl(var(--muted))" style={{ marginBottom: '1rem' }} />
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'hsl(var(--muted))' }}>論述問題</h3>
                        <p style={{ color: 'hsl(var(--muted-foreground))', fontSize: '0.9rem', marginBottom: '1rem' }}>
                            現在のプラン(ベーシック)では利用できません。
                        </p>
                        <Link to="/settings" className="btn btn-secondary" style={{ textDecoration: 'none', fontSize: '0.8rem', padding: '0.5rem 1rem' }}>
                            プラン変更
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};


export default SubjectMenu;
