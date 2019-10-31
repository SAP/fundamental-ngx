
export interface NestedListItem {
    list?: NestedListModel;
    link?: NestedListLink;
    expanded?: boolean;
}


export interface NestedListModel {
    textOnly?: boolean;
    items: NestedListItem[];
    headerTitle?: string
}

export interface NestedListLink {
    icon?: string;
    title: string;
    href?: string;
    selected?: boolean;
}
