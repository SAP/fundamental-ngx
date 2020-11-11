import { Pipe, PipeTransform } from '@angular/core';
import { SelectableRow } from '../interfaces';
import { getNestedValue } from '../../../utils/object';

@Pipe({ name: 'cellValueBy', pure: true })
export class CellValueByPipe implements PipeTransform {
    transform(row: SelectableRow, key: string): any {
        return getNestedValue(key, row.value);
    }
}
