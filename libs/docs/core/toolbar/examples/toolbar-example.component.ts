import { Component } from '@angular/core';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { IconComponent } from '@fundamental-ngx/core/icon';
import { TitleComponent } from '@fundamental-ngx/core/title';
import {
    ToolbarComponent,
    ToolbarItemDirective,
    ToolbarLabelDirective,
    ToolbarSeparatorComponent,
    ToolbarSpacerDirective
} from '@fundamental-ngx/core/toolbar';

@Component({
    selector: 'fd-toolbar-type-example',
    templateUrl: './toolbar-type-example.component.html',
    imports: [ToolbarComponent, ToolbarLabelDirective]
})
export class ToolbarTypeExampleComponent {}

@Component({
    selector: 'fd-toolbar-title-example',
    templateUrl: './toolbar-title-example.component.html',
    imports: [TitleComponent, ToolbarComponent, IconComponent]
})
export class ToolbarTitleExampleComponent {}

@Component({
    selector: 'fd-toolbar-spacer-example',
    templateUrl: './toolbar-spacer-example.component.html',
    imports: [ToolbarComponent, ToolbarLabelDirective, ToolbarSpacerDirective]
})
export class ToolbarSpacerExampleComponent {}

@Component({
    selector: 'fd-toolbar-separator-example',
    templateUrl: './toolbar-separator-example.component.html',
    imports: [ToolbarComponent, ToolbarLabelDirective, ToolbarSeparatorComponent]
})
export class ToolbarSeparatorExampleComponent {}

@Component({
    selector: 'fd-toolbar-overflow-priority-example',
    templateUrl: './toolbar-overflow-priority-example.component.html',
    imports: [ToolbarComponent, ButtonComponent, ToolbarItemDirective, ToolbarSpacerDirective]
})
export class ToolbarOverflowPriorityExampleComponent {}

@Component({
    selector: 'fd-toolbar-overflow-grouping-example',
    templateUrl: './toolbar-overflow-grouping-example.component.html',
    imports: [ToolbarComponent, ButtonComponent, ToolbarItemDirective]
})
export class ToolbarOverflowGroupingExampleComponent {}
