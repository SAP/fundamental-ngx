import { Component } from '@angular/core';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { InlineHelpModule } from '@fundamental-ngx/core/inline-help';

@Component({
    selector: 'fd-inline-help-trigger-example',
    templateUrl: './inline-help-trigger-example.component.html',
    standalone: true,
    imports: [ButtonModule, InlineHelpModule]
})
export class InlineHelpTriggerExampleComponent {}
