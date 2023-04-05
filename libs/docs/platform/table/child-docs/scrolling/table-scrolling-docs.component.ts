import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExampleChildService, ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';

const platformTablePageScrollingSrc = 'platform-table-page-scrolling-example.component.html';
const platformTablePageScrollingTsSrc = 'platform-table-page-scrolling-example.component.ts';
const platformVirtualScrollTableDefaultSrc = 'virtual-scroll/platform-table-virtual-scroll-example.component.html';
const platformVirtualScrollTableDefaultTsSrc = 'virtual-scroll/platform-table-virtual-scroll-example.component.ts';
@Component({
    selector: 'fd-table-scrolling-docs',
    templateUrl: './table-scrolling-docs.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableScrollingDocsComponent {
    childService = inject(ExampleChildService);
    route = inject(ActivatedRoute);
    pageScrollingTableFiles: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(platformTablePageScrollingSrc),
            fileName: 'platform-table-page-scrolling-example',
            name: 'platform-table-example.component.html'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(platformTablePageScrollingTsSrc),
            fileName: 'platform-table-page-scrolling-example',
            component: 'PlatformTablePageScrollingExampleComponent',
            name: 'platform-table-example.component.ts'
        }
    ];

    virtualScrollTableFiles: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(platformVirtualScrollTableDefaultSrc),
            fileName: 'platform-table-virtual-scroll-example',
            name: 'platform-table-virtual-scroll-example.component.html'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(platformVirtualScrollTableDefaultTsSrc),
            fileName: 'platform-table-virtual-scroll-example',
            component: 'PlatformTableVirtualScrollExampleComponent',
            name: 'platform-table-virtual-scroll-example.component.ts'
        }
    ];
    constructor() {
        this.childService.setLink(this.route.snapshot.routeConfig?.path);
    }
}
