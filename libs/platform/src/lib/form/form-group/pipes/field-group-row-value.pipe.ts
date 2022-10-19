import { Pipe, PipeTransform } from '@angular/core';
import { KeyValue } from '@angular/common';
import { FieldColumn, FieldGroup } from '../../form-helpers';

@Pipe({ name: 'fieldGroupRowValue' })
export class FieldGroupRowValuePipe implements PipeTransform {
    /** @hidden */
    transform(row: KeyValue<any, FieldColumn | FieldGroup>): FieldColumn {
        return row.value instanceof FieldGroup ? row.value.fields : row.value;
    }
}
