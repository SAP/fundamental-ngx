import { Component } from '@angular/core';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { LinkExampleComponent } from './examples/link-example.component';

const linkH = 'link-example.component.html';
const linkTs = 'link-example.component.ts';

@Component({
    selector: 'app-link',
    templateUrl: './link-docs.component.html',
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
