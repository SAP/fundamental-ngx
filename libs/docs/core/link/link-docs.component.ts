import { Component } from '@angular/core';
import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';

const linkH = 'link-example.component.html';
const linkTs = 'link-example.component.ts';

@Component({
    selector: 'app-link',
    templateUrl: './link-docs.component.html'
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
