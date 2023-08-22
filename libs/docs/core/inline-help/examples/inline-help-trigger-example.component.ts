import { Component } from '@angular/core';
import { InlineHelpModule } from '@fundamental-ngx/core/inline-help';
import { ButtonModule } from '@fundamental-ngx/core/button';

@Component({
    selector: 'fd-inline-help-trigger-example',
    templateUrl: './inline-help-trigger-example.component.html',
    standalone: true,
    imports: [ButtonModule, InlineHelpModule]
})
export class InlineHelpTriggerExampleComponent {}
