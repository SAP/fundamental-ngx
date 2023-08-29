import { Pipe, PipeTransform } from '@angular/core';
import { KeyValue } from '@angular/common';
import { FieldColumn, FieldGroup } from '../../models/field.model';

@Pipe({
    name: 'fieldGroupRowValue',
    standalone: true
})
export class FieldGroupRowValuePipe implements PipeTransform {
    /** @hidden */
    transform(row: KeyValue<any, FieldColumn | FieldGroup>): FieldColumn {
        return row.value instanceof FieldGroup ? row.value.fields : row.value;
    }
}
