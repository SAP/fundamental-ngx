import { Component } from '@angular/core';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';
import simpleColorPalettePopoverHtml from '!./platform-color-palette-popover-examples/platform-color-palette-popover-simple-example.component.html?raw';
import complexColorPalettePopoverHtml from '!./platform-color-palette-popover-examples/platform-color-palette-popover-complex-example.component.html?raw';

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
        }
    ];

    complexColorPalettePopover: ExampleFile[] = [
        {
            language: 'html',
            code: complexColorPalettePopoverHtml,
            fileName: 'platform-color-palette-popover-complex-example'
        }
    ];
}
