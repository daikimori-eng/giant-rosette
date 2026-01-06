
import { PLANS } from '../config/constants';

const SUBSCRIPTION_KEY = 'construction_accountant_subscription';
const AI_USAGE_KEY = 'construction_accountant_ai_usage';

export type UserPlan = 'FREE' | 'BASIC' | 'PREMIUM';

export const getSubscription = (): UserPlan => {
    return (localStorage.getItem(SUBSCRIPTION_KEY) as UserPlan) || 'FREE';
};

export const setSubscription = (plan: UserPlan) => {
    localStorage.setItem(SUBSCRIPTION_KEY, plan);
};

export const getAiUsageCount = (): number => {
    return parseInt(localStorage.getItem(AI_USAGE_KEY) || '0', 10);
};

export const incrementAiUsage = () => {
    const current = getAiUsageCount();
    localStorage.setItem(AI_USAGE_KEY, (current + 1).toString());
};

export const canUseAi = (): { allowed: boolean; reason?: 'limit_reached' | 'plan_not_supported' } => {
    const plan = getSubscription();
    const usage = getAiUsageCount();
    const planConfig = PLANS[plan];

    if (!planConfig.hasAi) {
        return { allowed: false, reason: 'plan_not_supported' };
    }

    if (usage >= planConfig.aiLimit) {
        return { allowed: false, reason: 'limit_reached' };
    }

    return { allowed: true };
};

export const getRemainingAiCount = (): number | string => {
    const plan = getSubscription();
    const usage = getAiUsageCount();
    const limit = PLANS[plan].aiLimit;

    if (limit === Infinity) return '無制限';
    return Math.max(0, limit - usage);
};
