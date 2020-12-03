export interface CalendarMonth {
    month: number; // 1 - 12
    label: string; // month name
    id?: string;
    current?: boolean;
    selected?: boolean;
    tabIndex?: number;
    ariaLabel?: string;
    index?: number;
}
