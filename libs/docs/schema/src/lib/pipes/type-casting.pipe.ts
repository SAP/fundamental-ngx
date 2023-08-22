import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';

abstract class TypeEnforcerPipe<AsType, OriginalType = any> implements PipeTransform {
    transform(value: OriginalType): AsType {
        return (<any>value) as AsType;
    }
}

@Pipe({
    name: 'asFormGroup',
    standalone: true
})
export class AsFormGroupPipe extends TypeEnforcerPipe<FormGroup, AbstractControl> implements PipeTransform {}

@Pipe({
    name: 'asFormControl',
    standalone: true
})
export class AsFormControlPipe extends TypeEnforcerPipe<FormControl, AbstractControl> implements PipeTransform {}
