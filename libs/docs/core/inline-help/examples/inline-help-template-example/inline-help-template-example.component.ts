import { Component } from '@angular/core';
import { IconComponent } from '@fundamental-ngx/core/icon';
import { InlineHelpModule } from '@fundamental-ngx/core/inline-help';
import { ObjectStatusComponent } from '@fundamental-ngx/core/object-status';

@Component({
    selector: 'fd-inline-help-template-example',
    templateUrl: './inline-help-template-example.component.html',
    imports: [ObjectStatusComponent, InlineHelpModule, IconComponent]
})
export class InlineHelpTemplateExampleComponent {}
