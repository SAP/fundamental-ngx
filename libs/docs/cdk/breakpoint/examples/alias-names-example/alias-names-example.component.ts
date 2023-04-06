import { Component } from '@angular/core';

@Component({
    selector: 'fdk-breakpoint-alias-names-example',
    template: `
        <ng-template fdkBreakpointS fdkBreakpointM fdkBreakpointL>
            <div>Will be visible on S, M and L only</div>
        </ng-template>
        <ng-template [fdkBreakpointGt]="400">
            <div>Will be visible on screen width greater than 400px</div>
        </ng-template>
        <ng-template [fdkBreakpointLt]="1900">
            <div>Will be visible on screen width less than 1900px</div>
        </ng-template>
    `
})
export class AliasNamesExampleComponent {}
