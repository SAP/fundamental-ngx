import { Component, ViewEncapsulation } from '@angular/core';
import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';
import { DisabledExampleComponent } from './examples/disabled-example/disabled-example.component';
import { SeparatorComponent } from '../../shared/src/lib/core-helpers/seperator/seperator.component';
import { CodeExampleComponent } from '../../shared/src/lib/core-helpers/code-example/code-example.component';
import { DefaultExampleComponent } from './examples/default-example/default-example.component';
import { ComponentExampleComponent } from '../../shared/src/lib/core-helpers/component-example/component-example.component';
import { DescriptionComponent } from '../../shared/src/lib/core-helpers/description/description';
import { DocsSectionTitleComponent } from '../../shared/src/lib/core-helpers/docs-section-title/docs-section-title.component';

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
