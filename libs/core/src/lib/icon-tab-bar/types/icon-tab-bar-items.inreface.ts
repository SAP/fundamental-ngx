import { SemanticColor } from './index';

export interface IconTabBarItem {
    id: string|number;
    icon?: string;
    label?: string;
    color?: SemanticColor;
    counter?: string|number;
    active?: boolean;
    collapsed?: boolean;
    badge?: boolean;
    subItems?: IconTabBarItem[];
    cssClasses?: string[];
    subItemsLevel?: number;
    hidden?: boolean;
}
