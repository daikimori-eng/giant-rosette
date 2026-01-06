import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calculator, BarChart3, FileText, ChevronRight, Clock, Book } from 'lucide-react';
import { questions } from '../data/questions';
import { ReviewItem } from '../utils/sm2';

const subjects = [
    {
        id: 'cost-accounting',
        title: '原価計算',
        description: '工事原価の計算、差異分析など',
        icon: <Calculator size={32} />,
        color: 'hsl(215 100% 95%)', // Light Blue
        textColor: 'hsl(215 100% 30%)'
    },
    {
        id: 'financial-analysis',
        title: '財務分析',
        description: '経営事項審査、比率分析など',
        icon: <BarChart3 size={32} />,
        color: 'hsl(150 60% 95%)', // Light Green
        textColor: 'hsl(150 80% 20%)'
    },
    {
        id: 'financial-statements',
        title: '財務諸表',
        description: '会計基準、建設業特有の会計処理',
        icon: <FileText size={32} />,
        color: 'hsl(35 90% 95%)', // Light Orange
        textColor: 'hsl(35 90% 30%)'
    }
];

const Home = () => {
    const [reviewCounts, setReviewCounts] = useState<Record<string, number>>({});
    const [totalCounts, setTotalCounts] = useState<Record<string, number>>({});
    const [userRank, setUserRank] = useState({ level: 1, xp: 0 });

    useEffect(() => {
        // Calculate XP (Mock)
        const xp = parseInt(localStorage.getItem('userXP') || '0', 10);
        // Level up every 500 XP
        const level = Math.floor(xp / 500) + 1;
        setUserRank({ level, xp });

        // Calculate Due Reviews
        const reviews: Record<string, ReviewItem> = JSON.parse(localStorage.getItem('reviews') || '{}');
        const now = new Date();
        const counts: Record<string, number> = {};
        const subjectTotals: Record<string, number> = {};

        subjects.forEach(s => {
            const subjectQuestions = questions.filter(q => q.subjectId === s.id);
            subjectTotals[s.id] = subjectQuestions.length;
            let dueCount = 0;

            subjectQuestions.forEach(q => {
                const review = reviews[q.id];
                // If never reviewed, it's "new" (could aid 'due' if we want to force start)
                // Here we count only those scheduled for review
                if (review) {
                    const nextDate = new Date(review.nextReviewDate);
                    if (nextDate <= now) {
                        dueCount++;
                    }
                }
            });
            counts[s.id] = dueCount;
        });

        setReviewCounts(counts);
        setTotalCounts(subjectTotals);

    }, []);

    const nextLevelXP = userRank.level * 500;
    const progressPercent = ((userRank.xp % 500) / 500) * 100;

    return (
        <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
            <div className="card" style={{ background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(220, 80%, 40%) 100%)', color: 'white' }}>
                <h2 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>
                    現在ランク: {userRank.level === 1 ? '見習い' : userRank.level === 2 ? '作業長' : userRank.level === 3 ? '職長' : '所長'}
                </h2>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end' }}>
                    <div>
                        <p style={{ opacity: 0.9, fontSize: '0.875rem' }}>次のランクまであと {nextLevelXP - userRank.xp} XP</p>
                        <div style={{ width: '200px', height: '8px', background: 'rgba(255,255,255,0.3)', borderRadius: '99px', marginTop: '0.5rem', overflow: 'hidden' }}>
                            <div style={{ width: `${progressPercent}%`, height: '100%', background: 'hsl(var(--secondary))', transition: 'width 0.5s ease' }}></div>
                        </div>
                    </div>
                    <span style={{ fontSize: '2rem', fontWeight: 'bold' }}>Lv.{userRank.level}</span>
                </div>
            </div>

            <h3 style={{ margin: '1.5rem 0 1rem', fontSize: '1.1rem', color: 'hsl(var(--muted-foreground))' }}>科目を選択して学習を開始</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {subjects.map((subject) => {
                    const dueCount = reviewCounts[subject.id] || 0;
                    return (
                        <Link to={`/subject/${subject.id}`} key={subject.id} style={{ textDecoration: 'none' }}>
                            <div className="card" style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                                transition: 'transform 0.2s',
                                cursor: 'pointer',
                                marginBottom: 0,
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                            >
                                <div style={{
                                    padding: '1rem',
                                    borderRadius: '1rem',
                                    backgroundColor: subject.color,
                                    color: subject.textColor,
                                    position: 'relative'
                                }}>
                                    {subject.icon}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600 }}>{subject.title}</h4>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.25rem',
                                                color: 'hsl(var(--muted-foreground))',
                                                fontSize: '0.75rem',
                                            }}>
                                                <Book size={12} />
                                                全{totalCounts[subject.id] || 0}問
                                            </div>
                                            {dueCount > 0 && (
                                                <div style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '0.25rem',
                                                    backgroundColor: 'hsl(0 84% 60%)',
                                                    color: 'white',
                                                    padding: '0.2rem 0.6rem',
                                                    borderRadius: '99px',
                                                    fontSize: '0.75rem',
                                                    fontWeight: 'bold'
                                                }}>
                                                    <Clock size={12} />
                                                    復習: {dueCount}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <p style={{ margin: '0.25rem 0 0', fontSize: '0.875rem', color: 'hsl(var(--muted-foreground))' }}>{subject.description}</p>
                                </div>
                                <ChevronRight color="hsl(var(--muted-foreground))" />
                            </div>
                        </Link>
                    )
                })}
            </div>
        </div>
    );
};

export default Home;
