import { InjectionToken } from '@angular/core';

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

export type FlexibleColumnLayoutDefinition = { [key in FlexibleColumnLayout]: FlexibleColumnSettings };

export interface FlexibleLayoutConfig {
    layouts: FlexibleColumnLayoutDefinition;
}

export const DEFAULT_FLEXIBLE_LAYOUT_CONFIG: FlexibleLayoutConfig = {
    layouts: {
        OneColumnStartFullScreen: { start: 100, mid: 0, end: 0 },
        OneColumnMidFullScreen: { start: 0, mid: 100, end: 0 },
        OneColumnEndFullScreen: { start: 0, mid: 0, end: 100 },
        TwoColumnsStartExpanded: { start: 67, mid: 33, end: 0 },
        TwoColumnsMidExpanded: { start: 33, mid: 67, end: 0 },
        TwoColumnsEndExpanded: { start: 0, mid: 33, end: 67 },
        ThreeColumnsMidExpanded: { start: 25, mid: 50, end: 25 },
        ThreeColumnsEndExpanded: { start: 25, mid: 25, end: 50 },
        ThreeColumnsStartMinimized: { start: 0, mid: 67, end: 33 },
        ThreeColumnsEndMinimized: { start: 33, mid: 67, end: 0 }
    }
};

export const FD_FLEXIBLE_LAYOUT_CONFIG = new InjectionToken<FlexibleLayoutConfig>('FdFlexibleLayoutConfig');
