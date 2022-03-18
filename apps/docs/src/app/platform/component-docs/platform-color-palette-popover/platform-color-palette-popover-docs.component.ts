import { Component } from '@angular/core';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';
import simpleColorPalettePopoverHtml from '!./platform-color-palette-popover-examples/platform-color-palette-popover-simple-example.component.html?raw';
import simpleColorPalettePopoverTS from '!./platform-color-palette-popover-examples/platform-color-palette-popover-simple-example.component.ts?raw';

import complexColorPalettePopoverHtml from '!./platform-color-palette-popover-examples/platform-color-palette-popover-complex-example.component.html?raw';
import complexColorPalettePopoverTS from '!./platform-color-palette-popover-examples/platform-color-palette-popover-complex-example.component.ts?raw';

import reactiveColorPalettePopoverHtml from '!./platform-color-palette-popover-examples/platform-color-palette-popover-reactive-form-example.component.html?raw';
import reactiveColorPalettePopoverTS from '!./platform-color-palette-popover-examples/platform-color-palette-popover-reactive-form-example.component.ts?raw';

@Component({
    selector: 'app-platform-color-palette-popover',
    templateUrl: './platform-color-palette-popover-docs.component.html'
})
export class PlatformColorPalettePopoverDocsComponent {
    simpleColorPalettePopover: ExampleFile[] = [
        {
            language: 'html',
            code: simpleColorPalettePopoverHtml,
            fileName: 'platform-color-palette-popover-simple-example'
        },
        {
            language: 'typescript',
            component: 'PlatformColorPaletteSimpleExampleComponent',
            code: simpleColorPalettePopoverTS,
            fileName: 'platform-color-palette-popover-simple-example'
        }
    ];

    complexColorPalettePopover: ExampleFile[] = [
        {
            language: 'html',
            code: complexColorPalettePopoverHtml,
            fileName: 'platform-color-palette-popover-complex-example'
        },
        {
            language: 'typescript',
            component: 'PlatformColorPaletteComplexExampleComponent',
            code: complexColorPalettePopoverTS,
            fileName: 'platform-color-palette-popover-complex-example'
        }
    ];

    reactiveColorPalettePopover: ExampleFile[] = [
        {
            language: 'html',
            code: reactiveColorPalettePopoverHtml,
            fileName: 'platform-color-palette-popover-reactive-example'
        },
        {
            language: 'typescript',
            component: 'PlatformColorPalettereactiveExampleComponent',
            code: reactiveColorPalettePopoverTS,
            fileName: 'platform-color-palette-popover-reactive-example'
        }
    ];
}
