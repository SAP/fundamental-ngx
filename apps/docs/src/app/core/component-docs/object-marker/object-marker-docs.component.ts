import { Component } from '@angular/core';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';
import ObjectMarkerExample from '!./examples/object-marker-example.component.html?raw';
import ObjectMarkerIconandText from '!./examples/object-marker-Icon-text-example.component.html?raw';
import ObjectMarkerClickable from '!./examples/object-marker-clickable-example.component.html?raw';
import ObjectMarkerText from '!./examples/object-marker-text-example.component.html?raw';
import ObjectMarkerClickAble from '!./examples/object-marker-clickable-example.component.ts?raw';

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
        },
        {
            language: 'typescript',
            code: ObjectMarkerClickAble,
            fileName: 'object-marker-clickable-example',
            component: 'ObjectMarkerClickableExampleComponent'
        }
    ];
}
