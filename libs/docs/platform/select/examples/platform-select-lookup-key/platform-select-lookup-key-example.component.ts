import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { JsonPipe } from '@angular/common';
import { FdpFormGroupModule, PlatformSelectModule } from '@fundamental-ngx/platform/form';

interface Country {
    id: number;
    name: string;
    region: string;
}

@Component({
    selector: 'fdp-platform-select-lookup-key-example',
    templateUrl: './platform-select-lookup-key-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [FdpFormGroupModule, ReactiveFormsModule, PlatformSelectModule, JsonPipe]
})
export class PlatformSelectLookupKeyExampleComponent {
    countries: Country[] = [
        { id: 1, name: 'Germany', region: 'Europe' },
        { id: 2, name: 'France', region: 'Europe' },
        { id: 3, name: 'Japan', region: 'Asia' },
        { id: 4, name: 'Brazil', region: 'Americas' }
    ];

    form = new FormGroup({
        country: new FormControl<Country | null>({ id: 2, name: 'France', region: 'Europe' })
    });
}
