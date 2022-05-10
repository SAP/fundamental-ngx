import { NullableObject } from '@fundamental-ngx/core/shared';
import { SemanticColor } from '../types';

/** This is config that user should provide to input */
export type TabConfig = NullableObject<{
    icon: string;
    label: string;
    color: SemanticColor;
    counter: number;
    /** whether the tab is selected */
    active: boolean;
    /** if set to true, will show red circle in top-right corner of tab */
    badge: boolean;
    /** config for nested tabs */
    subItems: TabConfig[];
}>;
