import { Component } from '@angular/core';
import { PlatformWizardGeneratorModule } from '@fundamental-ngx/platform/wizard-generator';

@Component({
    selector: 'fdp-wizard-generator-loading-example',
    templateUrl: './wizard-generator-loading-example.component.html',
    standalone: true,
    imports: [PlatformWizardGeneratorModule]
})
export class WizardGeneratorLoadingExampleComponent {}
