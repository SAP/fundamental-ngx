import { Component } from '@angular/core';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { InlineHelpModule } from '@fundamental-ngx/core/inline-help';

@Component({
    selector: 'fd-inline-help-trigger-example',
    templateUrl: './inline-help-trigger-example.component.html',
    imports: [ButtonComponent, InlineHelpModule]
})
export class InlineHelpTriggerExampleComponent {}
