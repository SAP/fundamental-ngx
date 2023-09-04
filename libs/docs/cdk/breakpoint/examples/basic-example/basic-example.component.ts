import { Component } from '@angular/core';
import { BreakpointDirective } from '@fundamental-ngx/cdk/utils';

@Component({
    selector: 'fdk-breakpoint-basic-example',
    templateUrl: './basic-example.component.html',
    standalone: true,
    imports: [BreakpointDirective]
})
export class BasicExampleComponent {}
