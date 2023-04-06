import { Component, inject, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExampleChildService, ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';
const platformTableP13ColumnSrc = 'platform-table-p13-columns-example.component.html';
const platformTableP13ColumnTsSrc = 'platform-table-p13-columns-example.component.ts';
const platformTableP13SortSrc = 'platform-table-p13-sort-example.component.html';
const platformTableP13SortTsSrc = 'platform-table-p13-sort-example.component.ts';
const platformTableP13FilterSrc = 'platform-table-p13-filter-example.component.html';
const platformTableP13FilterTsSrc = 'platform-table-p13-filter-example.component.ts';
const platformTableP13GroupSrc = 'platform-table-p13-group-example.component.html';
const platformTableP13GroupTsSrc = 'platform-table-p13-group-example.component.ts';

@Component({
    selector: 'fdp-doc-p13-dialog-docs',
    templateUrl: './p13-dialog-docs.component.html',
    encapsulation: ViewEncapsulation.None
})
export class P13DialogDocsComponent {
    childService = inject(ExampleChildService);
    route = inject(ActivatedRoute);
    p13ColumnsFiles: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(platformTableP13ColumnSrc),
            fileName: 'platform-table-p13-columns-example',
            name: 'platform-table-example.component.html'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(platformTableP13ColumnTsSrc),
            fileName: 'platform-table-p13-columns-example',
            component: 'PlatformTableP13ColumnsExampleComponent',
            name: 'platform-table-example.component.ts'
        }
    ];

    p13SortFiles: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(platformTableP13SortSrc),
            fileName: 'platform-table-p13-sort-example',
            name: 'platform-table-example.component.html'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(platformTableP13SortTsSrc),
            fileName: 'platform-table-p13-sort-example',
            component: 'PlatformTableP13SortExampleComponent',
            name: 'platform-table-example.component.ts'
        }
    ];

    p13FilterFiles: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(platformTableP13FilterSrc),
            fileName: 'platform-table-p13-filter-example',
            name: 'platform-table-example.component.html'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(platformTableP13FilterTsSrc),
            fileName: 'platform-table-p13-filter-example',
            component: 'PlatformTableP13FilterExampleComponent',
            name: 'platform-table-example.component.ts'
        }
    ];

    p13GroupFiles: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(platformTableP13GroupSrc),
            fileName: 'platform-table-p13-group-example',
            name: 'platform-table-example.component.html'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(platformTableP13GroupTsSrc),
            fileName: 'platform-table-p13-group-example',
            component: 'PlatformTableP13GroupExampleComponent',
            name: 'platform-table-example.component.ts'
        }
    ];

    constructor() {
        this.childService.setLink(this.route.snapshot.routeConfig?.path);
    }
}
