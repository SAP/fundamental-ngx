import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
    // tslint:disable-next-line:component-selector
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
