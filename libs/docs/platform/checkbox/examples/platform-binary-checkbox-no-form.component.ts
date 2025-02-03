import { Component } from '@angular/core';
import { CheckboxComponent } from '@fundamental-ngx/platform/form';

@Component({
    selector: 'fdp-platform-binary-checkbox-no-form',
    templateUrl: 'platform-binary-checkbox-no-form.component.html',
    imports: [CheckboxComponent]
})
export class PlatformChekboxNoFormComponent {
    orion = true;
    cygnus = false;
    lyra = true;
    gemini = false;
}
