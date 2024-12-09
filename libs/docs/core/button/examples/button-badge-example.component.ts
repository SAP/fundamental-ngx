import { TitleCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonBadgeDirective, ButtonComponent, badgeEnabledButtonTypes } from '@fundamental-ngx/core/button';

@Component({
    selector: 'fd-button-badge-example',
    styles: [
        `
            :host {
                display: flex;
                flex-wrap: wrap;
                gap: 0.5rem;
            }
        `
    ],
    template: `
        @for (buttonType of badgeEnabledButtonTypes; track buttonType; let index = $index) {
            <button fd-button [fdType]="buttonType">
                {{ buttonType | titlecase }}
                <fd-button-badge [content]="index + 1"></fd-button-badge>
            </button>
        }
    `,
    imports: [ButtonComponent, ButtonBadgeDirective, TitleCasePipe]
})
export class ButtonBadgeExampleComponent {
    badgeEnabledButtonTypes = badgeEnabledButtonTypes;
}
