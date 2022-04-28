import { FormStates } from '@fundamental-ngx/core/shared';

export type LabelLayout = 'horizontal' | 'vertical';

export type HintPlacement = 'left' | 'right';

export type FormZone = 'zTop' | 'zBottom' | 'zLeft' | 'zRight';

export type Column = 1 | 2 | 3 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

/** @deprecated use `import { FormStates } from "@fundamental-ngx/core/shared"` instead */
export type ControlState = FormStates;

export interface ColumnLayout {
    XL?: number;
    L?: number;
    M?: number;
    S?: number;
}

export enum ColumnLayoutGridClass {
    XL = 'xl',
    L = 'lg',
    M = 'md',
    S = 'sm'
}
