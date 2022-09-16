import { Component } from '@angular/core';
import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';

const contentDensitySrc = 'content-density-example.component.ts';

@Component({
    selector: 'app-content-density-docs',
    templateUrl: 'content-density-docs.component.html'
})
export class OldContentDensityDocsComponent {
    contentDensityExample: ExampleFile[] = [
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(contentDensitySrc),
            fileName: 'content-density-example',
            component: 'ContentDensityExampleComponent'
        }
    ];
}
