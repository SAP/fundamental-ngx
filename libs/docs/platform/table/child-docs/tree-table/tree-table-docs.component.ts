import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExampleChildService, ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';

const platformTableTreeTableSrc = 'platform-table-tree-example.component.html';
const platformTableTreeTableTsSrc = 'platform-table-tree-example.component.ts';
@Component({
    selector: 'fd-tree-table-docs',
    templateUrl: './tree-table-docs.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TreeTableDocsComponent {
    childService = inject(ExampleChildService);
    route = inject(ActivatedRoute);
    treeTableFiles: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(platformTableTreeTableSrc),
            fileName: 'platform-table--tree-table-example',
            name: 'platform-table-example.component.html'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(platformTableTreeTableTsSrc),
            fileName: 'platform-table--tree-table-example',
            component: 'PlatformTableTreeTableExampleComponent',
            name: 'platform-table-example.component.ts'
        }
    ];
    constructor() {
        this.childService.setLink(this.route.snapshot.routeConfig?.path);
    }
}
