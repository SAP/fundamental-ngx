import { Pipe, PipeTransform } from '@angular/core';
import { TableColumnResizableSide } from './../directives/table-cell-resizable.directive';

@Pipe({ name: 'columnResizableSide', standalone: true })
export class ColumnResizableSidePipe implements PipeTransform {
    /** @hidden */
    transform(
        columnIndex: number,
        visibleColumnsLength: number,
        navigationColumnShown: boolean | null
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
