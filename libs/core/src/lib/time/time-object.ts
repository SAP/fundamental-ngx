export class TimeObject {
    hour: number;
    minute: number;
    second: number;
}

export class SelectableViewItem<T> {
    value: T;
    label: string;
    index?: number;
}
