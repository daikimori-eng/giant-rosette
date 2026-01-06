export interface ReviewItem {
    id: string; // Question ID
    interval: number; // Current interval in days
    repetition: number; // Number of successful repetitions
    ef: number; // Ease Factor (start 2.5)
    nextReviewDate: string; // ISO Date string
}

/**
 * Calculates the next review parameters using the SM-2 Algorithm.
 * 
 * @param currentItem - The current state of the item (optional for new items)
 * @param quality - User rating: 0-5
 *   5: Perfect response
 *   4: Correct response after a hesitation
 *   3: Correct response recalled with serious difficulty
 *   2: Incorrect response; where the correct one seemed easy to recall
 *   1: Incorrect response; the correct one remembered
 *   0: Complete blackout.
 */
export function calculateNextReview(quality: number, currentItem?: ReviewItem): ReviewItem {
    let interval: number;
    let repetition: number;
    let ef: number;

    if (!currentItem) {
        // New Item
        repetition = 1;
        ef = 2.5;
        interval = 1;
    } else {
        repetition = currentItem.repetition;
        ef = currentItem.ef;
        interval = currentItem.interval;

        if (quality >= 3) {
            if (repetition === 0) {
                interval = 1;
            } else if (repetition === 1) {
                interval = 6;
            } else {
                interval = Math.round(interval * ef);
            }
            repetition += 1;
        } else {
            repetition = 0;
            interval = 1;
        }

        // Update Ease Factor (EF)
        // EF' = EF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
        ef = ef + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
        if (ef < 1.3) ef = 1.3;
    }

    // Calculate Next Date
    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + interval);

    return {
        id: currentItem ? currentItem.id : '', // ID needs to be injected by caller if new
        interval,
        repetition,
        ef,
        nextReviewDate: nextDate.toISOString()
    };
}
