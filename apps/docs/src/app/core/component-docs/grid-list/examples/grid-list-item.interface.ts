export interface GridListItem {
    id: number;
    title: string;
    description: string;
    type?: string,
    counter?: number;
    selected?: boolean;
    layoutItemPattern?: string;
}
