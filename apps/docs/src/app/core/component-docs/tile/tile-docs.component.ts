import { Component } from '@angular/core';
import tileGenericSrc from '!./examples/tile-generic-example.component.html?raw';
import tileColumnsSrc from '!./examples/tile-columns-example.component.html?raw';
import launchSrc from '!./examples/launch-tile-example.component.html?raw';
import kpiSrc from '!./examples/kpi-tile-example.component.html?raw';
import slideSrc from '!./examples/slide-tile-example.component.html?raw';
import actionSrc from '!./examples/action-tile-example.component.html?raw';
import badgeSrc from '!./examples/badge-tile-example.component.html?raw';
import feedSrc from '!./examples/feed-tile-example.component.html?raw';
import lineSrc from '!./examples/line-tile-example.component.html?raw';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-tile',
    templateUrl: './tile-docs.component.html'
})
export class TileDocsComponent {
    genericTile: ExampleFile[] = [
        {
            language: 'html',
            code: tileGenericSrc,
            fileName: 'tile-generic-example'
        }
    ];

    columnsTile: ExampleFile[] = [
        {
            language: 'html',
            code: tileColumnsSrc,
            fileName: 'tile-columns-example'
        }
    ];

    launch: ExampleFile[] = [
        {
            language: 'html',
            code: launchSrc,
            fileName: 'launch-example'
        }
    ];

    kpi: ExampleFile[] = [
        {
            language: 'html',
            code: kpiSrc,
            fileName: 'kpi-example'
        }
    ];

    slide: ExampleFile[] = [
        {
            language: 'html',
            code: slideSrc,
            fileName: 'slide-example'
        }
    ];

    action: ExampleFile[] = [
        {
            language: 'html',
            code: actionSrc,
            fileName: 'action-example'
        }
    ];

    badge: ExampleFile[] = [
        {
            language: 'html',
            code: badgeSrc,
            fileName: 'badge-example'
        }
    ];

    feed: ExampleFile[] = [
        {
            language: 'html',
            code: feedSrc,
            fileName: 'feed-example'
        }
    ];

    line: ExampleFile[] = [
        {
            language: 'html',
            code: lineSrc,
            fileName: 'line-example'
        }
    ];
}
