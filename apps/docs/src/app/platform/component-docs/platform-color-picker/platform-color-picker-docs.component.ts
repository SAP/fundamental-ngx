import { Component } from '@angular/core';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';
import simpleColorPickerHtml from '!./platform-color-picker-examples/platform-color-picker-simple-example.component.html?raw';
import simpleColorPickerTs from '!./platform-color-picker-examples/platform-color-picker-simple-example.component.ts?raw';
@Component({
    selector: 'app-platform-color-picker',
    templateUrl: './platform-color-picker-docs.component.html',
    styleUrls: ['./platform-color-picker-docs.component.scss']
})
export class PlatformColorPickerDocsComponent {
    simpleColorPicker: ExampleFile[] = [
        {
            language: 'html',
            code: simpleColorPickerHtml,
            fileName: 'platform-color-picker-simple-example'
        },
        {
            language: 'typescript',
            component: 'PlatformColorPickerExamplesComponent',
            code: simpleColorPickerTs,
            fileName: 'platform-color-picker-simple-example'
        }
    ];
}
