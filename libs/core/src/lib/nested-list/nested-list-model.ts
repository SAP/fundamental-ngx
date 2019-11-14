
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
    callback?: Function;
    href?: string;
    selected?: boolean;
}
