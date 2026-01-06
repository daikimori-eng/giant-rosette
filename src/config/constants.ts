
export const GOOGLE_GEMINI_API_KEY = "AIzaSyCDHcKAnVQB1JidVPPZ0yFsjp4CmYsrbPQ";

export const PLANS = {
    FREE: {
        id: 'free',
        name: 'フリープラン',
        price: 0,
        features: ['全問題へのアクセス', 'AI添削: お試し5回まで'],
        aiLimit: 5,
        hasAi: true
    },
    BASIC: {
        id: 'basic',
        name: 'ベーシックプラン (買い切り)',
        price: 1200,
        features: ['全問題へのアクセス', '広告非表示', 'AI添削: なし'],
        aiLimit: 0,
        hasAi: false
    },
    PREMIUM: {
        id: 'premium',
        name: 'プレミアムプラン (月額)',
        price: 500,
        features: ['全問題へのアクセス', '広告非表示', 'AI添削: 無制限'],
        aiLimit: Infinity,
        hasAi: true
    }
} as const;

export type PlanId = keyof typeof PLANS;
