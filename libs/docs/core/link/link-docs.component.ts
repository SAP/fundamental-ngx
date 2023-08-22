import { Component } from '@angular/core';
import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';
import { CodeExampleComponent } from '../../shared/src/lib/core-helpers/code-example/code-example.component';
import { LinkExampleComponent } from './examples/link-example.component';
import { ComponentExampleComponent } from '../../shared/src/lib/core-helpers/component-example/component-example.component';
import { DescriptionComponent } from '../../shared/src/lib/core-helpers/description/description';
import { DocsSectionTitleComponent } from '../../shared/src/lib/core-helpers/docs-section-title/docs-section-title.component';

const linkH = 'link-example.component.html';
const linkTs = 'link-example.component.ts';

@Component({
    selector: 'app-link',
    templateUrl: './link-docs.component.html',
    standalone: true,
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        LinkExampleComponent,
        CodeExampleComponent
    ]
})
export class LinkDocsComponent {
    link: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(linkH),
            fileName: 'link-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(linkTs),
            fileName: 'link-example',
            component: 'LinkExampleComponent'
        }
    ];
}
