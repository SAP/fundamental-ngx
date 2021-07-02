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
    uniqueKey: string;
    cssClasses: string[];
    hidden: boolean;
    subItems?: IconTabBarSubItem[];
}

export interface IconTabBarSubItem extends TabConfig {
    index: number;
    uniqueKey: string;
    cssClasses: string[];
}

// export interface TextTabConfig {
//     label: string;
//     color?: SemanticColor;
//     counter?: string|number;
//     active?: boolean;
//     collapsed?: boolean;
//     badge?: boolean;
//     subItems?: IconTabBarItem[];
// }
//
// export interface IconTabConfig {
//     icon?: string;
//     label?: string;
//     color?: SemanticColor;
//     counter?: string|number;
//     active?: boolean;
//     collapsed?: boolean;
//     badge?: boolean;
// }

// export interface SpecificTabConfig {
//     index?: number;
//     cssClasses?: string[];
//     subItemsLevel?: number;
//     hidden?: boolean;
// }
