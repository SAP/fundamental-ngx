import { Component } from '@angular/core';
import * as tileGenericSrc from '!raw-loader!./examples/tile-generic-example.component.html';
import * as tileColumnsSrc from '!raw-loader!./examples/tile-columns-example.component.html';
import * as launchSrc from '!raw-loader!./examples/launch-tile-example.component.html';
import * as kpiSrc from '!raw-loader!./examples/kpi-tile-example.component.html';
import * as slideSrc from '!raw-loader!./examples/slide-tile-example.component.html';
import * as actionSrc from '!raw-loader!./examples/action-tile-example.component.html';
import * as badgeSrc from '!raw-loader!./examples/badge-tile-example.component.html';
import * as feedSrc from '!raw-loader!./examples/feed-tile-example.component.html';
import * as lineSrc from '!raw-loader!./examples/line-tile-example.component.html';
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
