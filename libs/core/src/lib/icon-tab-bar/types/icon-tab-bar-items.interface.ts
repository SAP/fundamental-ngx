import { SemanticColor } from './index';

export interface TabConfig {
    icon?: string;
    label?: string;
    color?: SemanticColor;
    counter?: number;
    active?: boolean;
    collapsed?: boolean;
    badge?: boolean;
    subItems?: TabConfig[];
}

export interface IconTabBarItem extends TabConfig {
    index: number;
    uId: string;
    cssClasses: string[];
    hidden?: boolean;
    subItems?: IconTabBarItem[];
}
