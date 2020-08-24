import { OverflowPriority } from '../../toolbar/toolbar.component';

export const OVERFLOW_PRIORITY_SCORE: Map<OverflowPriority, number> = new Map([
    ['always', 0],
    ['disappear', 1],
    ['low', 2],
    ['high', 3],
    ['never', 4],
]);
