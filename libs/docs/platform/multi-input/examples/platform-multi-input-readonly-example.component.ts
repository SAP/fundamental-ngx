import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FdpFormGroupModule, PlatformMultiInputModule } from '@fundamental-ngx/platform/form';
import { DATA_PROVIDERS } from '@fundamental-ngx/platform/shared';

@Component({
    selector: 'fdp-platform-multi-input-readonly-example',
    templateUrl: './platform-multi-input-readonly-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{ provide: DATA_PROVIDERS, useValue: new Map() }],
    imports: [FormsModule, ReactiveFormsModule, FdpFormGroupModule, PlatformMultiInputModule, JsonPipe]
})
export class PlatformMultiInputReadonlyExampleComponent {
    _datasource = [
        { state: 'Alabama', city: 'Montgomery' },
        { state: 'Alaska', city: 'Juneau' },
        { state: 'Arizona', city: 'Phoenix' },
        { state: 'Arkansas', city: 'Little Rock' },
        { state: 'California', city: 'Sacramento' },
        { state: 'Colorado', city: 'Denver' },
        { state: 'Connecticut', city: 'Hartford' }
    ];

    // Pre-selected tokens so both deletion paths (close-icon pointer and keyboard
    // Backspace-then-Delete) can be exercised against the read-only control.
    customForm: FormGroup = new FormGroup({
        item: new FormControl(['Alabama', 'Alaska'])
    });
}
