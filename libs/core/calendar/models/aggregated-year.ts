export interface AggregatedYear {
    startYear: number;
    endYear: number;
}

export interface CalendarAggregatedYear {
    years: AggregatedYear;
    label: string;
    id?: string;
    current?: boolean;
    selected?: boolean;
    tabIndex?: number;
    ariaLabel?: string;
    index: number;
}
