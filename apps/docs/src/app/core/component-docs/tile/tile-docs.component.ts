import { Component } from '@angular/core';
import { Schema } from '../../../schema/models/schema.model';
import { SchemaFactoryService } from '../../../schema/services/schema-factory/schema-factory.service';

import * as tileActionsSrc from '!raw-loader!./examples/tile-actions-example.component.html';
import * as tileButtonSrc from '!raw-loader!./examples/tile-button-example.component.html';
import * as tileDisabledSrc from '!raw-loader!./examples/tile-disabled-example.component.html';
import * as tileSrc from '!raw-loader!./examples/tile-example.component.html';
import * as tileMediaSrc from '!raw-loader!./examples/tile-media-example.component.html';
import * as tileProductSrc from '!raw-loader!./examples/tile-product-example.component.html';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';
import { Icons } from '../../../documentation/utilities/icons';

@Component({
    selector: 'app-tile',
    templateUrl: './tile-docs.component.html'
})
export class TileDocsComponent {

    genericTile: ExampleFile[] = [
        {
            language: 'html',
            code: tileSrc,
            fileName: 'tile-example'
        }
    ];

}
