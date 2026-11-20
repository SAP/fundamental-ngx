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

    favoriteSeason = 'Winter';

    readonlyForm = new FormGroup({
        season: new FormControl('Winter')
    });
}
