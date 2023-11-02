import { NgForOf, TitleCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonBadgeDirective, ButtonComponent, badgeEnabledButtonTypes } from '@fundamental-ngx/core/button';

@Component({
    selector: 'fd-button-badge-example',
    standalone: true,
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
        <button fd-button [fdType]="buttonType" *ngFor="let buttonType of badgeEnabledButtonTypes; let index = index">
            {{ buttonType | titlecase }}
            <fd-button-badge [content]="index + 1"></fd-button-badge>
        </button>
    `,
    imports: [ButtonComponent, ButtonBadgeDirective, NgForOf, TitleCasePipe]
})
export class ButtonBadgeExampleComponent {
    badgeEnabledButtonTypes = badgeEnabledButtonTypes;
}
