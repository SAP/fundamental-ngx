import { Component } from '@angular/core';
import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';

const tileGenericSrc = 'tile-generic-example.component.html';
const tileColumnsSrc = 'tile-columns-example.component.html';
const launchSrc = 'launch-tile-example.component.html';
const kpiSrc = 'kpi-tile-example.component.html';
const slideSrc = 'slide-tile-example.component.html';
const actionSrc = 'action-tile-example.component.html';
const badgeSrc = 'badge-tile-example.component.html';
const feedSrc = 'feed-tile-example.component.html';
const lineSrc = 'line-tile-example.component.html';
const clickableSrc = 'clickable-tile-example.component.html';

@Component({
    selector: 'app-tile',
    templateUrl: './tile-docs.component.html'
})
export class TileDocsComponent {
    genericTile: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(tileGenericSrc),
            fileName: 'tile-generic-example'
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
            fileName: 'launch-example'
        }
    ];

    kpi: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(kpiSrc),
            fileName: 'kpi-example'
        }
    ];

    slide: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(slideSrc),
            fileName: 'slide-example'
        }
    ];

    action: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(actionSrc),
            fileName: 'action-example'
        }
    ];

    badge: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(badgeSrc),
            fileName: 'badge-example'
        }
    ];

    feed: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(feedSrc),
            fileName: 'feed-example'
        }
    ];

    line: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(lineSrc),
            fileName: 'line-example'
        }
    ];

    clickable: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(clickableSrc),
            fileName: 'clickable-example'
        }
    ];
}
