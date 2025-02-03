import { Component } from '@angular/core';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';

import { KpiTileExampleComponent } from './examples/kpi-tile-example.component';
import { LaunchTileExampleComponent } from './examples/launch-tile-example.component';
import { MiscTileExampleComponent } from './examples/misc-tile-example.component';
import { TileColumnsExampleComponent } from './examples/tile-columns-example.component';
import { TileGenericExampleComponent } from './examples/tile-generic-example.component';

const tileGenericSrc = 'tile-generic-example.component.html';
const tileGenericTsSrc = 'tile-generic-example.component.ts';
const tileColumnsSrc = 'tile-columns-example.component.html';
const launchSrc = 'launch-tile-example.component.html';
const launchTsSrc = 'launch-tile-example.component.ts';
const launchScss = 'launch-tile-example.component.scss';
const kpiSrc = 'kpi-tile-example.component.html';
const kpiTs = 'kpi-tile-example.component.ts';
const miscSrc = 'misc-tile-example.component.html';
const miscTs = 'misc-tile-example.component.ts';

@Component({
    selector: 'app-tile',
    templateUrl: './tile-docs.component.html',
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        TileGenericExampleComponent,
        CodeExampleComponent,
        TileColumnsExampleComponent,
        LaunchTileExampleComponent,
        KpiTileExampleComponent,
        MiscTileExampleComponent
    ]
})
export class TileDocsComponent {
    genericTile: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(tileGenericSrc),
            fileName: 'tile-generic-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(tileGenericTsSrc),
            fileName: 'tile-generic-example',
            component: 'TileGenericExampleComponent'
        }
    ];

    columnsTile: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(tileColumnsSrc),
            fileName: 'tile-columns-example'
        }
    ];

    launch: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(launchSrc),
            fileName: 'launch-tile-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(launchTsSrc),
            fileName: 'launch-tile-example',
            component: 'LaunchTileExampleComponent',
            scssFileCode: getAssetFromModuleAssets(launchScss)
        }
    ];

    kpi: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(kpiSrc),
            fileName: 'kpi-tile-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(kpiTs),
            fileName: 'kpi-tile-example',
            component: 'KpiTileExampleComponent'
        }
    ];

    misc: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(miscSrc),
            fileName: 'misc-tile-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(miscTs),
            fileName: 'misc-tile-example',
            component: 'MiscTileExampleComponent'
        }
    ];
}
