import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';

abstract class TypeEnforcerPipe<AsType, OriginalType = any> implements PipeTransform {
    transform(value: OriginalType): AsType {
        return (<any>value) as AsType;
    }
}

@Pipe({ name: 'asFormGroup' })
export class AsFormGroupPipe extends TypeEnforcerPipe<FormGroup, AbstractControl> implements PipeTransform {}

@Pipe({ name: 'asFormControl' })
export class AsFormControlPipe extends TypeEnforcerPipe<FormControl, AbstractControl> implements PipeTransform {}
