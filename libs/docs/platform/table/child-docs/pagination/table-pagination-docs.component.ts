import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FdDatetimeModule } from '@fundamental-ngx/core/datetime';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleChildService,
    ExampleFile,
    SeparatorComponent,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { TableCustomPaginationExampleComponent } from '../../examples/custom-pagination/table-custom-pagination-example.component';
import { TableCustomPaginationOuterScrollExampleComponent } from '../../examples/custom-pagination/table-custom-pagination-outer-scroll-example.component';
import { PlatformTableStandardPaginationComponent } from '../../examples/standard-pagination/platform-table-standard-pagination-example.component';

const platformTableBuiltInPaginationSrc = 'custom-pagination/table-custom-pagination-example.component.html';
const platformTableBuiltInPaginationTsSrc = 'custom-pagination/table-custom-pagination-example.component.ts';

const platformTableBuiltInPaginationOuterScrollSrc =
    'custom-pagination/table-custom-pagination-outer-scroll-example.component.html';
const platformTableBuiltInPaginationOuterScrollTsSrc =
    'custom-pagination/table-custom-pagination-outer-scroll-example.component.ts';

const platformTableCorePaginationSrc = 'standard-pagination/platform-table-standard-pagination-example.component.html';
const platformTableCorePaginationTsSrc = 'standard-pagination/platform-table-standard-pagination-example.component.ts';

@Component({
    selector: 'fdp-doc-table-pagination-docs',
    imports: [
        PlatformTableStandardPaginationComponent,
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        CodeExampleComponent,
        SeparatorComponent,
        FdDatetimeModule,
        TableCustomPaginationExampleComponent,
        TableCustomPaginationOuterScrollExampleComponent
    ],
    templateUrl: './table-pagination-docs.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TablePaginationDocsComponent {
    childService = inject(ExampleChildService);
    route = inject(ActivatedRoute);
    builtInPagination: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(platformTableBuiltInPaginationSrc),
            fileName: 'table-custom-pagination-example',
            name: 'table-custom-pagination-example.component.html'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(platformTableBuiltInPaginationTsSrc),
            fileName: 'table-custom-pagination-example',
            component: 'TableCustomPaginationExampleComponent',
            name: 'table-custom-pagination-example.component.ts'
        }
    ];
    builtInPaginationOuterScroll: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(platformTableBuiltInPaginationOuterScrollSrc),
            fileName: 'table-custom-pagination-outer-scroll-example',
            name: 'table-custom-pagination-outer-scroll-example.component.html'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(platformTableBuiltInPaginationOuterScrollTsSrc),
            fileName: 'table-custom-pagination-outer-scroll-example',
            component: 'TableCustomPaginationExampleComponent',
            name: 'table-custom-pagination-outer-scroll-example.component.ts'
        }
    ];
    corePagination: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(platformTableCorePaginationSrc),
            fileName: 'platform-table-standard-pagination-example',
            name: 'platform-table-standard-pagination-example.component.html'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(platformTableCorePaginationTsSrc),
            fileName: 'platform-table-standard-pagination-example',
            component: 'PlatformTableStandardPaginationComponent',
            name: 'platform-table-standard-pagination-example.component.ts'
        }
    ];
    constructor() {
        this.childService.setLink(this.route.snapshot.routeConfig?.path);
    }
}
