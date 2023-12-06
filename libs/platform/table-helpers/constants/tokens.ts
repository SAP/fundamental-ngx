import { InjectionToken } from '@angular/core';
import { TableDraggable, TableInitialState, TableVirtualScroll } from '../models';

export const FDP_TABLE_DRAGGABLE_DIRECTIVE = new InjectionToken<TableDraggable>('FdpTableDraggableDirective');
export const FDP_TABLE_STATE_DIRECTIVE = new InjectionToken<TableInitialState>('FdpTableStateDirective');
export const FDP_TABLE_VIRTUAL_SCROLL_DIRECTIVE = new InjectionToken<TableVirtualScroll>(
    'FdpTableVirtualScrollDirective'
);
