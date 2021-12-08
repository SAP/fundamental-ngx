// This is config that user should provide to input
import { SemanticColor } from '../types';

export interface TabConfig {
    icon?: string;
    label?: string;
    color?: SemanticColor;
    counter?: number;
    /** whether the tab is selected */
    active?: boolean;
    /** if set to true, will show red circle in top-right corner of tab */
    badge?: boolean;
    /** config for nested tabs */
    subItems?: TabConfig[];
}
