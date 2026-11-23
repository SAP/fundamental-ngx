import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { FdpFormGroupModule, PlatformRadioGroupModule } from '@fundamental-ngx/platform/form';

@Component({
    selector: 'fdp-platform-radio-group-readonly-example',
    templateUrl: './platform-radio-group-readonly-example.component.html',
    imports: [FdpFormGroupModule, FormsModule, ReactiveFormsModule, PlatformRadioGroupModule, ContentDensityDirective]
})
export class PlatformRadioGroupReadonlyExampleComponent {
    seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];

    items = [
        {
            label: 'Winter',
            value: 'winter',
            disabled: false
        },
        {
            label: 'Spring',
            value: 'spring',
            disabled: false
        },
        {
            label: 'Summer',
            value: 'summer',
            disabled: false
        },
        {
            label: 'Autumn',
            value: 'autumn',
            disabled: false
        }
    ];

    favoriteSeason1: string;
    favoriteSeason2: string;
    favoriteSeason3: string;

    customForm = new FormGroup({
        example1: new FormControl('winter'),
        example2: new FormControl('spring'),
        example3: new FormControl('summer')
    });
}
