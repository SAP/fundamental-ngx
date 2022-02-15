import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'fdp-form-field-extras',
    template: '<ng-content></ng-content>',
    // "display: flex" is used in order to have margin included in control's dimensions
    styles: [':host { display: flex; white-space: normal; }'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormFieldControlExtrasComponent {}
