export type OverflowPriority = 'always' | 'never' | 'low' | 'high' | 'disappear' | 
    1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 
    '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10';

export const OVERFLOW_PRIORITY_SCORE: Map<OverflowPriority, number> = new Map([
    ['always', -1],
    ['disappear', 0],
    ['1', 1],
    ['2', 2],
    ['3', 3],
    ['4', 4],
    ['5', 5],
    ['6', 6],
    ['7', 7],
    ['8', 8],
    ['9', 9],
    ['10', 10],
    ['low', 1],
    ['high', 10],
    ['never', 11]
]);
