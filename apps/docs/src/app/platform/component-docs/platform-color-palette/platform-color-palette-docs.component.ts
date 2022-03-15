import { Component } from '@angular/core';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';
import simpleColorPaletteHtml from '!./platform-color-palette-examples/platform-color-palette-simple-example.component.html?raw';
import complexColorPaletteHtml from '!./platform-color-palette-examples/platform-color-palette-complex-example.component.html?raw';

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
        }
    ];

    complexColorPalette: ExampleFile[] = [
        {
            language: 'html',
            code: complexColorPaletteHtml,
            fileName: 'platform-color-palette-complex-example'
        }
    ];
}
