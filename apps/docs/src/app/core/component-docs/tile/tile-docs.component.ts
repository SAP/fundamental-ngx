import { Component } from '@angular/core';
import * as tileGenericSrc from '!raw-loader!./examples/tile-generic-example.component.html';
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

}
