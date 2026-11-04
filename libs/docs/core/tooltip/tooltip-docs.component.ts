import { Component } from '@angular/core';

import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    getExampleFile,
    SeparatorComponent
} from '@fundamental-ngx/docs/shared';
import { TooltipAccessibilityExampleComponent } from './examples/tooltip-accessibility-example.component';
import { TooltipClickExampleComponent } from './examples/tooltip-click-example.component';
import { TooltipDefaultExampleComponent } from './examples/tooltip-default-example.component';
import { TooltipDelayExampleComponent } from './examples/tooltip-delay-example.component';
import { TooltipDialogExampleComponent } from './examples/tooltip-dialog-example.component';
import { TooltipDynamicExampleComponent } from './examples/tooltip-dynamic-example.component';
import { TooltipPlacementExampleComponent } from './examples/tooltip-placement-example.component';
import { TooltipProgrammaticExampleComponent } from './examples/tooltip-programmatic-example.component';
import { TooltipStyledExampleComponent } from './examples/tooltip-styled-example.component';
import { TooltipTemplateExampleComponent } from './examples/tooltip-template-example.component';
import { TooltipTruncationExampleComponent } from './examples/tooltip-truncation-example.component';

@Component({
    selector: 'app-tooltip',
    templateUrl: './tooltip-docs.component.html',
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        CodeExampleComponent,
        SeparatorComponent,
        TooltipDefaultExampleComponent,
        TooltipPlacementExampleComponent,
        TooltipClickExampleComponent,
        TooltipAccessibilityExampleComponent,
        TooltipTemplateExampleComponent,
        TooltipStyledExampleComponent,
        TooltipTruncationExampleComponent,
        TooltipDynamicExampleComponent,
        TooltipDelayExampleComponent,
        TooltipProgrammaticExampleComponent,
        TooltipDialogExampleComponent
    ]
})
export class TooltipDocsComponent {
    protected readonly defaultExample: ExampleFile[] = [
        getExampleFile('tooltip-default-example.component.html'),
        getExampleFile('tooltip-default-example.component.ts', { component: 'TooltipDefaultExampleComponent' })
    ];

    protected readonly placementExample: ExampleFile[] = [
        getExampleFile('tooltip-placement-example.component.html'),
        getExampleFile('tooltip-placement-example.component.ts', { component: 'TooltipPlacementExampleComponent' })
    ];

    protected readonly clickExample: ExampleFile[] = [
        getExampleFile('tooltip-click-example.component.html'),
        getExampleFile('tooltip-click-example.component.ts', { component: 'TooltipClickExampleComponent' })
    ];

    protected readonly accessibilityExample: ExampleFile[] = [
        getExampleFile('tooltip-accessibility-example.component.html'),
        getExampleFile('tooltip-accessibility-example.component.ts', {
            component: 'TooltipAccessibilityExampleComponent'
        })
    ];

    protected readonly templateExample: ExampleFile[] = [
        getExampleFile('tooltip-template-example.component.html'),
        getExampleFile('tooltip-template-example.component.ts', { component: 'TooltipTemplateExampleComponent' })
    ];

    protected readonly styledExample: ExampleFile[] = [
        getExampleFile('tooltip-styled-example.component.html'),
        getExampleFile('tooltip-styled-example.component.ts', { component: 'TooltipStyledExampleComponent' })
    ];

    protected readonly truncationExample: ExampleFile[] = [
        getExampleFile('tooltip-truncation-example.component.html'),
        getExampleFile('tooltip-truncation-example.component.ts', { component: 'TooltipTruncationExampleComponent' })
    ];

    protected readonly dynamicExample: ExampleFile[] = [
        getExampleFile('tooltip-dynamic-example.component.html'),
        getExampleFile('tooltip-dynamic-example.component.ts', { component: 'TooltipDynamicExampleComponent' })
    ];

    protected readonly delayExample: ExampleFile[] = [
        getExampleFile('tooltip-delay-example.component.html'),
        getExampleFile('tooltip-delay-example.component.ts', { component: 'TooltipDelayExampleComponent' })
    ];

    protected readonly programmaticExample: ExampleFile[] = [
        getExampleFile('tooltip-programmatic-example.component.html'),
        getExampleFile('tooltip-programmatic-example.component.ts', {
            component: 'TooltipProgrammaticExampleComponent'
        })
    ];

    protected readonly dialogExample: ExampleFile[] = [
        getExampleFile('tooltip-dialog-example.component.html'),
        getExampleFile('tooltip-dialog-example.component.ts', { component: 'TooltipDialogExampleComponent' })
    ];
}
