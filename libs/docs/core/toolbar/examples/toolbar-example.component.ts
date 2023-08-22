import { Component } from '@angular/core';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { ToolbarItemDirective } from '@fundamental-ngx/core/toolbar';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { ToolbarSeparatorComponent } from '@fundamental-ngx/core/toolbar';
import { ToolbarSpacerDirective } from '@fundamental-ngx/core/toolbar';
import { IconModule } from '@fundamental-ngx/core/icon';
import { TitleComponent } from '@fundamental-ngx/core/title';
import { ToolbarLabelDirective } from '@fundamental-ngx/core/toolbar';
import { ToolbarComponent } from '@fundamental-ngx/core/toolbar';

@Component({
    selector: 'fd-toolbar-type-example',
    templateUrl: './toolbar-type-example.component.html',
    standalone: true,
    imports: [ToolbarComponent, ToolbarLabelDirective]
})
export class ToolbarTypeExampleComponent {}

@Component({
    selector: 'fd-toolbar-title-example',
    templateUrl: './toolbar-title-example.component.html',
    standalone: true,
    imports: [TitleComponent, ToolbarComponent, IconModule]
})
export class ToolbarTitleExampleComponent {}

@Component({
    selector: 'fd-toolbar-spacer-example',
    templateUrl: './toolbar-spacer-example.component.html',
    standalone: true,
    imports: [ToolbarComponent, ToolbarLabelDirective, ToolbarSpacerDirective]
})
export class ToolbarSpacerExampleComponent {}

@Component({
    selector: 'fd-toolbar-separator-example',
    templateUrl: './toolbar-separator-example.component.html',
    standalone: true,
    imports: [ToolbarComponent, ToolbarLabelDirective, ToolbarSeparatorComponent]
})
export class ToolbarSeparatorExampleComponent {}

@Component({
    selector: 'fd-toolbar-overflow-priority-example',
    templateUrl: './toolbar-overflow-priority-example.component.html',
    standalone: true,
    imports: [ToolbarComponent, ButtonModule, ToolbarItemDirective]
})
export class ToolbarOverflowPriorityExampleComponent {}

@Component({
    selector: 'fd-toolbar-overflow-grouping-example',
    templateUrl: './toolbar-overflow-grouping-example.component.html',
    standalone: true,
    imports: [ToolbarComponent, ButtonModule, ToolbarItemDirective]
})
export class ToolbarOverflowGroupingExampleComponent {}

@Component({
    selector: 'fd-toolbar-size-example',
    templateUrl: './toolbar-size-example.component.html',
    standalone: true,
    imports: [ToolbarComponent, ContentDensityDirective, ToolbarLabelDirective]
})
export class ToolbarSizeExampleComponent {}
