import { Component, ViewEncapsulation } from '@angular/core';

const defaultGenericTagExampleHtml = 'generic-tag-example/generic-tag-example.component.html';
import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';

@Component({
    selector: 'app-generic-tag',
    templateUrl: './generic-tag-docs.component.html',
    encapsulation: ViewEncapsulation.None
})
export class GenericTagDocsComponent {
    defaultGenericTagExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(defaultGenericTagExampleHtml),
            fileName: 'generic-tag-example'
        }
    ];
}
