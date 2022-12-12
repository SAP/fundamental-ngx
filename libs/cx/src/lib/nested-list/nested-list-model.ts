export interface NestedListItem {
    headerTitle?: string;
    list?: NestedListModel;
    link?: NestedListLink;
    expanded?: boolean;
}

export interface NestedListModel {
    textOnly?: boolean;
    items: NestedListItem[];
}

export interface NestedListLink {
    icon?: string;
    title: string;
    callback?: () => void;
    href?: string;
    routerLink?: string;
    selected?: boolean;
}
