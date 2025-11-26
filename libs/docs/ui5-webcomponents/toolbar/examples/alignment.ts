import { Component, signal } from '@angular/core';
import { Toolbar } from '@fundamental-ngx/ui5-webcomponents/toolbar';
import { ToolbarButton } from '@fundamental-ngx/ui5-webcomponents/toolbar-button';
import { ToolbarSpacer } from '@fundamental-ngx/ui5-webcomponents/toolbar-spacer';
import { ToolbarAlign } from '@fundamental-ngx/ui5-webcomponents/types';

@Component({
    selector: 'ui5-toolbar-alignment-sample',
    templateUrl: './alignment.html',
    standalone: true,
    imports: [Toolbar, ToolbarButton, ToolbarSpacer]
})
export class ToolbarAlignmentSample {
    alignmentStart = signal(ToolbarAlign.Start);
    alignmentEnd = signal(ToolbarAlign.End);
}
