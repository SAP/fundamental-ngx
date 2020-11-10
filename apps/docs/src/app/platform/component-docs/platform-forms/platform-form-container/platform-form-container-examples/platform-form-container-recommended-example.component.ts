import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'fdp-platform-form-container-recommended-example',
    templateUrl: './platform-form-container-recommended-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlatformFormContainerRecommendedExampleComponent {
    form: FormGroup;
    form1: FormGroup;
    form2: FormGroup;

    seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];

    constructor() {
        this.form = new FormGroup({});
        this.form1 = new FormGroup({});
        this.form2 = new FormGroup({});
    }
}
