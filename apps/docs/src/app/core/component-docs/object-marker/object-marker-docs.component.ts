import { Component, OnInit } from '@angular/core';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';
import * as ObjectMarkerExample from '!raw-loader!./examples/object-marker-example.component.html';
import * as ObjectMarkerIconandText from '!raw-loader!./examples/object-marker-Icon-text-example.component.html';
import * as ObjectMarkerClickable from '!raw-loader!./examples/object-marker-clickable-example.component.html';
import * as ObjectMarkerText from '!raw-loader!./examples/object-marker-text-example.component.html';

@Component({
    selector: 'fd-object-marker-docs',
    templateUrl: './object-marker-docs.component.html'
})
export class ObjectMarkerDocsComponent {
    objectMarkerIconOnly: ExampleFile[] = [
        {
            language: 'html',
            code: ObjectMarkerExample,
            fileName: 'object-marker-example'
        }
    ];
    objectMarkerIconandText: ExampleFile[] = [
        {
            language: 'html',
            code: ObjectMarkerIconandText,
            fileName: 'object-marker-example'
        }
    ];
    objectMarkerText: ExampleFile[] = [
        {
            language: 'html',
            code: ObjectMarkerText,
            fileName: 'object-marker-example'
        }
    ];
    objectMarkerClickable: ExampleFile[] = [
        {
            language: 'html',
            code: ObjectMarkerClickable,
            fileName: 'object-marker-clickable-example'
        }
    ];
}
