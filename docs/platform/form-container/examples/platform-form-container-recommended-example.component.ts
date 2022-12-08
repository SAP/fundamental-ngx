import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'fdp-platform-form-container-recommended-example',
    templateUrl: './platform-form-container-recommended-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlatformFormContainerRecommendedExampleComponent {
    form: FormGroup = new FormGroup({});
    form1: FormGroup = new FormGroup({});
    form2: FormGroup = new FormGroup({});

    seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];
}
