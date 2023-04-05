import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExampleChildService, ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';

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
    changeDetection: ChangeDetectionStrategy.OnPush
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
