import { Pipe, PipeTransform } from '@angular/core';
import { isFunction, isString } from '@fundamental-ngx/platform/shared';
import { TableRowType } from '../enums';
import { TableRow, TableRowClass } from '../models';

@Pipe({ name: 'rowClasses' })
export class RowClassesPipe implements PipeTransform {
    /** @hidden */
    transform(row: TableRow, rowsClass: TableRowClass): string {
        const treeRowClass = row.type === TableRowType.TREE ? 'fdp-table__row--tree' : '';
        const rowClasses = this._getRowCustomCssClasses(row, rowsClass);

        return rowClasses.concat(' ', treeRowClass).trim();
    }

    /** @hidden */
    private _getRowCustomCssClasses(row: TableRow, rowsClass: TableRowClass): string {
        if (!rowsClass) {
            return '';
        }

        let rowClasses = '';

        if (isString(rowsClass)) {
            rowClasses = rowsClass;
        }

        if (isFunction(rowsClass)) {
            rowClasses = (rowsClass as any)(row.value) || '';
        }

        return rowClasses.trim();
    }
}
