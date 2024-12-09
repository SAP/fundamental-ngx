import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IconColor, IconComponent, IconFont } from '@fundamental-ngx/core/icon';

@Component({
    selector: 'fd-icon-color-example',
    template: `
        @for (font of fontFamilies; track font) {
            <div>
                <p>
                    Font family: <b>{{ font }}</b>
                </p>
                <div class="fd-docs-icon-container">
                    @for (color of colors; track color) {
                        <div class="fd-docs-icons">
                            <fd-icon [font]="font" [glyph]="icons[font]" [color]="color"></fd-icon>
                            <span [style.white-space]="'nowrap'" [style.font-size]="'var(--sapFontSmallSize)'">
                                Color: <b>{{ color }}</b>
                            </span>
                        </div>
                    }
                </div>
                <div class="fd-docs-icon-container">
                    @for (color of colors; track color) {
                        <div class="fd-docs-icons">
                            <fd-icon
                                [font]="font"
                                [glyph]="icons[font]"
                                color="contrast"
                                [background]="color"
                            ></fd-icon>
                            <span [style.white-space]="'nowrap'" [style.font-size]="'var(--sapFontSmallSize)'">
                                Background: <b>{{ color }}</b>
                            </span>
                        </div>
                    }
                </div>
            </div>
        }
        <fd-icon></fd-icon>
    `,
    styleUrls: ['icon-color-example.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [IconComponent]
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
        'SAP-icons': 'ai',
        BusinessSuiteInAppSymbols: 'face-happy',
        'SAP-icons-TNT': 'ai-1'
    };
}
