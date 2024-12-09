import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FdDatetimeModule } from '@fundamental-ngx/core/datetime';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleChildService,
    ExampleFile,
    getAssetFromModuleAssets,
    SeparatorComponent
} from '@fundamental-ngx/docs/shared';
import { PlatformTableOuterScrollExampleComponent } from '../../examples/platform-table-outer-scroll-example.component';
import { PlatformTablePageScrollingExampleComponent } from '../../examples/platform-table-page-scrolling-example.component';
import { PlatformTableVirtualScrollExampleComponent } from '../../examples/virtual-scroll/platform-table-virtual-scroll-example.component';

const platformTablePageScrollingSrc = 'platform-table-page-scrolling-example.component.html';
const platformTablePageScrollingTsSrc = 'platform-table-page-scrolling-example.component.ts';
const platformVirtualScrollTableDefaultSrc = 'virtual-scroll/platform-table-virtual-scroll-example.component.html';
const platformVirtualScrollTableDefaultTsSrc = 'virtual-scroll/platform-table-virtual-scroll-example.component.ts';

const platformTableOuterScrollSrc = 'platform-table-outer-scroll-example.component.html';
const platformTableOuterScrollTsSrc = 'platform-table-outer-scroll-example.component.ts';

@Component({
    selector: 'fd-table-scrolling-docs',
    templateUrl: './table-scrolling-docs.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        PlatformTablePageScrollingExampleComponent,
        CodeExampleComponent,
        SeparatorComponent,
        PlatformTableVirtualScrollExampleComponent,
        PlatformTableOuterScrollExampleComponent,
        FdDatetimeModule
    ]
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

    outsideScrollTableFiles: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(platformTableOuterScrollSrc),
            fileName: 'platform-table-ouside-scroll-example',
            name: 'platform-table-outer-scroll-example.component.html'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(platformTableOuterScrollTsSrc),
            fileName: 'platform-table-ouside-scroll-example',
            component: 'PlatformTablePageScrollingExampleComponent',
            name: 'platform-table-outer-scroll-example.component.ts'
        }
    ];

    constructor() {
        this.childService.setLink(this.route.snapshot.routeConfig?.path);
    }
}
