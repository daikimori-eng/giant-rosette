import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { questions } from '../data/questions';
import { calculateNextReview, ReviewItem } from '../utils/sm2';
import { gradeEssayWithGemini } from '../utils/gemini';
import { canUseAi, incrementAiUsage, getRemainingAiCount } from '../utils/subscription';
import { ChevronRight, CheckCircle, XCircle, Award, BrainCircuit, Star, Bot } from 'lucide-react';
import { Link } from 'react-router-dom';

const Quiz = () => {
    const { subjectId, mode } = useParams();
    const navigate = useNavigate();

    const [currentIndex, setCurrentIndex] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [sessionXP, setSessionXP] = useState(0);

    // Initial load of reviews
    const [reviews, setReviews] = useState<Record<string, ReviewItem>>({});

    // Vocabulary State
    const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

    // Essay State
    const [showModelAnswer, setShowModelAnswer] = useState(false);
    const [userEssay, setUserEssay] = useState('');
    const [aiFeedback, setAiFeedback] = useState<{ score: number, advice: string } | null>(null);
    const [isGrading, setIsGrading] = useState(false);
    const [aiError, setAiError] = useState<string | null>(null);

    useEffect(() => {
        const storedReviews = localStorage.getItem('reviews');
        if (storedReviews) {
            setReviews(JSON.parse(storedReviews));
        }
    }, []);

    // Filter questions logic
    const quizQuestions = useMemo(() => {
        const raw = questions.filter(q => q.subjectId === subjectId && q.type === mode);
        const storedReviews: Record<string, ReviewItem> = JSON.parse(localStorage.getItem('reviews') || '{}');
        const now = new Date();

        return raw.sort((a, b) => {
            const revA = storedReviews[a.id];
            const revB = storedReviews[b.id];

            const aIsDue = revA && new Date(revA.nextReviewDate) <= now;
            const bIsDue = revB && new Date(revB.nextReviewDate) <= now;

            if (aIsDue && !bIsDue) return -1;
            if (!aIsDue && bIsDue) return 1;

            if (!revA && revB) return -1;
            if (revA && !revB) return 1;

            return 0;
        });
    }, [subjectId, mode]);

    const currentQuestion = quizQuestions[currentIndex];

    const saveReview = (quality: number) => {
        const existingReview = reviews[currentQuestion.id];
        const newReview = calculateNextReview(quality, existingReview);
        newReview.id = currentQuestion.id;

        const updatedReviews = { ...reviews, [currentQuestion.id]: newReview };
        setReviews(updatedReviews);
        localStorage.setItem('reviews', JSON.stringify(updatedReviews));

        let gainedXP = 0;
        if (quality >= 3) gainedXP = 10 + (quality * 2);
        else gainedXP = 5;

        setSessionXP(curr => curr + gainedXP);
        const currentTotalXP = parseInt(localStorage.getItem('userXP') || '0', 10);
        localStorage.setItem('userXP', (currentTotalXP + gainedXP).toString());
    };

    if (!currentQuestion) {
        return (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
                <h2>問題が見つかりません</h2>
                <p>この科目の問題は準備中か、すべて完了しました。</p>
                <button className="btn btn-primary" onClick={() => navigate(-1)}>戻る</button>
            </div>
        );
    }

    // --- Vocabulary Logic ---
    const handleChoiceSelect = (choice: string) => {
        if (selectedChoice) return;
        setSelectedChoice(choice);
        const correct = choice === currentQuestion.answer;
        setIsCorrect(correct);
        const quality = correct ? 5 : 1;
        saveReview(quality);
    };

    const handleNextVocab = () => {
        setSelectedChoice(null);
        setIsCorrect(null);
        if (currentIndex < Math.min(quizQuestions.length - 1, 9)) {
            setCurrentIndex(i => i + 1);
        } else {
            setShowResult(true);
        }
    };

    // --- Essay Logic ---
    const handleCheckEssay = async () => {
        if (userEssay.length < 5) return;

        setIsGrading(true);
        setAiError(null);
        setAiFeedback(null);

        // 1. Check Subscription
        const check = canUseAi();
        if (!check.allowed) {
            setIsGrading(false);
            if (check.reason === 'plan_not_supported') {
                setAiError("現在のご契約プランではAI添削機能をご利用いただけません。設定画面からプラン変更をご検討ください。");
            } else {
                setAiError("無料お試し回数（5回）の上限に達しました。続けて利用するには、設定画面からプレミアムプランへアップグレードしてください。");
            }
            setShowModelAnswer(true);
            return;
        }

        try {
            // 2. Call AI
            const result = await gradeEssayWithGemini(
                currentQuestion.question,
                userEssay,
                currentQuestion.answer
            );

            // 3. Success & Increment
            setAiFeedback(result);
            incrementAiUsage();

        } catch (error) {
            console.error(error);
            setAiError("AI採点中にエラーが発生しました。");
        } finally {
            setIsGrading(false);
            setShowModelAnswer(true);
        }
    };

    const handleEssayRating = (ratingScore: number) => {
        // ratingScore: 1 (bad) to 5 (perfect)
        saveReview(ratingScore);
        setShowModelAnswer(false);
        setUserEssay('');
        setAiFeedback(null);

        if (currentIndex < Math.min(quizQuestions.length - 1, 4)) {
            setCurrentIndex(i => i + 1);
        } else {
            setShowResult(true);
        }
    };

    // --- Result View ---
    if (showResult) {
        return (
            <div style={{ animation: 'fadeIn 0.5s', textAlign: 'center', padding: '2rem 1rem' }}>
                <div style={{ marginBottom: '2rem' }}>
                    <Award size={64} color="hsl(var(--secondary))" style={{ display: 'block', margin: '0 auto 1rem' }} />
                    <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>セッション完了！</h2>
                    <p style={{ color: 'hsl(var(--muted-foreground))' }}>記憶への定着が進みました。</p>
                </div>

                <div className="card" style={{ marginBottom: '2rem' }}>
                    <h3 style={{ fontSize: '1rem', color: 'hsl(var(--muted-foreground))', textTransform: 'uppercase' }}>獲得経験値</h3>
                    <p style={{ fontSize: '3rem', fontWeight: 'bold', color: 'hsl(var(--primary))', margin: '0.5rem 0' }}>+{sessionXP} <span style={{ fontSize: '1rem' }}>XP</span></p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <button className="btn btn-primary" onClick={() => navigate('/')}>
                        ホームに戻る
                    </button>
                    <button className="btn" style={{ border: '1px solid hsl(var(--border))' }} onClick={() => {
                        window.location.reload();
                    }}>
                        次のセットを学習
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div style={{ animation: 'fadeIn 0.3s' }}>
            {/* Progress Bar */}
            <div style={{
                width: '100%',
                height: '4px',
                backgroundColor: 'hsl(var(--border))',
                marginBottom: '1.5rem',
                borderRadius: '2px',
                overflow: 'hidden'
            }}>
                <div style={{
                    width: `${((currentIndex + 1) / Math.min(quizQuestions.length, (mode === 'vocabulary' ? 10 : 5))) * 100}%`,
                    height: '100%',
                    backgroundColor: 'hsl(var(--primary))',
                    transition: 'width 0.3s ease'
                }} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: 'hsl(var(--muted-foreground))', fontSize: '0.875rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <BrainCircuit size={14} />
                    {currentIndex + 1}問目
                </span>
                <div style={{ display: 'flex', gap: '0.25rem' }}>
                    {[...Array(currentQuestion.importance)].map((_, i) => (
                        <Star key={i} size={14} fill="hsl(var(--secondary))" color="hsl(var(--secondary))" />
                    ))}
                </div>
            </div>

            {/* Question Card */}
            <div className="card" style={{ padding: '2rem', minHeight: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <h3 style={{ fontSize: '1.25rem', textAlign: 'center', lineHeight: 1.6 }}>
                    {currentQuestion.question}
                </h3>
            </div>

            {/* Mode Specific Logic */}
            {mode === 'vocabulary' ? (
                <div style={{ display: 'grid', gap: '0.75rem' }}>
                    {currentQuestion.choices?.map((choice) => {
                        let style = {};
                        if (selectedChoice) {
                            if (choice === currentQuestion.answer) style = { backgroundColor: 'hsl(142, 76%, 90%)', borderColor: 'hsl(142, 70%, 40%)', color: 'hsl(142, 70%, 20%)' };
                            else if (choice === selectedChoice) style = { backgroundColor: 'hsl(0, 84%, 90%)', borderColor: 'hsl(0, 84%, 60%)', color: 'hsl(0, 84%, 40%)' };
                            else style = { opacity: 0.5 };
                        }

                        return (
                            <button
                                key={choice}
                                className="btn"
                                onClick={() => handleChoiceSelect(choice)}
                                disabled={!!selectedChoice}
                                style={{
                                    width: '100%',
                                    justifyContent: 'space-between',
                                    border: '1px solid hsl(var(--border))',
                                    backgroundColor: 'white',
                                    padding: '1rem',
                                    ...style
                                }}
                            >
                                {choice}
                                {selectedChoice && choice === currentQuestion.answer && <CheckCircle size={20} />}
                                {selectedChoice && choice === selectedChoice && choice !== currentQuestion.answer && <XCircle size={20} />}
                            </button>
                        );
                    })}

                    {selectedChoice && (
                        <div style={{ marginTop: '1rem', animation: 'fadeIn 0.3s' }}>
                            <div style={{ padding: '1rem', backgroundColor: 'hsl(var(--background))', borderRadius: '0.5rem', marginBottom: '1rem' }}>
                                <span style={{ fontWeight: 'bold' }}>正解: {currentQuestion.answer}</span>
                            </div>
                            <button className="btn btn-primary" style={{ width: '100%' }} onClick={handleNextVocab}>
                                次へ <ChevronRight size={20} />
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                // Essay Mode
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {!showModelAnswer ? (
                        <>
                            <textarea
                                className="input"
                                rows={5}
                                placeholder="ここに解答の下書きを入力してください"
                                value={userEssay}
                                onChange={(e) => setUserEssay(e.target.value)}
                                style={{ resize: 'none' }}
                                disabled={isGrading}
                            />
                            <button className="btn btn-primary" onClick={handleCheckEssay} disabled={isGrading}>
                                {isGrading ? 'AI採点中...' : '解答を確認する'}
                            </button>
                            <p style={{ fontSize: '0.8rem', color: 'hsl(var(--muted-foreground))', textAlign: 'center' }}>
                                ※ 5文字以上入力すると採点が開始されます
                            </p>
                        </>
                    ) : (
                        <div style={{ animation: 'fadeIn 0.3s' }}>
                            {/* AI Feedback Section */}
                            {/* AI Feedback Section */}
                            {aiError ? (
                                <div className="card" style={{ border: '1px solid #fee2e2', backgroundColor: '#fef2f2', marginBottom: '1.5rem' }}>
                                    <div style={{ color: '#991b1b', fontWeight: 'bold', marginBottom: '0.5rem' }}>⚠️ AI添削エラー</div>
                                    <p style={{ margin: 0, fontSize: '0.9rem', color: '#7f1d1d' }}>{aiError}</p>
                                    <Link to="/settings" style={{ display: 'block', marginTop: '0.5rem', color: 'hsl(var(--primary))', fontWeight: 'bold', fontSize: '0.9rem' }}>
                                        設定画面へ →
                                    </Link>
                                </div>
                            ) : aiFeedback ? (
                                <div className="card" style={{ border: '2px solid hsl(var(--secondary))', backgroundColor: 'hsl(40 50% 98%)', marginBottom: '1.5rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem', color: 'hsl(var(--secondary))' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <Bot size={20} />
                                            <h4 style={{ margin: 0 }}>AI採点結果: {aiFeedback.score}/10 点</h4>
                                        </div>
                                    </div>
                                    <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: 1.6 }}>{aiFeedback.advice}</p>
                                    <div style={{ textAlign: 'right', fontSize: '0.8rem', color: 'hsl(var(--muted-foreground))', marginTop: '0.5rem' }}>
                                        無料枠残り: {getRemainingAiCount()}
                                    </div>
                                </div>
                            ) : null}

                            <div style={{ marginBottom: '1.5rem' }}>
                                <h4 style={{ fontSize: '0.9rem', color: 'hsl(var(--muted-foreground))', marginBottom: '0.5rem' }}>必須キーワード</h4>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                                    {currentQuestion.keywords?.map(k => (
                                        <span key={k} style={{
                                            backgroundColor: 'hsl(var(--secondary) / 0.1)',
                                            color: 'hsl(var(--secondary))',
                                            padding: '0.25rem 0.75rem',
                                            borderRadius: '99px',
                                            fontSize: '0.875rem',
                                            fontWeight: 500
                                        }}>
                                            {k}
                                        </span>
                                    ))}
                                </div>

                                <h4 style={{ fontSize: '0.9rem', color: 'hsl(var(--muted-foreground))', marginBottom: '0.5rem' }}>模範解答</h4>
                                <div style={{ padding: '1rem', backgroundColor: 'hsl(var(--background))', borderRadius: '0.5rem', lineHeight: 1.6 }}>
                                    {currentQuestion.answer}
                                </div>
                            </div>

                            <p style={{ textAlign: 'center', fontSize: '0.9rem', marginBottom: '0.5rem' }}>自己評価を記録して次に進む</p>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem' }}>
                                <button className="btn" style={{ flexDirection: 'column', gap: '0.25rem', fontSize: '0.8rem', padding: '0.5rem', backgroundColor: '#fee2e2', color: '#991b1b' }} onClick={() => handleEssayRating(1)}>
                                    難しい<br /><span style={{ fontSize: '0.7em' }}>(1日後)</span>
                                </button>
                                <button className="btn" style={{ flexDirection: 'column', gap: '0.25rem', fontSize: '0.8rem', padding: '0.5rem', backgroundColor: '#fef3c7', color: '#92400e' }} onClick={() => handleEssayRating(3)}>
                                    普通<br /><span style={{ fontSize: '0.7em' }}>(約3日後)</span>
                                </button>
                                <button className="btn" style={{ flexDirection: 'column', gap: '0.25rem', fontSize: '0.8rem', padding: '0.5rem', backgroundColor: '#dcfce7', color: '#166534' }} onClick={() => handleEssayRating(5)}>
                                    完璧<br /><span style={{ fontSize: '0.7em' }}>(約7日後)</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Quiz;
