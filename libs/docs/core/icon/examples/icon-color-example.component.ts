import { NgForOf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IconColor, IconComponent, IconFont } from '@fundamental-ngx/core/icon';

@Component({
    selector: 'fd-icon-color-example',
    template: `
        <div *ngFor="let font of fontFamilies">
            <p>
                Font family: <b>{{ font }}</b>
            </p>
            <div class="fd-docs-icon-container">
                <div class="fd-docs-icons" *ngFor="let color of colors">
                    <fd-icon [font]="font" [glyph]="icons[font]" [color]="color"></fd-icon>
                    <span style="white-space: nowrap; font-size: var(--sapFontSmallSize);"
                        >Color: <b>{{ color }}</b></span
                    >
                </div>
            </div>
            <div class="fd-docs-icon-container">
                <div class="fd-docs-icons" *ngFor="let color of colors">
                    <fd-icon [font]="font" [glyph]="icons[font]" color="contrast" [background]="color"></fd-icon>
                    <span style="white-space: nowrap; font-size: var(--sapFontSmallSize);"
                        >Background: <b>{{ color }}</b></span
                    >
                </div>
            </div>
        </div>
        <fd-icon></fd-icon>
    `,
    styleUrls: ['icon-example.component.scss'],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [IconComponent, NgForOf]
})
export class IconColorExampleComponent {
    colors: IconColor[] = [
        'default',
        'contrast',
        'non-interactive',
        'tile',
        'marker',
        'critical',
        'negative',
        'neutral',
        'positive',
        'information'
    ];
    fontFamilies: IconFont[] = ['SAP-icons', 'BusinessSuiteInAppSymbols', 'SAP-icons-TNT'];

    icons: Record<IconFont, string> = {
        'SAP-icons': 'picture',
        BusinessSuiteInAppSymbols: 'component',
        'SAP-icons-TNT': 'technicalinstance'
    };
}
