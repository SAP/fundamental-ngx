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
import { PlatformTableMultipleRowSelectionExampleComponent } from '../../examples/platform-table-multiple-row-selection-example.component';
import { PlatformTableSingleRowSelectionExampleComponent } from '../../examples/platform-table-single-row-selection-example.component';

const platformTableSingleRowSelectionSrc = 'platform-table-single-row-selection-example.component.html';
const platformTableSingleRowSelectionTsSrc = 'platform-table-single-row-selection-example.component.ts';
const platformTableMultipleRowSelectionSrc = 'platform-table-multiple-row-selection-example.component.html';
const platformTableMultipleRowSelectionTsSrc = 'platform-table-multiple-row-selection-example.component.ts';
@Component({
    selector: 'fd-row-selection-docs',
    templateUrl: './row-selection-docs.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        PlatformTableSingleRowSelectionExampleComponent,
        CodeExampleComponent,
        SeparatorComponent,
        PlatformTableMultipleRowSelectionExampleComponent,
        FdDatetimeModule
    ]
})
export class RowSelectionDocsComponent {
    childService = inject(ExampleChildService);
    route = inject(ActivatedRoute);
    singleRowSelectionFiles: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(platformTableSingleRowSelectionSrc),
            fileName: 'platform-table-single-row-selection-example',
            name: 'platform-table-example.component.html'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(platformTableSingleRowSelectionTsSrc),
            fileName: 'platform-table-single-row-selection-example',
            component: 'PlatformTableSingleRowSelectionExampleComponent',
            name: 'platform-table-example.component.ts'
        }
    ];

    multipleRowSelectionFiles: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(platformTableMultipleRowSelectionSrc),
            fileName: 'platform-table-multiple-row-selection-example',
            name: 'platform-table-example.component.html'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(platformTableMultipleRowSelectionTsSrc),
            fileName: 'platform-table-multiple-row-selection-example',
            component: 'PlatformTableMultipleRowSelectionExampleComponent',
            name: 'platform-table-example.component.ts'
        }
    ];
    constructor() {
        this.childService.setLink(this.route.snapshot.routeConfig?.path);
    }
}
