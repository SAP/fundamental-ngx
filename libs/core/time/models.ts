export class SelectableViewItem<T> {
    /** Value of the item */
    value: T;
    /** Label of the item */
    label: string;
    /** Index of the item */
    index?: number;
}

export const enum Meridian {
    AM = 'AM',
    PM = 'PM'
}
