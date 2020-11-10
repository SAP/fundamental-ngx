import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'fdp-platform-form-container-complex-example',
    templateUrl: './platform-form-container-complex-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlatformFormContainerComplexExampleComponent {
    form: FormGroup;
    seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];
    qty = 10;

    constructor() {
        this.form = new FormGroup({});
    }
}
