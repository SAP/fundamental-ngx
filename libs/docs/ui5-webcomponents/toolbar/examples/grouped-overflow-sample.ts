import { Component } from '@angular/core';
import { Toolbar } from '@fundamental-ngx/ui5-webcomponents/toolbar';
import { ToolbarButton } from '@fundamental-ngx/ui5-webcomponents/toolbar-button';
import { ToolbarSelect } from '@fundamental-ngx/ui5-webcomponents/toolbar-select';
import { ToolbarSelectOption } from '@fundamental-ngx/ui5-webcomponents/toolbar-select-option';
import { ToolbarSeparator } from '@fundamental-ngx/ui5-webcomponents/toolbar-separator';

@Component({
    selector: 'ui5-toolbar-grouped-overflow-sample',
    templateUrl: './grouped-overflow-sample.html',
    imports: [Toolbar, ToolbarButton, ToolbarSelect, ToolbarSelectOption, ToolbarSeparator]
})
export class ToolbarGroupedOverflowSample {}
