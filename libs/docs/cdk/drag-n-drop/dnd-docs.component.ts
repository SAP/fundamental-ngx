import { Component, ViewEncapsulation } from '@angular/core';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    SeparatorComponent,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { DefaultExampleComponent } from './examples/default-example/default-example.component';
import { DisabledExampleComponent } from './examples/disabled-example/disabled-example.component';

const defaultExampleHtml = 'default-example/default-example.component.html';
const defaultExampleTs = 'default-example/default-example.component.ts';

const disabledExampleHtml = 'disabled-example/disabled-example.component.html';
const disabledExampleTs = 'disabled-example/disabled-example.component.ts';

@Component({
    selector: 'app-dnd',
    templateUrl: './dnd-docs.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        DefaultExampleComponent,
        CodeExampleComponent,
        SeparatorComponent,
        DisabledExampleComponent
    ]
})
export class DndDocsComponent {
    defaultExample: ExampleFile[] = [
        {
            code: getAssetFromModuleAssets(defaultExampleHtml),
            language: 'html',
            fileName: 'disabled-default-example',
            component: 'fdkDisabledDefaultExample'
        },
        {
            code: getAssetFromModuleAssets(defaultExampleTs),
            language: 'ts',
            fileName: 'disabled-default-example',
            component: 'fdkDisabledDefaultExample'
        }
    ];

    disabledExample: ExampleFile[] = [
        {
            code: getAssetFromModuleAssets(disabledExampleHtml),
            language: 'html',
            fileName: 'disabled-example',
            component: 'DisabledExampleComponent'
        },
        {
            code: getAssetFromModuleAssets(disabledExampleTs),
            language: 'ts',
            fileName: 'disabled-example',
            component: 'DisabledExampleComponent'
        }
    ];

    constructor() {}
}
