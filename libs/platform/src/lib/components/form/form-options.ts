export type LabelLayout = 'horizontal' | 'vertical';

export type HintPlacement = 'left' | 'right';

export type FormZone = 'zTop' | 'zBottom' | 'zLeft' | 'zRight';

export type Column = 1 | 2 | 3 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export type Status = 'success' | 'error' | 'warning' | 'default' | 'information';

export interface ColumnLayout {
    XL: number;
    L: number;
    M: number;
    S: number;
}

export interface InlineLayout {
    XL: boolean;
    L: boolean;
    M: boolean;
    S: boolean;
}

export enum RESPONSIVE_BREAKPOINTS {
    S = 600,
    M = 1024,
    L = 1440
}
