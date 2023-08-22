import { Component } from '@angular/core';
import { IconModule } from '@fundamental-ngx/core/icon';
import { InlineHelpModule } from '@fundamental-ngx/core/inline-help';
import { ObjectStatusModule } from '@fundamental-ngx/core/object-status';

@Component({
    selector: 'fd-inline-help-template-example',
    templateUrl: './inline-help-template-example.component.html',
    standalone: true,
    imports: [ObjectStatusModule, InlineHelpModule, IconModule]
})
export class InlineHelpTemplateExampleComponent {}
