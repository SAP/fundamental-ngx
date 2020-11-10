import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'fdp-platform-form-container-possible-example',
    templateUrl: './platform-form-container-possible-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlatformFormContainerPossibleExampleComponent {
    form: FormGroup;
    form1: FormGroup;

    seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];

    constructor() {
        this.form = new FormGroup({});
        this.form1 = new FormGroup({});
    }
}
