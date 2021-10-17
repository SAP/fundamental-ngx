export const ONE_COLUMN_START_FULL_SCREEN = 'OneColumnStartFullScreen';
export const ONE_COLUMN_MID_FULL_SCREEN = 'OneColumnMidFullScreen';
export const ONE_COLUMN_END_FULL_SCREEN = 'OneColumnEndFullScreen';
export const TWO_COLUMNS_START_EXPANDED = 'TwoColumnsStartExpanded';
export const TWO_COLUMNS_MID_EXPANDED = 'TwoColumnsMidExpanded';
export const TWO_COLUMNS_END_EXPANDED = 'TwoColumnsEndExpanded';
export const THREE_COLUMNS_MID_EXPANDED = 'ThreeColumnsMidExpanded';
export const THREE_COLUMNS_END_EXPANDED = 'ThreeColumnsEndExpanded';
export const THREE_COLUMNS_START_MINIMIZED = 'ThreeColumnsStartMinimized';
export const THREE_COLUMNS_END_MINIMIZED = 'ThreeColumnsEndMinimized';

export const SM_SCREEN_SIZE = 'sm';
export const MD_SCREEN_SIZE = 'md';
export const LG_SCREEN_SIZE = 'lg';

export type ScreenSize = 'sm' | 'md' | 'lg';

export type FlexibleColumnLayout =
    | 'OneColumnStartFullScreen'
    | 'OneColumnMidFullScreen'
    | 'OneColumnEndFullScreen'
    | 'TwoColumnsStartExpanded'
    | 'TwoColumnsMidExpanded'
    | 'TwoColumnsEndExpanded'
    | 'ThreeColumnsMidExpanded'
    | 'ThreeColumnsEndExpanded'
    | 'ThreeColumnsStartMinimized'
    | 'ThreeColumnsEndMinimized';

export type ColumnSeparatorValue = 'right' | 'left' | null;

export interface FlexibleColumnSettings {
    start: number;
    mid: number;
    end: number;
}
