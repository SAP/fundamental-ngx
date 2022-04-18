import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';

@Pipe({ name: 'asFormGroup' })
export class AsFormGroupPipe implements PipeTransform {
    transform(value: AbstractControl): FormGroup {
        return value as FormGroup;
    }
}

@Pipe({ name: 'asFormControl' })
export class AsFormControlPipe implements PipeTransform {
    transform(value: AbstractControl): FormControl {
        return value as FormControl;
    }
}
