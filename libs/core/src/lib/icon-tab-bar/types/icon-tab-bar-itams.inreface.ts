export interface IconTabBarItem {
    id: string|number;
    icon?: string;
    label: string;
    color?: string;
    counter?: number;
    active?: boolean;
    collapsed?: boolean;
    badge?: boolean;
    subItems?: IconTabBarItem[];
}
