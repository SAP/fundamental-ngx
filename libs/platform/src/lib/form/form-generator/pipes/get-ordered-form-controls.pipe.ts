import { Pipe, PipeTransform } from '@angular/core';
import { DynamicFormControl, DynamicFormControlGroup, DynamicFormGroupControl } from '../dynamic-form-control';

@Pipe({ name: 'getOrderedFieldControls' })
export class GetOrderedFieldControlsPipe implements PipeTransform {
    /** @hidden */
    transform(field: DynamicFormGroupControl): DynamicFormControl[] {
        // casting type explicity to the DynamicFormControl[] as this pipe will be used specifically with this data type
        return Object.values((field as DynamicFormControlGroup).controls).sort((a, b) =>
            (a.formItem.rank ?? -Infinity) > (b.formItem.rank ?? -Infinity) ? 1 : -1
        ) as DynamicFormControl[];
    }
}
