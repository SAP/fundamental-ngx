export type LabelLayout = 'horizontal' | 'vertical';

export type HintPlacement = 'left' | 'right';

export type FormZone = 'zTop' | 'zBottom' | 'zLeft' | 'zRight';

export type Column = 1 | 2 | 3 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export type Status = 'success' | 'error' | 'warning' | 'default' | 'information';

export interface ColumnLayout {
    XL?: number;
    L?: number;
    M?: number;
    S?: number;
}
