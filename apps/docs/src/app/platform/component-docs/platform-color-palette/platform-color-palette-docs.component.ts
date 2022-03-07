import { Component } from '@angular/core';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';
import simpleColorPaletteHtml from '!./platform-color-palette-examples/platform-color-palette-simple-example.component.html?raw';
import simpleColorPaletteTs from '!./platform-color-palette-examples/platform-color-palette-simple-example.component.ts?raw';
@Component({
    selector: 'app-platform-color-palette',
    templateUrl: './platform-color-palette-docs.component.html',
    styleUrls: ['./platform-color-palette-docs.component.scss']
})
export class PlatformColorPaletteDocsComponent {
    simpleColorPalette: ExampleFile[] = [
        {
            language: 'html',
            code: simpleColorPaletteHtml,
            fileName: 'platform-color-palette-simple-example'
        },
        {
            language: 'typescript',
            component: 'PlatformColorPaletteExamplesComponent',
            code: simpleColorPaletteTs,
            fileName: 'platform-color-palette-simple-example'
        }
    ];
}
