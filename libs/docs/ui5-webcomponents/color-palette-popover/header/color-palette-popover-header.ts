import { Component } from '@angular/core';
import {
    DescriptionComponent,
    DocPageComponent,
    HeaderComponent,
    HeaderTabsComponent,
    ImportComponent
} from '@fundamental-ngx/docs/shared';

@Component({
    selector: 'ui5-color-palette-popover-header',
    templateUrl: './color-palette-popover-header.html',
    standalone: true,
    imports: [DocPageComponent, HeaderComponent, DescriptionComponent, ImportComponent, HeaderTabsComponent]
})
export class ColorPalettePopoverHeader {
    componentName = 'ColorPalettePopover';
    packageName = '@ui5/webcomponents';
}
