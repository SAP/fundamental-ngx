import { Component, ViewEncapsulation } from '@angular/core';

const tabSrc = 'search-example/search-example.component.html';
import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';

@Component({
    selector: 'app-search',
    templateUrl: './search-docs.component.html',
    styleUrls: ['search-docs.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SearchDocsComponent {
    searchExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(tabSrc),
            fileName: 'search-example'
        }
    ];
}
