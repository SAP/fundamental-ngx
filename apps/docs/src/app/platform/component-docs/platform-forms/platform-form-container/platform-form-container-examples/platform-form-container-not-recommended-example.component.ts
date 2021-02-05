import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'fdp-platform-form-container-not-recommended-example',
    templateUrl: './platform-form-container-not-recommended-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlatformFormContainerNotRecommendedExampleComponent {
    form: FormGroup = new FormGroup({});
    form1: FormGroup = new FormGroup({});

    seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];
}
