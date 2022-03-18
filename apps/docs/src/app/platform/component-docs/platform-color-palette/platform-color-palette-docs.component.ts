import { Component } from '@angular/core';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';
import simpleColorPaletteHtml from '!./platform-color-palette-examples/platform-color-palette-simple-example.component.html?raw';
import complexColorPaletteHtml from '!./platform-color-palette-examples/platform-color-palette-complex-example.component.html?raw';
import reactiveColorPaletteHtml from '!./platform-color-palette-examples/platform-color-palette-reactive-form-example.component.html?raw';
import reactiveColorPaletteTs from '!./platform-color-palette-examples/platform-color-palette-reactive-form-example.component.ts?raw';

@Component({
    selector: 'app-platform-color-palette',
    templateUrl: './platform-color-palette-docs.component.html'
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
    reactiveColorPalette: ExampleFile[] = [
        {
            language: 'html',
            code: reactiveColorPaletteHtml,
            fileName: 'platform-color-palette-reactive-form-example'
        },
        {
            language: 'typescript',
            component: 'PlatformColorPaletteExamplesComponent',
            code: reactiveColorPaletteTs,
            fileName: 'platform-color-palette-reactive-form-example'
        }
    ];
}
