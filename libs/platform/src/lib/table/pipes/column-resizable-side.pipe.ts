import { Pipe, PipeTransform } from '@angular/core';
import { TableColumnResizableSide } from './../directives/table-cell-resizable.directive';

@Pipe({ name: 'columnResizableSide' })
export class ColumnResizableSidePipe implements PipeTransform {
    transform(
        columnIndex: number,
        visibleColumnsLength: number,
        navigationColumnShown: boolean
    ): TableColumnResizableSide {
        if (columnIndex === 0) {
            return 'end';
        }

        const isLastColumn = columnIndex === visibleColumnsLength - 1;

        if (isLastColumn && navigationColumnShown) {
            return 'start';
        }

        return 'both';
    }
}
