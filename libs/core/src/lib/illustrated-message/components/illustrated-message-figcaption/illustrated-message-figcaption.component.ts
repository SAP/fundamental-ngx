import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: '[fd-illustrated-message-figcaption]',
    template: `
        <ng-content select="[fd-illustrated-message-title]"></ng-content>
        <ng-content select="[fd-illustrated-message-text]"></ng-content>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'fd-illustrated-message__figcaption'
    }
})
export class IllustratedMessageFigcaptionComponent {}
