import { Component } from '@angular/core';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';
import simpleColorPalettePopoverHtml from '!./platform-color-palette-popover-examples/platform-color-palette-popover-simple-example.component.html?raw';
import simpleColorPalettePopoverTs from '!./platform-color-palette-popover-examples/platform-color-palette-popover-simple-example.component.ts?raw';
@Component({
    selector: 'app-platform-color-palette-popover',
    templateUrl: './platform-color-palette-popover-docs.component.html',
    styleUrls: ['./platform-color-palette-popover-docs.component.scss']
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
            component: 'PlatformColorPalettePopoverExamplesComponent',
            code: simpleColorPalettePopoverTs,
            fileName: 'platform-color-palette-popover-simple-example'
        }
    ];
}
