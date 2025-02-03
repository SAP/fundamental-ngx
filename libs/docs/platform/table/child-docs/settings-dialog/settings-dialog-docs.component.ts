import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
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
import { PlatformTableFilterableExampleComponent } from '../../examples/platform-table-filterable-example.component';
import { PlatformTableGroupableExampleComponent } from '../../examples/platform-table-groupable-example.component';
import { PlatformTableSortableExampleComponent } from '../../examples/platform-table-sortable-example.component';

const platformTableSortableSrc = 'platform-table-sortable-example.component.html';
const platformTableSortableTsSrc = 'platform-table-sortable-example.component.ts';
const platformTableGroupableSrc = 'platform-table-groupable-example.component.html';
const platformTableGroupableTsSrc = 'platform-table-groupable-example.component.ts';
const platformTableFilterableSrc = 'platform-table-filterable-example.component.html';
const platformTableFilterableTsSrc = 'platform-table-filterable-example.component.ts';
@Component({
    selector: 'fd-settings-dialog-docs',
    templateUrl: './settings-dialog-docs.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        RouterLink,
        ComponentExampleComponent,
        PlatformTableSortableExampleComponent,
        CodeExampleComponent,
        SeparatorComponent,
        PlatformTableFilterableExampleComponent,
        PlatformTableGroupableExampleComponent,
        FdDatetimeModule
    ]
})
export class SettingsDialogDocsComponent {
    childService = inject(ExampleChildService);
    route = inject(ActivatedRoute);
    sortableTableFiles: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(platformTableSortableSrc),
            fileName: 'platform-table-sortable-example',
            name: 'platform-table-example.component.html'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(platformTableSortableTsSrc),
            fileName: 'platform-table-sortable-example',
            component: 'PlatformTableSortableExampleComponent',
            name: 'platform-table-example.component.ts'
        }
    ];

    filterableTableFiles: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(platformTableFilterableSrc),
            fileName: 'platform-table-filterable-example',
            name: 'platform-table-example.component.html'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(platformTableFilterableTsSrc),
            fileName: 'platform-table-filterable-example',
            component: 'PlatformTableFilterableExampleComponent',
            name: 'platform-table-example.component.ts'
        }
    ];

    groupableTableFiles: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(platformTableGroupableSrc),
            fileName: 'platform-table-groupable-example',
            name: 'platform-table-example.component.html'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(platformTableGroupableTsSrc),
            fileName: 'platform-table-groupable-example',
            component: 'PlatformTableGroupableExampleComponent',
            name: 'platform-table-example.component.ts'
        }
    ];
    constructor() {
        this.childService.setLink(this.route.snapshot.routeConfig?.path);
    }
}
