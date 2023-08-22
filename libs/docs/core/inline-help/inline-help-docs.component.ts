import { Component } from '@angular/core';

import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';
import { InlineHelpTemplateExampleComponent } from './examples/inline-help-template-example/inline-help-template-example.component';
import { InlineHelpStyledExampleComponent } from './examples/inline-help-styled-example.component';
import { InlineHelpTriggerExampleComponent } from './examples/inline-help-trigger-example.component';
import { SeparatorComponent } from '../../shared/src/lib/core-helpers/seperator/seperator.component';
import { CodeExampleComponent } from '../../shared/src/lib/core-helpers/code-example/code-example.component';
import { InlineHelpExampleComponent } from './examples/inline-help-example.component';
import { ComponentExampleComponent } from '../../shared/src/lib/core-helpers/component-example/component-example.component';
import { DescriptionComponent } from '../../shared/src/lib/core-helpers/description/description';
import { DocsSectionTitleComponent } from '../../shared/src/lib/core-helpers/docs-section-title/docs-section-title.component';

const inlineHelpTs = 'inline-help-example.component.ts';
const inlineHelpSrc = 'inline-help-example.component.html';
const inlineHelpTriggerHtml = 'inline-help-trigger-example.component.html';
const inlineHelpStylesTs = 'inline-help-styled-example.component.ts';
const inlineHelpStylesHtml = 'inline-help-styled-example.component.html';
const inlineHelpTemplateHtml = 'inline-help-template-example/inline-help-template-example.component.html';

@Component({
    selector: 'app-inline-help',
    templateUrl: './inline-help-docs.component.html',
    standalone: true,
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        InlineHelpExampleComponent,
        CodeExampleComponent,
        SeparatorComponent,
        InlineHelpTriggerExampleComponent,
        InlineHelpStyledExampleComponent,
        InlineHelpTemplateExampleComponent
    ]
})
export class InlineHelpDocsComponent {
    inlineHelpBasic: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(inlineHelpSrc),
            fileName: 'inline-help-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(inlineHelpTs),
            fileName: 'inline-help-example',
            component: 'InlineHelpExampleComponent'
        }
    ];

    inlineHelpTrigger: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(inlineHelpTriggerHtml),
            fileName: 'inline-help-trigger-example'
        }
    ];

    inlineHelpTemplate: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(inlineHelpTemplateHtml),
            fileName: 'inline-help-template-example'
        }
    ];

    inlineHelpStyles: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(inlineHelpStylesHtml),
            fileName: 'inline-help-styled-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(inlineHelpStylesTs),
            fileName: 'inline-help-styled-example',
            component: 'InlineHelpStyledExampleComponent'
        }
    ];
}
