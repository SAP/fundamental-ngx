import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import '@ui5/webcomponents/dist/ColorPaletteItem.js';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'fdp-color-palette-item',
    template: `
        <ng-template #renderer>
            <ui5-color-palette-item [value]="value"></ui5-color-palette-item>
        </ng-template>
    `,
    host: {
        '[value]': 'value'
    }
})
export class ColorPaletteItemComponent {
    /**
     * value of the color
     */
    @Input()
    value: string;

    @ViewChild('renderer')
    renderer: TemplateRef<void>;
}
