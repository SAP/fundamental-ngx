// This is config that user should provide to input
import { SemanticColor } from '../types';

export interface TabConfig {
    icon?: string;
    label?: string;
    color?: SemanticColor;
    counter?: number;
    active?: boolean; // selected tab
    badge?: boolean; // should show red circle in top-right corner of tab
    subItems?: TabConfig[]; // Nested tabs
}
