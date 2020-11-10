import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'fdp-platform-form-container-not-recommended-example',
    templateUrl: './platform-form-container-not-recommended-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlatformFormContainerNotRecommendedExampleComponent {
    form: FormGroup;
    form1: FormGroup;

    seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];

    constructor() {
        this.form = new FormGroup({});
        this.form1 = new FormGroup({});
    }
}
